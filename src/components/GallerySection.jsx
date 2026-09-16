import React, { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const BIRTHDAY_IMAGES = [
  "/media/4f717f4ad_IMG_4296.jpg",
  "/media/cdb051bf4_IMG_3486.jpg",
  "/media/8e2afd658_IMG_3736.jpg",
  "/media/c1185555d_IMG_3840.jpg",
  "/media/56f50cc32_IMG_3242.jpg",
  "/media/45553401b_IMG_2784.jpg",
  "/media/57fb7a345_IMG_3582.jpg",
  "/media/9722f8be2_IMG_3614.jpg",
  "/media/6638c33c1_IMG_4014.jpg",
  "/media/733e400cd_IMG_4012.jpg",
  "/media/3d8a5273f_IMG_2310.jpg",
  "/media/3edda09c6_IMG_2333.jpg",
  "/media/ba6411506_IMG_1684.jpg",
  "/media/8c3d09578_IMG_2664.jpg",
  "/media/fcc75755a_IMG_0043.jpg",
  "/media/be9f2a3aa_IMG_0328.jpg",
  "/media/1b37eb1a2_IMG_0480.jpg",
  "/media/273e8e847_PHOTO-2025-09-28-18-14-47.jpg",
  "/media/2b9ef2a0f_PHOTO-2025-09-28-18-14-482.jpg",
  "/media/d94f2b703_PHOTO-2025-09-28-18-14-48.jpg",
  "/media/323064cdc_PHOTO-2025-09-28-18-15-11.jpg",
  "/media/2062520d9_PHOTO-2025-09-28-18-15-23.jpg",
  "/media/2d6a07d45_PHOTO-2025-09-28-18-15-32.jpg",
  "/media/8e451e715_PHOTO-2025-09-28-18-15-45.jpg",
  "/media/f56d2ad9a_PHOTO-2025-09-28-18-15-56.jpg",
  "/media/3b08f3e0f_PHOTO-2025-09-28-18-16-05.jpg",
  "/media/e8370162c_PHOTO-2025-09-28-18-16-14.jpg",
  "/media/87c825d3f_PHOTO-2025-09-28-18-16-29.jpg",
  "/media/c63a1e096_PHOTO-2025-09-28-18-16-37.jpg",
  "/media/3c6084c58_PHOTO-2025-09-28-18-17-10.jpg",
  "/media/94c8780fd_PHOTO-2025-09-28-18-16-47.jpg",
  "/media/cf9bb8f11_PHOTO-2025-09-28-18-17-18.jpg",
  "/media/c5b109704_PHOTO-2025-09-28-18-17-26.jpg",
  "/media/5c4000f8d_PHOTO-2025-09-28-18-17-41.jpg",
  "/media/d4bf1b8ac_PHOTO-2025-09-28-18-17-50.jpg",
  "/media/14ff070b1_PHOTO-2025-09-28-18-21-39.jpg",
  "/media/7ff92c02b_PHOTO-2025-09-28-18-21-40.jpg",
  "/media/8772d198e_PHOTO-2025-09-28-18-21-412.jpg",
  "/media/0beb49c07_PHOTO-2025-09-28-18-21-41.jpg",
  "/media/89a843c7d_PHOTO-2025-09-28-18-21-42.jpg",
  "/media/e39a39a05_PHOTO-2025-09-28-18-21-432.jpg",
  "/media/30d5d826c_PHOTO-2025-09-28-18-21-43.jpg",
  "/media/0aa7e3f99_PHOTO-2025-09-28-18-21-442.jpg",
  "/media/74408cdb9_PHOTO-2025-09-28-18-21-44.jpg",
  "/media/efbeea78b_PHOTO-2025-09-28-18-21-452.jpg",
  "/media/d1bc66fb6_PHOTO-2025-09-28-18-21-45.jpg",
  "/media/14ec338d6_PHOTO-2025-09-28-18-21-462.jpg",
  "/media/38fed1558_PHOTO-2025-09-28-18-21-46.jpg",
  "/media/c1babc3c8_PHOTO-2025-09-28-18-21-472.jpg",
  "/media/1e05c3430_PHOTO-2025-09-28-18-21-47.jpg",
  "/media/181ad8aca_PHOTO-2025-09-28-18-21-482.jpg",
  "/media/97498788f_PHOTO-2025-09-28-18-21-48.jpg",
  "/media/5abec1eac_PHOTO-2025-09-28-18-21-492.jpg",
  "/media/d339a27d2_PHOTO-2025-09-28-18-21-49.jpg",
  "/media/833414bca_PHOTO-2025-09-28-18-21-502.jpg",
  "/media/0750b2d16_PHOTO-2025-09-28-18-21-50.jpg",
  "/media/b55ffa9f0_PHOTO-2025-09-28-18-21-51.jpg",
  "/media/b87562049_PHOTO-2025-09-28-18-21-522.jpg",
  "/media/ef937d899_PHOTO-2025-09-28-18-21-52.jpg",
  "/media/bb13161a8_PHOTO-2025-09-28-18-21-532.jpg",
  "/media/a0b305137_PHOTO-2025-09-28-18-21-53.jpg",
  "/media/65f5d6feb_PHOTO-2025-09-28-18-21-54.jpg",
  "/media/0cff6424c_PHOTO-2025-09-28-21-41-51.jpg",
  "/media/8c449c683_PHOTO-2025-09-28-21-41-52.jpg",
  "/media/273e8e847_PHOTO-2025-09-28-18-14-47.jpg",
  "/media/9366bd90c_IMG_3630.jpg",
  "/media/49f8deb20_IMG_4119.jpg",
  "/media/6f7433c78_IMG_4129.jpg",
  "/media/14e6a668a_IMG_9943.jpeg",
  "/media/2a2d50a76_IMG_9962.jpeg"
].map((src) => ({ src, cat: "cakes", type: "image" }));

const COOKIE_IMAGES = [
  "/media/52236a5ba_95B2A2D6-5340-453C-8F6A-33F67D715953_1_102_a.jpg",
  "/media/d3af3efa3_FDD83B2D-E93D-4113-BB8D-978B81074B3A_1_106_c.jpg",
  "/media/6b900b01a_0FCEEFDA-E0DD-4BC1-BA4E-18385785E706_1_206_a.jpg",
  "/media/dab6dc246_491092DA-C09B-4FA1-87A2-35B412DFBBBB.jpg",
  "/media/f7b925cd0_IMG_4094.jpg",
  "/media/2a5df229c_IMG_4098.jpg",
  "/media/419387a3d_IMG_4100.jpg",
  "/media/71da869aa_IMG_1661.jpg",
  "/media/efe20b248_IMG_4157.jpg",
  "/media/cb8d1f3e5_IMG_4176.jpg",
  "/media/ee1df3cf6_IMG_8789.jpg"
].map((src) => ({ src, cat: "cookies", type: "image" }));

const CATERING_IMAGES = [
{ src: "/media/fca7a6197_IMG_8848.jpg", cat: "catering" },
{ src: "/media/a20f7cbc9_IMG_8855.jpg", cat: "catering" },
{ src: "/media/a44635aae_IMG_8853.jpg", cat: "catering" },
{ src: "/media/470636570_IMG_8875.jpg", cat: "catering" },
{ src: "/media/9366bd90c_IMG_3630.jpg", cat: "catering" },
{ src: "/media/e0fca36e3_IMG_3637.jpg", cat: "catering" },
{ src: "/media/63501eeb7_IMG_3638.jpg", cat: "catering" },
{ src: "/media/49f8deb20_IMG_4119.jpg", cat: "catering" },
{ src: "/media/6f7433c78_IMG_4129.jpg", cat: "catering" },
{ src: "/media/f50c90e79_IMG_8840.mov", cat: "catering", type: "video" },
{ src: "/media/6b839eab2_IMG_3625.mov", cat: "catering", type: "video" },
{ src: "/media/c4c63f7ca_IMG_3663.mov", cat: "catering", type: "video" },
{ src: "/media/d30ad24f2_IMG_4128.mov", cat: "catering", type: "video" },
{ src: "/media/2ae456d02_IMG_4136.mov", cat: "catering", type: "video" }];


const ALL_IMAGES = [...BIRTHDAY_IMAGES, ...COOKIE_IMAGES, ...CATERING_IMAGES];

const FILTERS = [
{ label: "All", value: "all", count: ALL_IMAGES.length },
{ label: "Cakes & Cupcakes", value: "cakes", count: BIRTHDAY_IMAGES.length },
{ label: "Cookies", value: "cookies", count: COOKIE_IMAGES.length },
{ label: "Catering", value: "catering", count: CATERING_IMAGES.length }];


export default function GallerySection() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "all") return ALL_IMAGES;
    return ALL_IMAGES.filter((img) => img.cat === filter);
  }, [filter]);

  const displayImages = showAll ? filtered : filtered.slice(0, 12);

  const openLightbox = (idx) => {
    const globalIdx = filtered.indexOf(displayImages[idx]);
    setLightbox(globalIdx);
  };

  const navigate = (dir) => {
    setLightbox((prev) => {
      const next = prev + dir;
      if (next < 0) return filtered.length - 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  };

  return (
    <section id="gallery" className="py-24 lg:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Portfolio</p>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold text-rosewood mb-6">
              Photo Gallery
            </h2>
            <p className="text-rosewood/60 max-w-2xl mx-auto">
              A showcase of my beautiful custom cakes, cupcakes, and cookies that have brought 
              joy to countless celebrations.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {FILTERS.map((f) =>
            <button
              key={f.value}
              onClick={() => {setFilter(f.value);setShowAll(false);}}
              className={`px-6 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
              filter === f.value ?
              "bg-rosewood text-ivory" :
              "bg-blush text-rosewood/60 hover:text-rosewood hover:bg-blush/80"}`
              }>
              
                {f.label} ({f.count})
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Grid — asymmetric lookbook */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {displayImages.map((img, idx) => {
            const isShowstopper = idx === 0 || idx === 5;
            return (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.03 }}
                className={`group cursor-pointer overflow-hidden ${
                isShowstopper ? "col-span-2 row-span-2" : ""}`
                }
                onClick={() => openLightbox(idx)}>
                
                <div className={`relative overflow-hidden ${isShowstopper ? "aspect-square" : "aspect-square"}`}>
                  {img.type === "video" ?
                  <video
                    src={img.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> :


                  <img
                    src={img.src}
                    alt={`Custom ${img.cat} creation`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                  }
                  <div className="absolute inset-0 bg-rosewood/0 group-hover:bg-rosewood/20 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-ivory text-xs tracking-[0.2em] uppercase font-medium">
                      {img.cat === "cakes" ? "Cake & Cupcake" : img.cat === "cookies" ? "Cookie" : "Catering"}
                    </span>
                  </div>
                </div>
              </motion.div>);

          })}
        </div>

        {!showAll && filtered.length > 12 &&
        <div className="text-center mt-12">
            <button
            onClick={() => setShowAll(true)}
            className="border border-rosewood/30 text-rosewood px-10 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood hover:text-ivory transition-all duration-500">
            
              View All ({filtered.length})
            </button>
          </div>
        }
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
            {filtered[lightbox]?.type === "video" ?
          <motion.video
            key={filtered[lightbox]?.src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            src={filtered[lightbox]?.src}
            controls
            muted
            autoPlay
            loop
            playsInline
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()} /> :


          <motion.img
            key={filtered[lightbox]?.src}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            src={filtered[lightbox]?.src}
            alt="Gallery image"
            className="max-h-[85vh] max-w-[90vw] object-contain hidden"
            onClick={(e) => e.stopPropagation()} />

          }
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}