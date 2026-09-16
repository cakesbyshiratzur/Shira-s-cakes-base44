import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const WORKSHOP_IMAGES = [
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/1ce158a78_587314879_1186307480302774_708987965433807899_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/bebbf3231_611241383_1216405933959595_8238620053673918448_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/0cf8b3344_611329350_1216405800626275_1720892442430875152_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/7ff3195ca_612163989_1216405700626285_361652930909292785_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/e74a61c9f_653062671_1272496555017199_5956341393016210943_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/a2d86b8b9_653710104_1272496285017226_7564485539165464804_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/d94947161_653892354_1272496531683868_6595714512536606475_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/62398fe2d_654206872_1272496225017232_4496953975906761539_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/54b27b8d1_653041159_1272496188350569_690403717777819957_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/f86c4ddd7_654213134_1272496435017211_2340405064556593233_n.jpg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/954b50b7e_IMG_1585.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/8b29d640e_IMG_1592.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/407fa3b18_IMG_1584.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/53da7c0ab_IMG_1596.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/4914aaf22_IMG_1619.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/fe1ccd86d_IMG_1636.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/315b878e5_IMG_1642.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/22b59f3fa_IMG_1657.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/7a5b38556_IMG_1658.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/0f253d56f_IMG_1680.jpeg",
"https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/f20ca6a42_IMG_1682.jpeg"
];

const WORKSHOP_VIDEOS = [
"https://media.base44.com/videos/public/6a462d3bf18568d86a2d8bbe/60e62a7b2_01bed8d572eb46de8b988c462c93d7fa.mov",
"https://media.base44.com/videos/public/6a462d3bf18568d86a2d8bbe/3660b1eea_309ed92fa9d44f91be2654e3855f44e5.mov",
"https://media.base44.com/videos/public/6a462d3bf18568d86a2d8bbe/5ff899eb3_31130b988da74137b5f7657fb526fb5a.mov",
"https://media.base44.com/videos/public/6a462d3bf18568d86a2d8bbe/bae55a734_81203d7e312b4b56a4e46b270d43095d.mov"];


export default function WorkshopsSection() {
  const [lightbox, setLightbox] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);

  const navigateVideo = (dir) => {
    setVideoIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return WORKSHOP_VIDEOS.length - 1;
      if (next >= WORKSHOP_VIDEOS.length) return 0;
      return next;
    });
  };

  const displayed = showAll ? WORKSHOP_IMAGES : WORKSHOP_IMAGES.slice(0, 8);

  const navigate = (dir) => {
    setLightbox((prev) => {
      const next = prev + dir;
      if (next < 0) return WORKSHOP_IMAGES.length - 1;
      if (next >= WORKSHOP_IMAGES.length) return 0;
      return next;
    });
  };

  return (
    <section id="workshops" className="py-24 lg:py-36 bg-blush">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Learn & Create</p>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold text-rosewood mb-6">
              Baking 101 Workshops
            </h2>
            <p className="text-rosewood/60 max-w-2xl mx-auto">A sneak peek into my fun and educational Baking 101 Workshops, where I teach the fundamentals of baking to kids of all skill levels.
Click through the videos below recapping each session!!

            </p>
          </div>
        </ScrollReveal>

        {/* Video Carousel */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative aspect-video bg-rosewood/10 overflow-hidden">
              <video
                key={WORKSHOP_VIDEOS[videoIndex]}
                controls
                className="w-full h-full object-contain bg-black">
                
                <source src={WORKSHOP_VIDEOS[videoIndex]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {WORKSHOP_VIDEOS.length > 1 &&
              <>
                  <button
                  onClick={() => navigateVideo(-1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-1.5 transition-colors">
                  
                    <ChevronLeft size={24} />
                  </button>
                  <button
                  onClick={() => navigateVideo(1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-1.5 transition-colors">
                  
                    <ChevronRight size={24} />
                  </button>
                </>
              }
            </div>
            {WORKSHOP_VIDEOS.length > 1 &&
            <div className="flex justify-center gap-2 mt-4">
                {WORKSHOP_VIDEOS.map((v, idx) =>
              <button
                key={v}
                onClick={() => setVideoIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                idx === videoIndex ? "bg-rosewood" : "bg-rosewood/25"}`
                } />

              )}
              </div>
            }
          </div>
        </ScrollReveal>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {displayed.map((src, idx) =>
          <ScrollReveal key={src} delay={idx * 0.04}>
              <div
              className="group cursor-pointer overflow-hidden aspect-square"
              onClick={() => setLightbox(WORKSHOP_IMAGES.indexOf(src))}>
              
                <img
                src={src}
                alt={`Baking workshop moment`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              
              </div>
            </ScrollReveal>
          )}
        </div>

        {!showAll && WORKSHOP_IMAGES.length > 8 &&
        <div className="text-center mt-10">
            <button
            onClick={() => setShowAll(true)}
            className="border border-rosewood/30 text-rosewood px-10 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood hover:text-ivory transition-all duration-500">
            
              View All Photos ({WORKSHOP_IMAGES.length})
            </button>
          </div>
        }

        <div className="text-center mt-12 flex flex-col items-center gap-5">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdgW8dm3mvVcmKLbzbbAkX8_tjh7Cm33g8jBLXqC5Mso87EUw/closedform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-rosewood text-ivory px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood/90 transition-colors duration-300">
            
            Sign Up for a Workshop
          </a>
          <a
            href="https://chat.whatsapp.com/DRUWdSY0RzY1JMJufxTxHK?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-rosewood/70 hover:text-rosewood text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-300">
            
            <MessageCircle size={16} className="text-gold" />
            Join our WhatsApp Community for Workshop Updates
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}>
          
            <button
            onClick={(e) => {e.stopPropagation();setLightbox(null);}}
            className="absolute top-6 right-6 text-white/80 hover:text-white z-10">
            
              <X size={28} />
            </button>
            <button
            onClick={(e) => {e.stopPropagation();navigate(-1);}}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10">
            
              <ChevronLeft size={36} />
            </button>
            <button
            onClick={(e) => {e.stopPropagation();navigate(1);}}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10">
            
              <ChevronRight size={36} />
            </button>
            <motion.img
            key={WORKSHOP_IMAGES[lightbox]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={WORKSHOP_IMAGES[lightbox]}
            alt="Workshop photo"
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()} />
          
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}