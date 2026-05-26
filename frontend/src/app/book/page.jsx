"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LiquidEther from "../components/LiquidEther";

// ─── Icons ───────────────────────────────────────────────────────────
const ContactIcon = () => (
  <svg className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);
const TattooIcon = () => (
  <svg className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
);
const CalendarIcon = () => (
  <svg className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);
const NoteIcon = () => (
  <svg className="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
);
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);
const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
);

// ─── Preset Options ──────────────────────────────────────────────────
const TATTOO_STYLES = [
  "Minimalist", "Traditional", "Neo-Traditional", "Realism",
  "Watercolor", "Japanese", "Tribal", "Geometric",
  "Blackwork", "Dotwork", "Lettering", "Custom / Other"
];

const TATTOO_SIZES = [
  "Tiny (1-2 in)", "Small (2-4 in)", "Medium (4-6 in)",
  "Large (6-10 in)", "Extra Large (10+ in)", "Half Sleeve",
  "Full Sleeve", "Full Back"
];

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// ─── Main Component ──────────────────────────────────────────────────
export default function BookingPage() {
  const [formData, setFormData] = useState({
    clientName: "", phone: "", email: "", tattooStyle: "",
    placement: "", size: "", bookingDate: "", referenceImage: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Today's date for min restriction
  const todayDate = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // ── Validation ─────────────────────────────────────────────────
  const validateForm = () => {
    const errors = {};

    if (!formData.clientName.trim()) errors.clientName = "Name is required";
    
    // Phone: at least 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (phoneDigits.length < 10) {
      errors.phone = "Enter a valid phone number (min 10 digits)";
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.placement.trim()) errors.placement = "Placement is required";
    if (!formData.size) errors.size = "Please select a size";
    if (!formData.bookingDate) errors.bookingDate = "Please select a date";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Image Upload ───────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setMessage({ type: "error", text: `Image too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.` });
      e.target.value = "";
      return;
    }

    setImageUploading(true);
    setMessage(null);

    // Show local preview immediately
    const localPreviewUrl = URL.createObjectURL(file);
    setImagePreview(localPreviewUrl);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await res.json();

        if (data.success) {
          setFormData((prev) => ({ ...prev, referenceImage: data.secure_url }));
        } else {
          setMessage({ type: "error", text: "Upload failed: " + (data.message || "Unknown error") });
          setImagePreview(null);
        }
      } catch (error) {
        console.error("Backend upload failed:", error);
        setMessage({ type: "error", text: "Server error during upload. Please try again." });
        setImagePreview(null);
      } finally {
        setImageUploading(false);
      }
    };
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, referenceImage: "" }));
    setImagePreview(null);
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (imageUploading) {
      setMessage({ type: "error", text: "Please wait, image is still uploading..." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setMessage({ type: "error", text: data.message || "Request failed. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server connection issue. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleBookAnother = () => {
    setSubmitted(false);
    setFormData({ clientName: "", phone: "", email: "", tattooStyle: "", placement: "", size: "", bookingDate: "", referenceImage: "", description: "" });
    setImagePreview(null);
    setMessage(null);
    setFieldErrors({});
  };

  // ── Styles ─────────────────────────────────────────────────────
  const inputBase = "w-full bg-[#111] border rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[#C5A059]/70 focus:ring-1 focus:ring-[#C5A059]/50 transition-all duration-300 placeholder-neutral-600";
  const inputStyles = (name) => `${inputBase} ${fieldErrors[name] ? 'border-red-500/60' : 'border-neutral-800/80'}`;
  const labelStyles = "block text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5";
  const selectStyles = (name) => `${inputBase} ${fieldErrors[name] ? 'border-red-500/60' : 'border-neutral-800/80'} appearance-none cursor-pointer`;

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>

      {/* 💧 Bright Luxury Gold Ether Background */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <LiquidEther
          className="w-full h-full"
          colors={['#FFFFFF', '#FFD700', '#F5DEB3']}
        />
      </div>

      {/* ── Top Navigation ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2 text-neutral-400 group-hover:text-white transition-colors duration-300">
            <ArrowLeftIcon />
            <span className="text-xs font-semibold uppercase tracking-widest">Back</span>
          </div>
        </Link>

        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-lg font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            <span className="text-white">Studio</span><span className="text-[#C5A059]">.</span><span className="text-white">Inked</span>
          </h1>
        </Link>

        <div className="w-16" /> {/* Spacer for center alignment */}
      </motion.header>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success Confirmation Screen ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg w-full bg-[#0d0d0d]/90 backdrop-blur-xl p-10 sm:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#C5A059]/20 text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto rounded-full bg-linear-to-br from-[#C5A059] to-[#8B6914] flex items-center justify-center shadow-lg shadow-[#C5A059]/20 mb-6"
              >
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h2 className="text-3xl font-black tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Booking <span className="text-[#C5A059]">Confirmed</span>
              </h2>

              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mx-auto mb-2">
                Your tattoo session request has been submitted successfully. We'll review your details and reach out soon.
              </p>

              <div className="bg-[#C5A059]/5 border border-[#C5A059]/15 rounded-xl p-4 mt-6 mb-8">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div>
                    <span className="block text-[8px] font-bold text-[#C5A059]/70 uppercase tracking-widest">Name</span>
                    <span className="text-sm font-semibold text-white">{formData.clientName}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-[#C5A059]/70 uppercase tracking-widest">Date</span>
                    <span className="text-sm font-semibold text-white">
                      {formData.bookingDate ? new Date(formData.bookingDate + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-[#C5A059]/70 uppercase tracking-widest">Style</span>
                    <span className="text-sm font-semibold text-white">{formData.tattooStyle || "Not specified"}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-[#C5A059]/70 uppercase tracking-widest">Placement</span>
                    <span className="text-sm font-semibold text-white">{formData.placement}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookAnother}
                  className="flex-1 font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl p-4 bg-[#C5A059] text-black hover:bg-[#d4ac61] transition-all duration-300 shadow-lg shadow-[#C5A059]/15 cursor-pointer"
                >
                  Book Another Session
                </motion.button>
                <Link
                  href="/"
                  className="flex-1 font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl p-4 bg-white/5 border border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white transition-all duration-300 text-center"
                >
                  Return Home
                </Link>
              </div>
            </motion.div>
          ) : (
            /* ── Booking Form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl w-full bg-[#0d0d0d]/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-neutral-800/50"
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-black tracking-tighter text-white mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Book<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-[#C5A059] italic ml-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>Session</motion.span>
                </h1>
                <p className="text-neutral-400 text-xs max-w-sm mx-auto">Request your consultation for bespoke ink. Wait times apply.</p>
              </div>

              {/* ── Toast Messages ── */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    className={`p-4 mb-8 rounded-xl text-center font-bold text-xs uppercase tracking-wider border flex items-center justify-center gap-2 ${message.type === 'success' ? 'bg-green-950/20 border-green-900 text-green-400' : 'bg-red-950/20 border-red-900 text-red-400'}`}
                  >
                    {message.type === 'success' && <CheckIcon />}
                    {message.type === 'error' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
                    )}
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* ── Section 1: Contact Details ── */}
                <section>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-800/60">
                    <ContactIcon />
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">Contact Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                    <div>
                      <label className={labelStyles}>Client Name</label>
                      <input type="text" name="clientName" placeholder="Full legal name" value={formData.clientName} onChange={handleChange} className={inputStyles("clientName")} />
                      {fieldErrors.clientName && <p className="text-red-400 text-[10px] mt-1 font-medium">{fieldErrors.clientName}</p>}
                    </div>

                    <div>
                      <label className={labelStyles}>Phone Number</label>
                      <input type="tel" name="phone" placeholder="+91 XXXX XXXX XX" value={formData.phone} onChange={handleChange} className={inputStyles("phone")} />
                      {fieldErrors.phone && <p className="text-red-400 text-[10px] mt-1 font-medium">{fieldErrors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelStyles}>Email Address</label>
                      <input type="email" name="email" placeholder="Preferred contact email" value={formData.email} onChange={handleChange} className={inputStyles("email")} />
                      {fieldErrors.email && <p className="text-red-400 text-[10px] mt-1 font-medium">{fieldErrors.email}</p>}
                    </div>
                  </div>
                </section>

                {/* ── Section 2: Tattoo Details ── */}
                <section>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-800/60">
                    <TattooIcon />
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">Tattoo Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                    {/* Style Dropdown */}
                    <div className="relative">
                      <label className={labelStyles}>Desired Style</label>
                      <select name="tattooStyle" value={formData.tattooStyle} onChange={handleChange} className={selectStyles("tattooStyle")}>
                        <option value="" className="bg-[#111]">Select a style...</option>
                        {TATTOO_STYLES.map((style) => (
                          <option key={style} value={style} className="bg-[#111]">{style}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-[2.3rem] pointer-events-none text-neutral-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>

                    {/* Placement */}
                    <div>
                      <label className={labelStyles}>Body Placement</label>
                      <input type="text" name="placement" placeholder="e.g. Inner forearm" value={formData.placement} onChange={handleChange} className={inputStyles("placement")} />
                      {fieldErrors.placement && <p className="text-red-400 text-[10px] mt-1 font-medium">{fieldErrors.placement}</p>}
                    </div>

                    {/* Size Dropdown */}
                    <div className="relative">
                      <label className={labelStyles}>Approx Size</label>
                      <select name="size" value={formData.size} onChange={handleChange} className={selectStyles("size")}>
                        <option value="" className="bg-[#111]">Select a size...</option>
                        {TATTOO_SIZES.map((size) => (
                          <option key={size} value={size} className="bg-[#111]">{size}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-[2.3rem] pointer-events-none text-neutral-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                      {fieldErrors.size && <p className="text-red-400 text-[10px] mt-1 font-medium">{fieldErrors.size}</p>}
                    </div>

                    {/* Date */}
                    <div className="relative">
                      <label className={labelStyles}>Preferred Window</label>
                      <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} min={todayDate} className={`${inputStyles("bookingDate")} text-neutral-400`} style={{ colorScheme: 'dark' }} />
                      <div className="absolute right-4 top-[2.3rem] pointer-events-none text-neutral-600">
                        <CalendarIcon />
                      </div>
                      {fieldErrors.bookingDate && <p className="text-red-400 text-[10px] mt-1 font-medium">{fieldErrors.bookingDate}</p>}
                    </div>

                    {/* Reference Image Upload */}
                    <div className="md:col-span-2 bg-[#121212]/80 p-5 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                      <label className={labelStyles}>Reference Visuals (Optional)</label>

                      {/* Image Preview */}
                      {imagePreview && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 mb-4 relative inline-block"
                        >
                          <img
                            src={imagePreview}
                            alt="Upload preview"
                            className="w-32 h-32 object-cover rounded-xl border border-neutral-700/60 shadow-lg"
                          />
                          {imageUploading && (
                            <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                          {!imageUploading && formData.referenceImage && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -bottom-2 -right-2 w-7 h-7 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
                            title="Remove image"
                          >
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </motion.div>
                      )}

                      <div className="flex flex-col sm:flex-row items-center gap-4 mt-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full text-xs text-neutral-600 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border file:border-[#C5A059]/30 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:bg-[#C5A059]/5 file:text-[#C5A059] hover:file:bg-[#C5A059]/10 cursor-pointer"
                        />
                        {imageUploading && !imagePreview && <span className="text-[#C5A059] text-[10px] font-medium animate-pulse whitespace-nowrap">Uploading...</span>}
                        {formData.referenceImage && !imageUploading && !imagePreview && <span className="text-green-500 text-[10px] font-medium flex items-center gap-1.5 whitespace-nowrap"><CheckIcon />Received</span>}
                      </div>
                      <p className="text-[9px] text-neutral-600 mt-2">Max {MAX_FILE_SIZE_MB}MB · JPG, PNG, or WebP</p>
                    </div>
                  </div>
                </section>

                {/* ── Section 3: Description / Notes ── */}
                <section>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-neutral-800/60">
                    <NoteIcon />
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">Additional Notes</h2>
                  </div>
                  <div>
                    <label className={labelStyles}>Describe Your Idea (Optional)</label>
                    <textarea
                      name="description"
                      placeholder="Tell us about your vision — colors, meaning, specific elements you want included..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputBase} border-neutral-800/80 resize-none`}
                    />
                  </div>
                </section>

                {/* ── Submit Button ── */}
                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: "0 0 30px rgba(197, 160, 89, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || imageUploading}
                  className={`w-full font-black text-[11px] uppercase tracking-[0.3em] rounded-xl p-4 mt-6 transition-all duration-500 shadow-lg cursor-pointer ${imageUploading || loading ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-[#C5A059] text-black hover:bg-[#d4ac61] shadow-[0_10px_20px_rgba(197,160,89,0.15)]'}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : "Request Appointment"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}