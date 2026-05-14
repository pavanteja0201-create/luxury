"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const SPECS = [
  {
    category: "Case & Crystal",
    title: "18K Rose Gold & Sapphire",
    details: "Diameter: 44.5mm. Thickness: 18mm. Monobloc sapphire crystal band providing an unhindered 360-degree view of the gravitational universe."
  },
  {
    category: "Movement Caliber",
    title: "Exclusive Manufacture",
    details: "Hand-wound mechanical caliber. 386 components crafted to microscopic precision. Unsurpassed chronometric stability in zero gravity."
  },
  {
    category: "Complications",
    title: "Multi-Axis Tourbillon",
    details: "Triple-axis gravitational tourbillon rotating in 60-second, 2.5-minute, and 10-minute harmonic cycles across three dimensions."
  },
  {
    category: "Power Reserve",
    title: "60-Hour Autonomy",
    details: "Differential winding system coupled with dual mainspring barrels, ensuring consistent torque delivery over 60 hours."
  },
  {
    category: "Dial & Elements",
    title: "Celestial Constellations",
    details: "Hand-engraved celestial panorama with DLC titanium base. Blued Jacob & Co. hands polished to absolute perfection."
  },
  {
    category: "Strap & Buckle",
    title: "Alligator & Rose Gold",
    details: "Hand-stitched large-scale black alligator leather strap paired with an 18K rose gold deployant security clasp."
  }
];

function SpecCard({ spec, idx }: { spec: typeof SPECS[0], idx: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.15, type: "spring", stiffness: 60 }}
      onMouseMove={handleMouseMove}
      className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 transition-all duration-500 backdrop-blur-md flex flex-col justify-between overflow-hidden"
    >
      {/* Mouse Spotlight effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 group-hover:via-white/50 to-transparent transition-all duration-500 z-10" />
      
      <div className="z-10 relative pointer-events-none">
        <span className="text-xs uppercase tracking-[0.25em] text-white/40 block mb-3 font-mono">
          {spec.category}
        </span>
        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-white/90 transition-colors">
          {spec.title}
        </h3>
      </div>
      <p className="text-white/60 text-sm leading-relaxed font-sans tracking-wide z-10 relative pointer-events-none">
        {spec.details}
      </p>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <div className="relative bg-black min-h-screen py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-white mb-6"
          >
            Technical Specifications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 tracking-[0.2em] uppercase text-sm"
          >
            Uncompromising Haute Horlogerie
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECS.map((spec, idx) => (
            <SpecCard key={idx} spec={spec} idx={idx} />
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-40 overflow-hidden relative w-full border-y border-white/10 py-8 flex group">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex space-x-16 whitespace-nowrap font-serif text-3xl md:text-5xl italic px-8 transition-colors duration-500"
            style={{ 
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.3)"
            }}
          >
            <span className="hover:text-white hover:[webkit-text-stroke:0px] transition-all duration-300 cursor-default">"The choice of champions."</span>
            <span className="text-white/20" style={{ WebkitTextStroke: "0" }}>•</span>
            <span className="hover:text-white hover:[webkit-text-stroke:0px] transition-all duration-300 cursor-default">"A mechanical universe on the wrist."</span>
            <span className="text-white/20" style={{ WebkitTextStroke: "0" }}>•</span>
            <span className="hover:text-white hover:[webkit-text-stroke:0px] transition-all duration-300 cursor-default">"Redefining haute horlogerie."</span>
            <span className="text-white/20" style={{ WebkitTextStroke: "0" }}>•</span>
            <span className="hover:text-white hover:[webkit-text-stroke:0px] transition-all duration-300 cursor-default">"The choice of champions."</span>
            <span className="text-white/20" style={{ WebkitTextStroke: "0" }}>•</span>
            <span className="hover:text-white hover:[webkit-text-stroke:0px] transition-all duration-300 cursor-default">"A mechanical universe on the wrist."</span>
            <span className="text-white/20" style={{ WebkitTextStroke: "0" }}>•</span>
            <span className="hover:text-white hover:[webkit-text-stroke:0px] transition-all duration-300 cursor-default">"Redefining haute horlogerie."</span>
          </motion.div>
        </div>

        {/* Final CTA */}
        <div id="reserve" className="mt-40 text-center flex flex-col items-center">
          <h2 className="text-4xl font-serif text-white mb-10">Secure Your Legacy</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-gradient-to-r from-[#C0C0C0] via-[#E8E8E8] to-[#C0C0C0] rounded-full overflow-hidden block cursor-pointer shadow-[0_0_30px_rgba(192,192,192,0.15)] hover:shadow-[0_0_40px_rgba(192,192,192,0.3)] transition-shadow duration-500"
          >
            {/* Metallic Sweep */}
            <motion.div 
              className="absolute top-0 bottom-0 w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 mix-blend-overlay"
              animate={{ left: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
            />
            <span className="relative text-black text-sm font-bold tracking-[0.2em] uppercase z-10">
              Reserve Now
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
