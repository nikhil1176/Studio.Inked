"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AuroraBackground } from "./components/AuroraBackground";
import { BackgroundGradient } from "./components/BackgroundGradient";

const services = [
  {
    title: "Custom Designs",
    desc: "Bring your concept, and our artists will craft a unique, one-of-a-kind piece tailored perfectly to your body's natural flow.",
    icon: "✒️"
  },
  {
    title: "Cover-Ups",
    desc: "Transform old or unwanted ink into a beautiful new masterpiece. We specialize in creative concealment and heavy blackwork.",
    icon: "🖤"
  },
  {
    title: "Fine Line & Minimalist",
    desc: "Delicate, precise, and elegant tattoos that focus on sharp details and thin needles for a subtle, sophisticated look.",
    icon: "✨"
  },
  {
    title: "Black & Grey Realism",
    desc: "High-contrast, stunningly realistic portraits and designs using expert shading techniques to create profound depth.",
    icon: "📸"
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611501275019-9b5c156f0601?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582293041079-792f39c28cc8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616788812686-30237e193fb6?q=80&w=600&auto=format&fit=crop",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80, // offset for navbar
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
      
      {/* ─── Sticky Navbar ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C5A059]">Tattoo Studio</span>
            <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
              Studio<span className="text-[#C5A059]">.</span>Inked
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            <a href="#about" onClick={(e) => smoothScroll(e, 'about')} className="hover:text-[#C5A059] transition-colors cursor-pointer">About</a>
            <a href="#services" onClick={(e) => smoothScroll(e, 'services')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Services</a>
            <a href="#gallery" onClick={(e) => smoothScroll(e, 'gallery')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Gallery</a>
            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')} className="hover:text-[#C5A059] transition-colors cursor-pointer">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            
            <Link href="/book" className="bg-[#C5A059] text-black px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all hover:scale-105">
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <AuroraBackground className="absolute inset-0 z-0 opacity-80" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#050505]/50 to-[#050505] z-10" />
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-3 border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#E8D5A3]">Now Accepting New Clients</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6 drop-shadow-2xl" 
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Ink That Tells <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FFFFFF] via-[#F5E6C8] to-[#C5A059]">Your Story.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl text-neutral-400 text-sm md:text-base font-light tracking-wide leading-relaxed mb-10"
          >
            Welcome to Studio Inked. We specialize in custom, high-end tattoos designed to last a lifetime. Submit your idea, consult with our artists, and let's create a masterpiece.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/book" className="bg-[#C5A059] text-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.4)] hover:-translate-y-1 transition-all duration-300">
              Request Consultation
            </Link>
            <a href="#gallery" onClick={(e) => smoothScroll(e, 'gallery')} className="border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex items-center justify-center">
              View Portfolio
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── About Us Section ─── */}
      <section id="about" className="py-24 relative z-10 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-auto lg:h-150 rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-overlay z-10"></div>
              <img src="/tattoo-artist-bg.png" alt="Artist at work" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-20 pointer-events-none"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-4">The Studio</h4>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                Where precision meets <span className="italic text-neutral-400">passion</span>.
              </h2>
              <div className="space-y-6 text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                <p>
                  Founded on the principles of immaculate hygiene and unparalleled artistry, Studio Inked is a sanctuary for self-expression. We believe a tattoo is more than just ink—it's a permanent reflection of your journey.
                </p>
                <p>
                  Our artists work closely with every client in a private, welcoming environment. Whether it's your first piece or the completion of a full sleeve, we dedicate the same obsessive attention to detail to ensure the final result exceeds your expectations.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 pt-10 border-t border-white/10">
                <div>
                  <h5 className="text-3xl font-black text-[#C5A059]" style={{ fontFamily: 'var(--font-playfair), serif' }}>10+</h5>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2 font-bold">Years Experience</p>
                </div>
                <div>
                  <h5 className="text-3xl font-black text-[#C5A059]" style={{ fontFamily: 'var(--font-playfair), serif' }}>5k+</h5>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2 font-bold">Happy Clients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-4">What We Do</h4>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'var(--font-playfair), serif' }}>Our Specialties</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <BackgroundGradient key={index} className="rounded-[22px] bg-[#0a0a0a] p-6 sm:p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="text-4xl mb-6 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 transform origin-left">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-playfair), serif' }}>{service.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">{service.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#C5A059] group-hover:text-white transition-colors cursor-pointer">Learn More →</span>
                </div>
              </BackgroundGradient>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Section ─── */}
      <section id="gallery" className="py-24 relative z-10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-4">Portfolio</h4>
              <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'var(--font-playfair), serif' }}>Recent Work</h2>
            </div>
            <Link href="https://instagram.com" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-[#C5A059] flex items-center gap-2 transition-colors">
              Follow on Instagram <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </Link>
          </div>

          {/* Masonry-style Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx % 3 * 0.1 }}
                className="relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid"
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-widest text-[10px] border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View Details</span>
                </div>
                <img src={src} alt="Tattoo Gallery Image" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale-[0.3] group-hover:grayscale-0" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact & Location Section ─── */}
      <section id="contact" className="py-24 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Contact Details */}
            <div className="lg:w-1/3 flex flex-col justify-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C5A059] mb-4">Location</h4>
              <h2 className="text-4xl font-black mb-8" style={{ fontFamily: 'var(--font-playfair), serif' }}>Visit the Studio</h2>
              
              <div className="space-y-6 text-sm">
                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-[10px] mb-2 opacity-50">Address</p>
                  <p className="text-neutral-300">123 Ink Avenue, Suite 400<br/>New York, NY 10012</p>
                </div>
                
                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-[10px] mb-2 opacity-50">Hours</p>
                  <p className="text-neutral-300">Tuesday - Saturday<br/>11:00 AM - 8:00 PM<br/><span className="text-[#C5A059] text-xs">By Appointment Only</span></p>
                </div>

                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-[10px] mb-2 opacity-50">Contact</p>
                  <p className="text-neutral-300 hover:text-white cursor-pointer transition-colors">booking@studioinked.com</p>
                  <p className="text-neutral-300 hover:text-white cursor-pointer transition-colors">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Link href="/book" className="inline-flex w-full items-center justify-center bg-white text-black px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors duration-300">
                  Book Your Session
                </Link>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:w-2/3 relative h-100 lg:h-auto min-h-100 rounded-2xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-[#C5A059]/10 pointer-events-none z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2527998699!2d-74.14448787425354!3d40.697631233393085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1707255146030!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="absolute inset-0 filter grayscale invert contrast-125 hover:filter-none transition-all duration-700"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 border-t border-white/5 bg-[#030303] text-center">
        <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Studio.Inked. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}
