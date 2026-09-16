import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              <img
                src="/media/90404c6f4_D2350161-300E-4158-A2F0-0E598247F449.jpeg"
                alt="Shira Tzur — Baker and Cake Designer"
                className="w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] object-cover" />
              
              <div className="absolute -right-4 top-8 bottom-8 w-px bg-gold/30 hidden lg:block" />

              {/* Badge */}
              <div className="absolute -bottom-6 -right-2 lg:right-auto lg:-left-6 bg-rosewood text-ivory px-6 py-4">
                <p className="font-display text-2xl font-semibold">Since 2019</p>
                <p className="text-ivory/70 text-sm tracking-wider">Creating Sweet Memories</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-8">
              <div>
                <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">The Baker</p>
                <h2 className="font-display text-4xl lg:text-6xl font-semibold text-rosewood leading-tight">
                  About Me
                </h2>
              </div>

              <div className="w-12 h-px bg-gold" />

              <div className="space-y-6 text-rosewood/70 leading-relaxed">
                <p>I'm Shira Tzur, a 20-year-old self-taught baker, cake designer, and full-time student at the University of Texas at Austin. What started as a fun hobby quickly turned into a full-blown passion, and since 2019, I've been bringing custom cake visions to life for any occasion.




                </p>
                <p>While custom cakes are my specialty, I also create cupcakes, cookies, and run baking workshops where I teach the basics (and the fun!) of baking.


                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>);

}