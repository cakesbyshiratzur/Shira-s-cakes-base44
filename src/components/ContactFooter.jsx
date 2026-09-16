import React, { useState } from "react";
import { Phone, Mail, Instagram, Facebook, MessageCircle, MapPin, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { base44 } from "@/api/base44Client";

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      await base44.integrations.Core.SendEmail({
        to: "cakesbyshiratzur@gmail.com",
        subject: `New Contact Form Submission from ${formData.name}`,
        body: `You have a new inquiry from your website contact form.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      });
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-36 bg-blush relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-6xl xl:text-7xl font-semibold text-rosewood mb-6 leading-tight">
                Let's make your next
                <br />
                <span className="italic font-light">moment sweeter</span>
              </h2>
              <div className="w-16 h-px bg-gold mx-auto mb-8" />
              <p className="text-rosewood/60 max-w-xl mx-auto">
                Ready to order or have questions? Reach out and let's create something beautiful together.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">Get in Touch</p>
                  <div className="space-y-5">
                    <a
                      href="tel:+12146776273"
                      className="flex items-center gap-4 text-rosewood/70 hover:text-rosewood transition-colors group">
                      
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                        <Phone size={16} className="text-gold" />
                      </div>
                      <span>(214) 677-6273</span>
                    </a>
                    <a
                      href="mailto:cakesbyshiratzur@gmail.com"
                      className="flex items-center gap-4 text-rosewood/70 hover:text-rosewood transition-colors group">
                      
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                        <Mail size={16} className="text-gold" />
                      </div>
                      <span>cakesbyshiratzur@gmail.com</span>
                    </a>
                    <a
                      href="https://www.instagram.com/shirascakes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-rosewood/70 hover:text-rosewood transition-colors group">
                      
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                        <Instagram size={16} className="text-gold" />
                      </div>
                      <span>@shiras cakes</span>
                    </a>
                    <a
                      href="https://www.facebook.com/cakesbyshira"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-rosewood/70 hover:text-rosewood transition-colors group">
                      
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                        <Facebook size={16} className="text-gold" />
                      </div>
                      <span>@cakesbyshira</span>
                    </a>
                    <a
                      href="https://api.whatsapp.com/send/?phone=12146776273&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-rosewood/70 hover:text-rosewood transition-colors group hidden">
                      
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                        <MessageCircle size={16} className="text-gold" />
                      </div>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@shiras_cakes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-rosewood/70 hover:text-rosewood transition-colors group hidden">
                      
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gold">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.82a4.83 4.83 0 0 1-1-.13z" fill="currentColor" />
                        </svg>
                      </div>
                      <span>@shiras_cakes</span>
                    </a>
                    <div className="flex items-center gap-4 text-rosewood/70">
                      <div className="w-10 h-10 border border-rosewood/20 flex items-center justify-center">
                        <MapPin size={16} className="text-gold" />
                      </div>
                      <span>Dallas-Fort Worth & Austin, TX</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-ivory border-b border-rosewood/20 px-4 py-3 text-rosewood placeholder:text-rosewood/30 focus:outline-none focus:border-gold transition-colors" />
                  
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory border-b border-rosewood/20 px-4 py-3 text-rosewood placeholder:text-rosewood/30 focus:outline-none focus:border-gold transition-colors" />
                  
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your celebration or ask about cakes, cupcakes, cookies, or catering..."
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-ivory border-b border-rosewood/20 px-4 py-3 text-rosewood placeholder:text-rosewood/30 focus:outline-none focus:border-gold transition-colors resize-none" />
                  
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-rosewood text-ivory px-10 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood/90 transition-colors duration-300 disabled:opacity-50">
                  
                  {sending ? "Sending..." : sent ? "Message Sent ✓" : <>Send Message <Send size={14} /></>}
                </button>
                {error &&
                <p className="text-sm text-rosewood/70">
                    Something went wrong sending your message. Please try again or reach out by phone or email.
                  </p>
                }
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rosewood text-ivory/70 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-display text-xl text-ivory font-semibold mb-1">Shira's Cakes</p>
              <p className="text-sm">Making moments sweeter since 2019</p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/shirascakes/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors">
                
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/cakesbyshira"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors">
                
                <Facebook size={18} />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=12146776273&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors">
                
                <MessageCircle size={18} />
              </a>
              <a href="tel:+12146776273" className="hover:text-ivory transition-colors">
                <Phone size={18} />
              </a>
              <a href="mailto:cakesbyshiratzur@gmail.com" className="hover:text-ivory transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="border-t border-ivory/10 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Shira's Cakes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>);

}