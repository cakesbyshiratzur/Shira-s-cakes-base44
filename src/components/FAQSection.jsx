import React, { useState } from "react";
import { Plus } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const FAQS = [
{
  q: "Where are you located?",
  a: "Austin, Texas, but occasionally I am back in Dallas, Texas for breaks and holidays."
},
{
  q: "Do you deliver?",
  a: "Pickup is always available (and recommended); however, delivery can be arranged for an additional fee depending on your location."
},
{
  q: "How far in advance should I order my cake?",
  a: "For custom cakes, I recommend booking at least 2-3 weeks in advance. However, if you need a cake on short notice, I can often accommodate orders with as little as 24-48 hours' notice! Send me a message to check my availability, and we can work something out!"
},
{
  q: "How much do your cakes cost?",
  a: "All cakes are custom-made, so prices vary based on size, flavor, and design complexity. Reach out with your desired cake, and I can provide exact quotes."
},
{
  q: "How can I see when the next workshop is?",
  a: "I post about upcoming workshops on my WhatsApp community and Facebook page."
}];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-36 bg-ivory">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Questions</p>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold text-rosewood mb-6">
              Frequently Asked
            </h2>
            <p className="text-rosewood/60 max-w-2xl mx-auto">
              Everything you need to know before placing your order.
            </p>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-rosewood/15 border-t border-b border-rosewood/15">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={item.q} delay={idx * 0.05}>
                <div>
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left">
                    
                    <span className="font-display text-xl lg:text-2xl text-rosewood">
                      {item.q}
                    </span>
                    <Plus
                      size={22}
                      className={`shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""}`
                      } />
                    
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`
                    }>
                    
                    <div className="overflow-hidden">
                      <p className="text-rosewood/70 pb-6 pr-10 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>);

          })}
        </div>
      </div>
    </section>);

}