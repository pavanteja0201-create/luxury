"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, Variants } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;

export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Preload all images into browser cache
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/sequence/ezgif-frame-${paddedIndex}.png`;
        img.onload = () => {
          loadedCount++;
          if (i === 1) render(); // Draw first frame immediately
        };
        images.push(img);
      }
    };

    preloadImages();

    const playhead = { frame: 0 };
    let currentFrame = 0;
    let requestId: number;

    const render = () => {
      // Linear interpolation for frame index to make it buttery smooth
      // We lerp towards the target playhead.frame
      currentFrame = gsap.utils.interpolate(currentFrame, playhead.frame, 0.2);
      const frameIdx = Math.round(currentFrame);

      if (canvasRef.current && images[frameIdx]) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha if images are opaque
        if (ctx) {
          const img = images[frameIdx];
          if (img.complete && img.naturalWidth > 0) {
            // Handle DPR and Canvas sizing
            const dpr = window.devicePixelRatio || 1;
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;

            if (canvas.width !== displayWidth * dpr) {
              canvas.width = displayWidth * dpr;
              canvas.height = displayHeight * dpr;
            }

            // Draw image with proper aspect ratio (cover)
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = canvas.width / canvas.height;
            let drawWidth, drawHeight, drawX, drawY;

            if (imgRatio > canvasRatio) {
              drawHeight = canvas.height;
              drawWidth = canvas.height * imgRatio;
              drawX = (canvas.width - drawWidth) / 2;
              drawY = 0;
            } else {
              drawWidth = canvas.width;
              drawHeight = canvas.width / imgRatio;
              drawX = 0;
              drawY = (canvas.height - drawHeight) / 2;
            }

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          }
        }
      }
      requestId = requestAnimationFrame(render);
    };

    const ctx = gsap.context(() => {
      gsap.to(playhead, {
        frame: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Lower scrub because we are lerping in the render loop and have Lenis
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(requestId);
    };
  }, []);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Hardware-accelerated direct GPU canvas rendering */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full select-none pointer-events-none will-change-transform" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </div>
      
      {/* Content Beats overlays */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="relative h-[600vh]">
          {/* Beat 1: 15-30% */}
          <div className="absolute top-[20%] left-6 md:left-24 lg:left-32 max-w-xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5, margin: "-100px" }}
              variants={textVariants}
              className="p-8 md:p-12 -ml-8 -mt-8"
              style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0.85) 0%, transparent 70%)" }}
            >
              <h2 
                className="text-4xl md:text-6xl font-serif text-white mb-4"
                style={{ textShadow: "0 4px 20px black, 0 0 40px black" }}
              >
                Inspired by the Impossible.
              </h2>
              <p 
                className="text-white/90 font-sans tracking-wide leading-relaxed text-sm md:text-base"
                style={{ textShadow: "0 2px 10px black, 0 0 20px black" }}
              >
                A masterpiece of micro-engineering. Overcoming the limits of traditional horology to capture the cosmos on your wrist.
              </p>
            </motion.div>
          </div>

          {/* Beat 2: 40-55% */}
          <div className="absolute top-[45%] right-6 md:right-24 lg:right-32 max-w-xl text-right">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5, margin: "-100px" }}
              variants={textVariants}
              className="p-8 md:p-12 -mr-8 -mt-8"
              style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0.85) 0%, transparent 70%)" }}
            >
              <h2 
                className="text-4xl md:text-6xl font-serif text-white mb-4"
                style={{ textShadow: "0 4px 20px black, 0 0 40px black" }}
              >
                Double-Axis Tourbillon.
              </h2>
              <p 
                className="text-white/90 font-sans tracking-wide leading-relaxed ml-auto text-sm md:text-base"
                style={{ textShadow: "0 2px 10px black, 0 0 20px black" }}
              >
                Defying gravity in multiple dimensions. An intricate dance of gears rotating at unprecedented speeds to maintain perfect chronometry.
              </p>
            </motion.div>
          </div>

          {/* Beat 3: 65-80% */}
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 text-center max-w-2xl w-full px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5, margin: "-100px" }}
              variants={textVariants}
              className="p-8 md:p-16 -mt-8"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 70%)" }}
            >
              <h2 
                className="text-4xl md:text-6xl font-serif text-white mb-4"
                style={{ textShadow: "0 4px 20px black, 0 0 40px black" }}
              >
                A Celestial Masterpiece.
              </h2>
              <p 
                className="text-white/90 font-sans tracking-wide leading-relaxed mx-auto text-sm md:text-base"
                style={{ textShadow: "0 2px 10px black, 0 0 20px black" }}
              >
                Encased in flawless sapphire and 18K rose gold. Every component finished to the highest standard of haute horlogerie.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
