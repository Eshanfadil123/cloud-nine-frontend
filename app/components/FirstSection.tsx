"use client";

import gsap from "gsap";
import Hero from "./Hero";
import Middle from "./Middle";
import Last from "./Last";
import Header from "./Header";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function FirstSection() {

  const container = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    // Background parallax
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} 
    id="home">
      <Header />
      <main 
      className="hero-wrapper relative h-[300vh] opacity-100 overflow-hidden">
        <img
          src="/image/hero.jpg"
          className="hero-bg absolute inset-0 w-full h-full object-cover opacity-100 filter brightness-70"
        />
        <Hero />
        <Middle />
        <Last />
      </main>
    </div>
  )
}