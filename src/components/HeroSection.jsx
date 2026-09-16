import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const HERO_IMAGE = "/media/672dfd492_generated_8167e011.png";

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-blush overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ivory/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20 lg:pt-20 lg:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Left: Typography */}
          <div className="space-y-10 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
              
              <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-6">
                Crafted with love since 2019
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-rosewood leading-[0.95] tracking-tight">
                Making
                <br />
                Moments
                <br />
                <span className="italic font-light">Sweeter</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-rosewood/70 text-lg max-w-md leading-relaxed">
              
              Made-to-order cakes, cupcakes, and cookies crafted just for you. 
              Discover my group 101 baking workshops for every skill level.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6">
              
              <div className="flex items-center gap-2 text-gold">
                <MapPin size={16} />
                <span className="text-sm font-medium tracking-wider uppercase">
                  Serving Dallas-Fort Worth & Austin Areas
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("#services")}
                  className="inline-flex items-center justify-center bg-rosewood text-ivory px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood/90 transition-all duration-500">
                  
                  Order Now
                </button>
                <button
                  onClick={() => scrollTo("#gallery")}
                  className="inline-flex items-center justify-center border border-rosewood/30 text-rosewood px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood/5 transition-all duration-500">
                  
                  View Gallery
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative">
            
            <div className="relative aspect-[3/4] max-h-[85vh]">
              <img src="/media/717404ff8_0.jpg"

              alt="Elegant custom cake with buttercream swirls and sugar flowers"
              className="w-full h-full object-cover" />
              
              {/* Gold accent line */}
              <div className="absolute -left-4 top-8 bottom-8 w-px bg-gold/40" />
              <div className="absolute -bottom-4 left-8 right-8 h-px bg-gold/40" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        
        <span className="text-rosewood/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-8 bg-gold/40" />
        
      </motion.div>
    </section>);

}