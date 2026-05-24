"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { AuroraBackground } from "../components/AuroraBackground";
import { BackgroundGradient } from "../components/BackgroundGradient";

// ─── Luxury Admin Navbar ─────────────────────────────────────────────
function AdminNavbar({ bookings, session, filterStatus, setFilterStatus }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close profile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusCounts = {
    Pending: bookings.filter((b) => b.status === "Pending").length,
    Confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    Completed: bookings.filter((b) => b.status === "Completed").length,
    Cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  const userName = session?.user?.name || "Admin";
  const userEmail = session?.user?.email || "";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      {/* ── Navbar Keyframes ── */}
      <style>{`
        @keyframes navbar-gold-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes navbar-border-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.4); }
          50% { box-shadow: 0 0 8px 2px rgba(197, 160, 89, 0.15); }
        }
        .navbar-gold-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.08) 25%, rgba(197,160,89,0.15) 50%, rgba(197,160,89,0.08) 75%, transparent 100%);
          background-size: 200% 100%;
          animation: navbar-gold-shimmer 6s linear infinite;
        }
        .navbar-border-bottom {
          background: linear-gradient(90deg, transparent 0%, #C5A059 20%, #E8D5A3 50%, #C5A059 80%, transparent 100%);
          animation: navbar-border-glow 3s ease-in-out infinite;
        }
        .brand-text-gradient {
          background: linear-gradient(135deg, #FFFFFF 0%, #F5E6C8 40%, #C5A059 70%, #E8D5A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 12px rgba(197, 160, 89, 0.3));
        }
        .brand-dot {
          -webkit-text-fill-color: #C5A059;
          filter: drop-shadow(0 0 8px rgba(197, 160, 89, 0.6));
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-100 w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            : "bg-[#0a0a0a]/60 backdrop-blur-xl"
        }`}
      >
        {/* Gold shimmer overlay */}
        <div className="absolute inset-0 navbar-gold-shimmer pointer-events-none" />

        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-px navbar-border-bottom" />

        <div className="relative max-w-384 mx-auto">
          {/* ── Main Navbar Row ── */}
          <div className="flex items-center justify-between px-5 md:px-8 h-18">
            {/* ── Left: Brand ── */}
            <div className="flex items-center gap-5">
              {/* Logo Mark */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-3 cursor-default select-none"
              >
                {/* Diamond logo icon */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-[#C5A059] to-[#8B6914] opacity-20 blur-sm" />
                  <div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-[#C5A059]/20 to-[#8B6914]/10 border border-[#C5A059]/30 flex items-center justify-center backdrop-blur-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#C5A059]">
                      <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M12 7L7 12l5 5 5-5-5-5z" fill="currentColor" opacity="0.3" />
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* Brand text */}
                <div>
                  <h1 className="text-[1.65rem] font-black tracking-tight leading-none" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    <span className="brand-text-gradient">Studio</span><span className="brand-dot">.</span><span className="brand-text-gradient">Inked</span>
                  </h1>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-[#C5A059]/70 mt-1" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    Artist Dashboard
                  </p>
                </div>
              </motion.div>

              {/* Vertical separator */}
              <div className="hidden lg:block w-px h-8 bg-linear-to-b from-transparent via-[#C5A059]/30 to-transparent" />

              {/* ── Status Pills ── */}
              <div className="hidden lg:flex items-center gap-2">
                {[
                  { label: "Pending", statusKey: "Pending", count: statusCounts.Pending, color: "#F59E0B", bg: "rgba(245,158,11,0.08)", bgActive: "rgba(245,158,11,0.18)", border: "rgba(245,158,11,0.25)", borderActive: "rgba(245,158,11,0.6)" },
                  { label: "Confirmed", statusKey: "Confirmed", count: statusCounts.Confirmed, color: "#10B981", bg: "rgba(16,185,129,0.08)", bgActive: "rgba(16,185,129,0.18)", border: "rgba(16,185,129,0.25)", borderActive: "rgba(16,185,129,0.6)" },
                  { label: "Done", statusKey: "Completed", count: statusCounts.Completed, color: "#6366F1", bg: "rgba(99,102,241,0.08)", bgActive: "rgba(99,102,241,0.18)", border: "rgba(99,102,241,0.25)", borderActive: "rgba(99,102,241,0.6)" },
                  { label: "Cancelled", statusKey: "Cancelled", count: statusCounts.Cancelled, color: "#EF4444", bg: "rgba(239,68,68,0.08)", bgActive: "rgba(239,68,68,0.18)", border: "rgba(239,68,68,0.25)", borderActive: "rgba(239,68,68,0.6)" },
                ].map((s) => {
                  const isActive = filterStatus === s.statusKey;
                  return (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.06, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterStatus(isActive ? null : s.statusKey)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none ${isActive ? 'ring-1' : ''}`}
                    style={{
                      backgroundColor: isActive ? s.bgActive : s.bg,
                      borderColor: isActive ? s.borderActive : s.border,
                      boxShadow: isActive ? `0 0 12px ${s.color}30, 0 0 4px ${s.color}20` : 'none',
                      ringColor: isActive ? s.color : 'transparent',
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: s.color, boxShadow: isActive ? `0 0 8px ${s.color}80` : `0 0 6px ${s.color}40` }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color, fontFamily: 'var(--font-inter), sans-serif' }}>
                      {s.count}
                    </span>
                    <span className={`text-[9px] font-semibold uppercase tracking-widest hidden xl:inline`} style={{ fontFamily: 'var(--font-inter), sans-serif', color: isActive ? s.color : '#737373' }}>
                      {s.label}
                    </span>
                  </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Actions ── */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Live Clock */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden md:flex flex-col items-end mr-1"
              >
                <span className="text-[12px] font-bold text-white/90 tracking-wide tabular-nums" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  {formattedTime}
                </span>
                <span className="text-[9px] font-semibold text-neutral-500 tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  {formattedDate}
                </span>
              </motion.div>

              {/* Vertical separator */}
              <div className="hidden md:block w-px h-8 bg-linear-to-b from-transparent via-neutral-700/50 to-transparent" />

              {/* Total Requests Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-[#C5A059]/8 border border-[#C5A059]/20 px-3.5 py-2 rounded-xl cursor-default"
              >
                <div className="relative">
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-[#C5A059] rounded-full animate-ping opacity-40" />
                </div>
                <span className="text-base font-extrabold text-white tabular-nums" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{bookings.length}</span>
                <span className="text-[9px] font-bold text-[#C5A059]/70 uppercase tracking-widest hidden sm:inline" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                  Total
                </span>
              </motion.div>

              {/* Vertical separator */}
              <div className="w-px h-8 bg-linear-to-b from-transparent via-neutral-700/50 to-transparent" />

              {/* ── Profile Button & Dropdown ── */}
              <div className="relative" ref={profileRef}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center gap-3 pl-1 pr-3 py-1 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    showProfileMenu
                      ? "border-[#C5A059]/40 bg-[#C5A059]/10"
                      : "border-neutral-800/60 bg-white/3 hover:border-neutral-700 hover:bg-white/6"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#C5A059] to-[#8B6914] flex items-center justify-center shadow-lg shadow-[#C5A059]/10">
                      <span className="text-[11px] font-black text-black/80 tracking-wide">{initials}</span>
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="hidden md:block text-left">
                    <p className="text-[11px] font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{userName}</p>
                    <p className="text-[9px] text-neutral-500 leading-tight truncate max-w-30" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{userEmail}</p>
                  </div>

                  {/* Chevron */}
                  <motion.svg
                    animate={{ rotate: showProfileMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3.5 h-3.5 text-neutral-500 ml-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                {/* ── Profile Dropdown ── */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-2 w-64 origin-top-right"
                    >
                      <div className="rounded-2xl border border-[#C5A059]/20 bg-[#0f0f0f]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_0_1px_rgba(197,160,89,0.1)] overflow-hidden">
                        {/* Profile Header */}
                        <div className="px-5 pt-5 pb-4 border-b border-neutral-800/60">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#C5A059] to-[#8B6914] flex items-center justify-center shadow-lg">
                              <span className="text-sm font-black text-black/80" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{initials}</span>
                            </div>
                            <div>
                              <p className="text-sm font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{userName}</p>
                              <p className="text-[10px] font-medium text-neutral-500 mt-0.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{userEmail}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Online</span>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="px-5 py-3 border-b border-neutral-800/60">
                          <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.25em] mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Session Stats</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/3ded-lg px-3 py-2 border border-neutral-800/40">
                              <span className="text-lg font-black text-white tabular-nums" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{bookings.length}</span>
                              <span className="block text-[8px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Bookings</span>
                            </div>
                            <div className="bg-white/3 rounded-lg px-3 py-2 border border-neutral-800/40">
                              <span className="text-lg font-black text-[#C5A059] tabular-nums" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{statusCounts.Pending}</span>
                              <span className="block text-[8px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Pending</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="p-2">
                          <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 hover:bg-red-500/10 group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                              <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-red-400 group-hover:text-red-300 transition-colors" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Sign Out</p>
                              <p className="text-[9px] font-medium text-neutral-600" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>End current session</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Mobile Status Bar ── */}
          <div className="lg:hidden flex items-center gap-2 px-5 pb-3 overflow-x-auto scrollbar-hide">
            {[
              { label: "Pending", statusKey: "Pending", count: statusCounts.Pending, color: "#F59E0B" },
              { label: "Confirmed", statusKey: "Confirmed", count: statusCounts.Confirmed, color: "#10B981" },
              { label: "Done", statusKey: "Completed", count: statusCounts.Completed, color: "#6366F1" },
              { label: "Cancelled", statusKey: "Cancelled", count: statusCounts.Cancelled, color: "#EF4444" },
            ].map((s) => {
              const isActive = filterStatus === s.statusKey;
              return (
              <div
                key={s.label}
                onClick={() => setFilterStatus(isActive ? null : s.statusKey)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shrink-0 cursor-pointer select-none transition-all duration-300 ${
                  isActive ? 'border-opacity-60 bg-white/6' : 'border-neutral-800/50 bg-white/2'
                }`}
                style={{ borderColor: isActive ? s.color : undefined }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] font-bold" style={{ color: s.color }}>{s.count}</span>
                <span className="text-[9px] font-medium" style={{ color: isActive ? s.color : '#737373' }}>{s.label}</span>
              </div>
              );
            })}
          </div>
        </div>

        {/* Bottom gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px navbar-border-bottom opacity-40" />
      </motion.nav>
    </>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────
export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { data: session } = useSession();
  
  // States for new features
  const [editModes, setEditModes] = useState({});
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [refreshing, setRefreshing] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [lightboxImage, setLightboxImage] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState({});

  const fetchBookings = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const response = await fetch("/api/admin/bookings");
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      } else {
        setError(data.message || "Failed to load data.");
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingStatus(prev => ({ ...prev, [bookingId]: true }));
    setEditModes(prev => ({ ...prev, [bookingId]: false }));

    try {
      const response = await fetch(`/api/admin/bookings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setBookings(bookings.map((b) => 
          b._id === bookingId ? { ...b, status: newStatus } : b
        ));
        showToast("Status updated successfully", "success");
      } else {
        showToast("Status update failed", "error");
      }
    } catch (error) {
      showToast("Network error. Please try again.", "error");
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  // ── Filter, Search & Sort Logic ──
  // ── Filter, Search & Sort Logic ──
  const processedBookings = bookings
    .filter(b => {
      // 1. Agar search query likhi hai, toh usko prioritize karo (ignore status filter)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          b.clientName.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.includes(q)
        );
      }
      
      // 2. Agar search empty hai, tab status check karo
      if (filterStatus && b.status !== filterStatus) return false;
      
      return true;
    })
    .sort((a, b) => {
      // 3. Sort
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "date-asc") return new Date(a.bookingDate) - new Date(b.bookingDate);
      if (sortBy === "date-desc") return new Date(b.bookingDate) - new Date(a.bookingDate);
      return 0;
    });

  const statusStyles = {
    Pending: { badge: "border-[#F59E0B]/50 text-[#F59E0B] bg-[#F59E0B]/10", text: "text-[#F59E0B]" },
    Confirmed: { badge: "border-[#10B981]/50 text-[#10B981] bg-[#10B981]/10", text: "text-[#10B981]" },
    Completed: { badge: "border-[#6366F1]/50 text-[#6366F1] bg-[#6366F1]/10", text: "text-[#6366F1]" },
    Cancelled: { badge: "border-[#EF4444]/50 text-[#EF4444] bg-[#EF4444]/10", text: "text-[#EF4444]" },
  };

  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen w-full text-white font-sans" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        
        {/* ── Toast Notification ── */}
        <AnimatePresence>
          {toast.visible && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: "-50%" }}
              animate={{ opacity: 1, y: 20, x: "-50%" }}
              exit={{ opacity: 0, y: -50, x: "-50%" }}
              className={`fixed top-0 left-1/2 z-9999 px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest border flex items-center gap-2 backdrop-blur-md shadow-2xl ${
                toast.type === "success" 
                  ? "bg-green-950/80 border-green-500/50 text-green-400" 
                  : "bg-red-950/80 border-red-500/50 text-red-400"
              }`}
            >
              {toast.type === "success" ? "✓ " : "✕ "}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Image Lightbox ── */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-9999 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={lightboxImage}
                alt="Reference Full Size"
                className="max-w-full max-h-full rounded-lg shadow-2xl border border-white/10"
              />
              <button 
                className="absolute top-6 right-6 text-white/50 hover:text-white"
                onClick={() => setLightboxImage(null)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Premium Navbar ── */}
        <AdminNavbar bookings={bookings} session={session} filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

        {/* ── Dashboard Content ── */}
        <div className="max-w-360 mx-auto px-5 md:px-8 pt-6 pb-10">

          {/* ── Control Bar (Search, Sort, Refresh) ── */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 bg-[#111]/60 backdrop-blur-md p-4 rounded-2xl border border-neutral-800/50">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search clients, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:border-[#C5A059]/50 focus:outline-none transition-colors"
              />
              <svg className="w-4 h-4 text-neutral-500 absolute left-3.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-2.5 text-neutral-500 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none bg-[#0a0a0a] border border-neutral-800 rounded-xl py-2.5 px-4 text-xs text-white focus:border-[#C5A059]/50 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="newest">Newest Requests</option>
                <option value="oldest">Oldest Requests</option>
                <option value="date-asc">Appt Date (Soonest)</option>
                <option value="date-desc">Appt Date (Furthest)</option>
              </select>

              <button
                onClick={() => fetchBookings(true)}
                disabled={refreshing}
                className="flex items-center justify-center bg-[#1a1a1a] border border-neutral-700 hover:border-[#C5A059]/50 text-white p-2.5 rounded-xl transition-all cursor-pointer group"
                title="Refresh Bookings"
              >
                <svg className={`w-4 h-4 text-neutral-400 group-hover:text-[#C5A059] ${refreshing ? "animate-spin text-[#C5A059]" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#C5A059]"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-300 p-4 rounded-xl text-center max-w-lg mx-auto font-medium text-sm">
              ⚠️ {error}
            </div>
          )}

          {!loading && bookings.length === 0 && !error && (
            <div className="text-center text-neutral-500 mt-28 flex flex-col items-center">
              <svg className="w-16 h-16 text-neutral-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>Inbox Empty</p>
              <p className="mt-2 text-xs">No new booking requests at the moment.</p>
            </div>
          )}

          {/* Empty state for filtered/searched results */}
          {!loading && processedBookings.length === 0 && bookings.length > 0 && (
            <div className="text-center text-neutral-600 mt-20">
              <p className="text-xl font-bold">No Match Found</p>
              <p className="mt-2 text-xs">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* 🟢 COMPACT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {processedBookings.map((booking, index) => (
              <BackgroundGradient
                key={booking._id}
                className="rounded-[24px] p-px h-full bg-[#080808]"
                containerClassName="h-full"
                animate={true}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.5 }}
                  whileHover={{ scale: 1.01 }}
                  className={`bg-[#111]/90 backdrop-blur-xl rounded-[22px] overflow-visible border border-white/10 shadow-xl flex flex-col group transition-all duration-300 relative h-full ${
                    editModes[booking._id] ? "z-50" : "z-10"
                  }`}
                >
                  {/* Card Updating Spinner Overlay */}
                  {updatingStatus[booking._id] && (
                    <div className="absolute inset-0 z-60 bg-black/60 backdrop-blur-sm rounded-[22px] flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* 🟢 Smaller Image Container (h-36 instead of h-56) */}
                  <div className="h-36 bg-neutral-900 w-full relative overflow-hidden rounded-t-2xl">
                    {booking.referenceImage ? (
                      <div 
                        className="w-full h-full cursor-zoom-in group/img"
                        onClick={() => setLightboxImage(booking.referenceImage)}
                      >
                        <img
                          src={booking.referenceImage}
                          alt="Reference"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-neutral-700 italic text-xs">
                        No Reference
                      </div>
                    )}
                    
                    {/* Status Badges & Edit Button */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-50">
                      {editModes[booking._id] ? (
                        <div className="relative">
                          <button
                            onClick={() => setEditModes((prev) => ({ ...prev, [booking._id]: false }))}
                            className={`text-[9px] font-bold px-3 py-1.5 rounded-full border tracking-widest uppercase cursor-pointer shadow-lg backdrop-blur-md flex items-center gap-1 border-[#C5A059] bg-[#0f0f0f] text-[#C5A059] transition-all`}
                          >
                            {booking.status}
                            <span className="text-[7px] opacity-80">▲</span>
                          </button>

                          <AnimatePresence>
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full right-0 mt-1.5 w-32 bg-[#0f0f0f] border border-[#C5A059]/50 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl flex flex-col z-100"
                            >
                              {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => handleStatusChange(booking._id, opt)}
                                  className={`text-center px-3 py-2.5 text-[9px] font-bold tracking-widest uppercase transition-all duration-200 hover:bg-[#222] border-b border-neutral-800/60 last:border-0 ${statusStyles[opt].text}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      ) : (
                        <>
                          <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full border tracking-widest uppercase shadow-md backdrop-blur-md transition-colors duration-300 ${statusStyles[booking.status]?.badge || statusStyles.Pending.badge}`}>
                            {booking.status}
                          </div>
                          <button
                            onClick={() => setEditModes((prev) => ({ ...prev, [booking._id]: true }))}
                            className="bg-black/60 hover:bg-[#C5A059] text-neutral-400 hover:text-black border border-neutral-700 hover:border-[#C5A059] p-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md"
                            title="Edit Status"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 🟢 Content Padding */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-white tracking-tight leading-tight truncate" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                        {booking.clientName}
                      </h2>
                      <p className="text-neutral-400 font-medium text-[11px] mt-1 truncate tracking-wide">
                        {booking.phone} <span className="opacity-50 mx-1">•</span> {booking.email}
                      </p>
                    </div>

                    {/* 🟢 Tighter Grid for Details */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 border-t border-neutral-800/80 pt-4 mb-4">
                      <div>
                        <span className="block text-[#C5A059] text-[8px] font-bold uppercase tracking-widest mb-1">Style</span>
                        <span className="text-gray-100 text-xs font-semibold truncate block">{booking.tattooStyle || "Custom"}</span>
                      </div>
                      <div>
                        <span className="block text-[#C5A059] text-[8px] font-bold uppercase tracking-widest mb-1">Placement</span>
                        <span className="text-gray-100 text-xs font-semibold truncate block">{booking.placement}</span>
                      </div>
                      <div>
                        <span className="block text-[#C5A059] text-[8px] font-bold uppercase tracking-widest mb-1">Size</span>
                        <span className="text-gray-100 text-xs font-semibold truncate block">{booking.size}</span>
                      </div>
                      <div>
                        <span className="block text-[#C5A059] text-[8px] font-bold uppercase tracking-widest mb-1">Appt.</span>
                        <span className="bg-[#C5A059]/10 text-[#C5A059] font-bold px-1.5 py-0.5 rounded text-[10px] inline-block tracking-wide">
                          {new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Client Notes */}
                    {booking.description && (
                      <div className="border-t border-neutral-800/80 pt-3 mb-4">
                        <span className="block text-[#C5A059] text-[8px] font-bold uppercase tracking-widest mb-1.5">Client Notes</span>
                        <p className={`text-neutral-400 text-[11px] leading-relaxed transition-all ${expandedNotes[booking._id] ? '' : 'line-clamp-3'}`}>
                          {booking.description}
                        </p>
                        {booking.description.length > 100 && (
                          <button 
                            onClick={() => setExpandedNotes(prev => ({...prev, [booking._id]: !prev[booking._id]}))}
                            className="text-[#C5A059] hover:text-white text-[9px] font-bold uppercase tracking-widest mt-1.5 transition-colors"
                          >
                            {expandedNotes[booking._id] ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>
                    )}

                    {/* 🟢 Footer */}
                    <div className="mt-auto pt-3 border-t border-neutral-800/50 text-[9px] text-neutral-600 flex justify-between font-mono">
                      <span>ID: {booking._id.slice(-5).toUpperCase()}</span>
                      <span>{new Date(booking.createdAt).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                  </div>
                </motion.div>
              </BackgroundGradient>
            ))}
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}