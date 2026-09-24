"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FirstSection from "./components/FirstSection";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";   
import FourthSection from "./components/FourthSection";
import FifthSection from "./components/FifthSection";
import SixthSection from "./components/SixthSection";
import SeventhSection from "./components/SeventhSection";
import EightSection from "./components/EightSection";
import ChatBot from "./components/ChatBot";


gsap.registerPlugin(ScrollTrigger);



export default function Home() {

  useEffect(() => {


    const ctx = gsap.context(() => {
      gsap.set(".second-section", {
        yPercent: 50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-wrapper",
          start: "bottom bottom",
          end: "+=180%",
          scrub: 1,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      tl.to(
        ".second-section",
        {
          yPercent: 0,
          ease: "none",
          duration: 1
        },
        -0.9
      ).to(
        ".hero-wrapper",
        {
          scale: 2,
          ease: "none",
          duration: 1
        },
        -0.7
      )
    });

    return () => ctx.revert();
  }, []);

    useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".fourth-sec", {
        yPercent: 100,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".third",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      tl.to(
        ".fourth-sec",
        {
          yPercent: 0,
          ease: "none",
          duration: 1
        } , "<")
    });

    return () => ctx.revert();
  }, []);


  return (
    <main className="no-scrollbar">
  <FirstSection />
  <SecondSection />
  <ThirdSection />
  <FourthSection />
  <FifthSection />
  <SixthSection />
  <SeventhSection />
  <EightSection />
  <ChatBot />
</main>
  );
}