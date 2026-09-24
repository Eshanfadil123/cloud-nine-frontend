"use client";

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

gsap.registerPlugin(ScrollTrigger);

export default function SeventhSection() {

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(imageRef.current, {
        y: -200,
        scale: 1.1,
        ease: "none"
      })

      tl.to(
        contentRef.current,
        {
          y: 120,
          ease: "none",
        },
        "<"
      )

        .to(
        paraRef.current,
        {
          y: 80,          // move DOWN
          ease: "none",
        },
        "<"
      )
  });

  return () => ctx.revert();
}, []);

useEffect(() => {
  if (!paraRef.current) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      paraRef.current.querySelectorAll(".line"),
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paraRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",

        },
      }
    );
  }, paraRef);

  return () => ctx.revert();
}, []);

return (
  <section
    ref={sectionRef}
    className="seventh h-[100vh] w-screen relative flex justify-center items-center bg-light overflow-hidden">
    <div className="seventh-wrapper h-full w-full overflow-hidden">
      <div
        className="image-wrapper relative h-[110vh] w-full overflow-hidden">
        <img
          ref={imageRef}
          src="/image/seventhImage.jpg"
          className="absolute inset-0 w-full h-[110vh] object-cover"
        />
      </div>
      <div
        ref={contentRef}
        className="
    absolute
    top-30
    left-1/2
    flex
    justify-center
    items-center
    z-20
    pointer-events-none
  "
      >
        <div className="relative">
          <div
            ref={paraRef}
            className="
    absolute
    top-0
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    z-10
    w-[700px]
    flex
    flex-col
    scale-y-200
    lg:leading-4.5 leading-3.5
    font-bold
    text-center
  "
          >
            <div className="overflow-hidden">
              <span
                className={`
        line
        inline-block
        ${playfair.className}
        lg:text-[24px] text-[18px]
        text-light
      `}
              >
                Every stay is thoughtfully designed
              </span>
            </div>

            <div className="overflow-hidden">
              <span
                className={`
        line
        inline-block
        ${playfair.className}
        lg:text-[24px] text-[18px]
        text-light
        
      `}
              >
                to blend timeless elegance
              </span>
            </div>

            <div className="overflow-hidden">
              <span
                className={`
        line
        inline-block
        ${playfair.className}
        lg:text-[24px] text-[18px]
        text-light
        
      `}
              >
                with modern comfort and warmth.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
)
}