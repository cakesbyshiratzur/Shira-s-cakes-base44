import React from "react";
import { Cake, Cookie, ChefHat, UtensilsCrossed } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SERVICES = [
{
  icon: Cake,
  title: "Custom Cakes & Cupcakes",
  description: "Personalized cakes and cupcakes designed to match your vision and taste perfectly.",
  image: "https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/aa7bc14ad_IMG_1684.jpeg",
  links: [
    { label: "Order Cakes", url: "https://forms.gle/Pa1PhVXnZYFkzCRw7" },
    { label: "Order Cupcakes", url: "https://forms.gle/MV4BAmHkWdeiNR2s9" }
  ]
},
{
  icon: Cookie,
  title: "Custom Cookies",
  description: "Beautifully decorated cookies perfect for any occasion or celebration.",
  image: "https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/75d63ae26_IMG_4094.jpeg",
  link: "https://forms.gle/Joe62J948DDuG5Yv9",
  cta: "Order Now"
},
{
  icon: ChefHat,
  title: "Baking 101 Workshops",
  description: "Learn the basics of baking in my fun and educational workshops.",
  image: "https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/51d442215_IMG_2245.jpeg",
  link: "https://docs.google.com/forms/d/e/1FAIpQLSdgW8dm3mvVcmKLbzbbAkX8_tjh7Cm33g8jBLXqC5Mso87EUw/closedform",
  cta: "Sign Up"
},
{
  icon: UtensilsCrossed,
  title: "Catering Orders",
  description: "Assorted cookie and cupcake spreads perfect for office events, parties, and gatherings of any size.",
  image: "https://media.base44.com/images/public/6a462d3bf18568d86a2d8bbe/9366bd90c_IMG_3630.jpg",
  link: "#contact",
  cta: "Get a Quote"
}];


export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-36 bg-blush">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">What I Offer</p>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold text-rosewood mb-6">
              My Services
            </h2>
            <p className="text-rosewood/60 max-w-2xl mx-auto">
              From custom cakes to baking workshops, I offer a full range of sweet services 
              to make your special moments unforgettable.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {SERVICES.map((service, i) =>
          <ScrollReveal key={service.title} delay={i * 0.12}>
              <div className="group bg-ivory h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <service.icon size={20} className="text-gold" />
                    <h3 className="font-display text-2xl font-semibold text-rosewood">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-rosewood/60 mb-8 flex-1">{service.description}</p>
                  {service.links ? (
                    <div className="flex flex-wrap gap-3 self-start">
                      {service.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-rosewood text-ivory px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood/90 transition-colors duration-300"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                  <a
                  href={service.link}
                  target={service.link.startsWith("#") ? undefined : "_blank"}
                  rel={service.link.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center justify-center bg-rosewood text-ivory px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood/90 transition-colors duration-300 self-start">
                  
                    {service.cta}
                  </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>);

}