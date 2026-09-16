import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const FALLBACK_REVIEWS = [
  {
    name: "Shiran Tesler-Greenberg",
    text: "We needed a cake last minute and Shira delivered! The cake was beautiful, just like the inspo picture we sent her, and really delicious! The birthday girl was very happy 💟",
  },
  {
    name: "Hadar Spiro",
    text: "Thank you Shira Tzur for another amazing, creative workshop! 🎂",
  },
  {
    name: "Orly Achkenazy",
    text: "The cake was beautiful and yummy ❤️",
  },
  {
    name: "Inbal Annabelle Dekalo",
    text: "We ordered a cake from Shira for Lia's Bat Mitzvah, and it was simply perfect! The design and taste were exactly as we had imagined. The cake was the center of attention at the event, and not a crumb was left! Thank you very much for a perfect cake, highly recommend!!!",
  },
  {
    name: "Adva Ram",
    text: "Huge shout-out to Shira for making the most incredible birthday cake! Not only was it a showstopper that was perfect for the theme, but it was also absolutely delicious 🎂 Already can't wait to order for next year! ✨",
  },
  {
    name: "Revital Dimri",
    text: "Shira made me an amazing cake for my 20th birthday — it was so beautiful, creative, and delicious! 🎂❤️ She truly put so much love and effort into it, and it was exactly what I wanted. Highly recommend!",
  },
  {
    name: "Ariella Spiro Guzman",
    text: "Shira is an incredibly talented baker. She absolutely nailed the design and delivered a cake that tasted as good as it looked. Highly recommend her for any occasion!",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000);
  };

  useEffect(() => {
    if (reviews.length > 0) {
      startAutoplay();
    }
    return () => clearInterval(intervalRef.current);
  }, [reviews.length]);

  const goTo = (dir) => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return reviews.length - 1;
      if (next >= reviews.length) return 0;
      return next;
    });
    startAutoplay();
  };

  return (
    <section id="reviews" className="py-24 lg:py-36 bg-ivory">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Kind Words</p>
            <h2 className="font-display text-4xl lg:text-6xl font-semibold text-rosewood mb-6">
              Customer Reviews
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative">
            <div className="text-center px-4 md:px-16 min-h-[240px] flex flex-col items-center justify-center">
              <Quote size={32} className="text-gold/30 mb-6" />
              <>
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-rosewood leading-relaxed italic mb-8 max-w-3xl">
                    "{reviews[current].text}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-rosewood font-medium tracking-wider text-sm uppercase">
                    {reviews[current].name}
                  </p>
              </>
            </div>

            {/* Navigation */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-10">
                <button
                  onClick={() => goTo(-1)}
                  className="w-10 h-10 border border-rosewood/20 flex items-center justify-center text-rosewood/60 hover:text-rosewood hover:border-rosewood/40 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        clearInterval(intervalRef.current);
                        setCurrent(i);
                        startAutoplay();
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === current ? "bg-rosewood w-6" : "bg-rosewood/20"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => goTo(1)}
                  className="w-10 h-10 border border-rosewood/20 flex items-center justify-center text-rosewood/60 hover:text-rosewood hover:border-rosewood/40 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="text-center mt-12">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScPp0i5fmky2jCsq7ktJWUGWS742WJkuxoAwNfAbBnWHvjrEg/viewform?fbzx=-6665254677785131024"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-rosewood/30 text-rosewood px-10 py-3 text-sm font-medium tracking-[0.2em] uppercase hover:bg-rosewood hover:text-ivory transition-all duration-500"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}