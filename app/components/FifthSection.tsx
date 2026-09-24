"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Playfair_Display } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function FifthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const middleTextRef = useRef<HTMLDivElement>(null);
  const flowerImageRef = useRef<HTMLImageElement>(null);
  const flowerImageRef2 = useRef<HTMLImageElement>(null);
  const flowerImageRef3 = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (
      !flowerImageRef.current ||
      !flowerImageRef2.current ||
      !flowerImageRef3.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.to(flowerImageRef.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(flowerImageRef2.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(flowerImageRef3.current, {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
      });
    }, [flowerImageRef, flowerImageRef2, flowerImageRef3]);

    return () => ctx.revert();
  }, []);


  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    if (!section || !wrapper) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        wrapper.scrollWidth - section.clientWidth;



      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      tl.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: "none",
      }, 0);




    }, section);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        textRef.current.querySelectorAll(".line"),
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
        , 0.05
      ).fromTo(
        ".intro-para",
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        0.6
      )
      tl.fromTo(
        middleTextRef.current!.querySelectorAll(".line"),
        {
          xPercent: 100,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        },
        0.5 // adjust timing
      )

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-light"
    >


      <div
        ref={wrapperRef}
        className="flex h-full w-max"
      >
        {/*-First Panel-*/}
        <section className="relative w-screen  h-screen flex flex-col items-center justify-center ">
          <img
            ref={flowerImageRef}
            src="/assets/flowers.png"
            className="absolute -top-12 -left-12 w-[450px] object-cover"
          />


          <img
            ref={flowerImageRef2}
            src="/assets/flowers2.png"
            className="absolute -bottom-25 right-0 w-[500px]  object-cover"
          />
          <div
            ref={textRef}
            className="
    w-[90%] lg:w-[600px]
    px-6 lg:px-13
    py-5 lg:py-12
    mb-0 lg:-mb-35
    mr-0 lg:mr-50
    mt-20 lg:mt-0
    flex flex-col
    items-center
    text-center
  "
          >
            <div className="overflow-hidden">
              <h2
                className={`line inline-block ${playfair.className}
      lg:text-[36px] text-[20px]
      leading-none
      tracking-[-0.03em]
      text-secondary
      scale-y-140
      font-semibold`}
              >
                Timeless design
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className={`line inline-block ${playfair.className}
      lg:text-[36px] text-[20px]
      leading-none
      tracking-[-0.03em]
      text-secondary
      scale-y-140
      font-semibold`}
              >
                Effortless comfort
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className={`line inline-block ${playfair.className}
      lg:text-[36px] text-[20px]
      leading-none
      tracking-[-0.03em]
      text-secondary
      scale-y-140
      font-semibold`}
              >
                Crafted to
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className={`line inline-block ${playfair.className}
      lg:text-[36px] text-[20px]
      leading-none
      tracking-[-0.03em]
      text-secondary
      scale-y-140
      font-semibold`}
              >
                Welcome you home
              </h2>
            </div>

            <p className="intro-para lg:mt-11 mt-3 lg:text-[14px] text-[10px] leading-4 tracking-tighter text-secondary/80 scale-y-90 font-montserrat">
              Every room, every detail, and every experience is thoughtfully curated
              to create moments of calm, comfort, and lasting memories.
            </p>
          </div>

          <div className="logo-wrapper w-full flex justify-center items-center mt-0 lg:mt-30 mr-0 lg:mr-50">
            <div className="logo-sec w-16 h-14 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/assets/cloud2.png"
              />
            </div>
          </div>

          <div className="image-wrapper lg:w-[450px] lg:h-[500px] w-[300px] h-[500px] absolute lg:-right-[550px] lg:-right-[550px] -right-[480px] bottom-0">
            <img
              className="w-full h-full object-cover"
              src="/image/room6.jpg"
            />
          </div>

          <div
            ref={middleTextRef}
            className="middle-text border shadow-2xl border-white/5 image-text absolute lg:h-[300px] h-[180px] lg:leading-22 leading-12 flex-col text-secondary flex items-center justify-center lg:-right-[300px] -right-[320px] z-20 lg:w-[400px] w-[280px]">
            <div className="overflow-hidden">
              <h2 className="line font-bodoni font-bold lg:font-semibold lg:text-[100px] text-[50px] tracking-tighter">
                NEW
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2 className="line font-bodoni lg:font-semibold font-bold lg:text-[100px] text-[50px] tracking-tighter">
                GOLDEN
              </h2>
            </div>

            <div className="overflow-hidden">
              <h3 className="line font-bodoni lg:font-semibold font-bold lg:text-[100px] text-[50px] tracking-tighter">
                ERA
              </h3>
            </div>
          </div>
        </section>

        {/* -Second Panel-*/}
        <section className="lg:w-[140vw] relative w-[160vw] gap-[1000px] h-screen flex items-start leading-28 text-center justify-end ">
          {/* <button
            className="
        cursor-pointer button
        flex justify-center items-center
      w-36 h-36 lg:w-40 lg:h-40 rounded-full
      border border-secondary/30
      bg-white/40
      translate-y-[200px] translate-x-[850px]
      shadow-[0_8px_32px_rgba(255,255,255,0.15)]
      text-secondary
      font-bodoni
      tracking-wider
    ">
            <div className="border-t z-10 w-36 h-36 lg:w-40 lg:h-40 border-white rounded-full flex justify-center items-center">
              BOOK NOW
            </div>
          </button> */}
          <img
            ref={flowerImageRef3}
            src="/assets/flowers.png"
            className="lg:block hidden absolute -top-12 -right-20 w-[450px] object-cover"
          />
          <img

            src="/assets/flowers.png"
            className="absolute -top-15 left-40 w-[350px]  object-cover"
          />
          <div
            className="hidden lg:block location-text mr-68 flex relative mt-20 gap-6 flex-col">

            <h1 className="line text-secondary text-[90px] font-bodoni tracking-tighter">
              WHERE
            </h1>



            <h1 className="line text-secondary absolute top-16 z-50 left-65 font-bold rotate-[-15deg] text-[70px] font-dancing tracking-tighter">
              WE
            </h1>


            <h1 className="line text-secondary text-[90px] font-bodoni tracking-tighter">
              ARE
            </h1>



            <img
              className="w-[600px] h-60 cursor-pointer z-40 object-cover"
              src="/assets/location.png"
              onClick={() => {
                window.open(
                  "https://www.google.com/maps/place/Cloud+Nine+Hotel/@11.8365678,75.5685394,852m/...",
                  "_blank"
                );
              }} />
          </div>




        </section>
      </div>


    </section>
  );
}