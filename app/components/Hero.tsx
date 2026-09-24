"use client";

import { useEffect,useLayoutEffect, useRef } from "react";
import { Bodoni_Moda, Playfair_Display } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function Hero() {

  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main heading
    gsap.to(headerRef.current, {
      y: -720,
      scale: 1.3,
      duration: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, []);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section 
    id="hero"
    className="hero-section relative h-screen flex flex-col items-center justify-center">
      <div
        ref={headerRef}
        className="flex flex-col items-center">
        <h1 className={`${bodoni.className} text-center font-bold leading-none tracking-tight  text-[#FAF9F6] text-[80px]  lg:mr-0 lg:text-[110px]`}>
          CLOUD<br /> NINE
        </h1>
        <p className="text-[16px] lg:text-[19px]  font-DM font-lighter  lg:mr-0 text-[#FAF9F6] -mt-3">A Business Class Hotel</p>
        <div className="flex flex-row lg:gap-10 lg:w-[700px] gap-4 w-[270px] lg:mr-0 lg:mt-18 mt-[200px] justify-between ">
          <p className="tracking-tighter leading-none text-[#FAF9F6] text-[13px] lg:text-[28px] font-bodoni font-semibold">A PLACE</p>
          <p className="tracking-tighter leading-none text-[#FAF9F6] text-[13px] lg:text-[28px] font-bodoni font-semibold">TO RETURN</p>
        </div>
      </div>
    </section>
  );
}