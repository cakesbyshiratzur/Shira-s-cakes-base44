import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Workshops", href: "#workshops" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleClick("#hero")} className="flex items-center gap-3 group">
            <img
              src="/media/73e40c01c_logo2.png"
              alt="Shira's Cakes logo"
              className="h-12 w-12 md:h-14 md:w-14 object-contain group-hover:scale-105 transition-transform duration-500"
            />
            <span className="font-display text-2xl md:text-3xl font-semibold text-rosewood tracking-wide">
              Shira's Cakes
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-sm font-medium tracking-widest uppercase text-rosewood/70 hover:text-rosewood transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleClick("#services")}
              className="bg-rosewood text-ivory px-6 py-2.5 text-sm font-medium tracking-widest uppercase hover:bg-rosewood/90 transition-colors duration-300"
            >
              Order Now
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-rosewood p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ivory/98 backdrop-blur-md border-t border-blush overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="block w-full text-left text-sm font-medium tracking-widest uppercase text-rosewood/70 hover:text-rosewood transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleClick("#services")}
                className="block w-full text-center bg-rosewood text-ivory px-6 py-3 text-sm font-medium tracking-widest uppercase"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}