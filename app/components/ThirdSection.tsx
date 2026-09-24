"use client";

import { useLayoutEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function ThirdSection() {
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = marqueeRef.current;

      gsap.to(track, {
        xPercent: -50,
        duration: 15,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="video"
      className="third relative  w-full h-screen bg-light overflow-hidden flex items-center justify-center"
    >
          

      {/* VIDEO */}
      <div
        className="video-wrapper relative z-10 w-[800px] h-[500px] overflow-hidden shadow-2xl backdrop-blur-3xl border border-[#FAF9F6]"
        style={{
          clipPath: "url(#invertedShape)",
        }}
      >
        <svg
          className="absolute w-0 h-0"
          aria-hidden="true"
        >
          <defs>
            <clipPath
              id="invertedShape"
              clipPathUnits="objectBoundingBox"
            >
              <path
                d="
                  M 0.01 0.04
                  Q 0.50 -0.015 0.99 0.04
                  L 0.99 0.96
                  Q 0.50 0.999 0.01 0.96
                  Z
                "
              />
            </clipPath>
          </defs>
        </svg>

        <video
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(.85) contrast(1.15) saturate(.8)",
          }}
          playsInline
          autoPlay
          muted
          loop
          src="/video/video3.mp4"
        />
      </div>

    </section>
  );
}