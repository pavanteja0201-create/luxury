"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Play subtle click sound
      try {
        const audio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
        audio.volume = 0.2;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-black/40 backdrop-blur-md border-b border-white/10"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif text-white tracking-widest uppercase relative group">
          <span className="relative z-10">Luxury</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:w-full transition-all duration-500"></span>
        </Link>

        {/* Controls */}
        <div className="flex items-center space-x-6 md:space-x-8">
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleSound}
              className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <div className="flex space-x-3 text-xs tracking-wider text-white/50">
              {["USD", "ETH", "BTC"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`transition-all duration-300 ${
                    currency === c ? "text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "hover:text-white/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Magnetic CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#reserve"
              className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden flex items-center justify-center backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C0C0C0] via-[#FFFFFF] to-[#808080] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <span className="relative text-white/90 group-hover:text-white text-xs font-medium tracking-[0.2em] uppercase transition-colors leading-none pt-[2px]">
                Order Now
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
