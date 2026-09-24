"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EightSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial state
      gsap.set(".group2", {
        opacity: 0,
      });

      gsap.set(".group2 .box", {
        opacity: 0,
        // y: 40,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ===========================
      // CAMERA ZOOM
      // ===========================

      tl.to(
        ".zoom-content",
        {
          scale: 1.5,
          transformOrigin: "center center",
          ease: "none",
        },
        0
      );

      // ===========================
      // GROUP 1 MOVEMENT
      // ===========================

      tl.to(
        ".box1",
        {
          x: -500,
          y: -400,
          scale: 2,
          ease: "none",
        },
        0
      );

      tl.to(
        ".box2",
        {
          x: -600,
          y: 350,
          scale: 2,
          ease: "none",
        },
        0
      );

      tl.to(
        ".box3",
        {
          x: 600,
          y: -350,
          scale: 2,
          ease: "none",
        },
        0
      );

      tl.to(
        ".box4",
        {
          x: 600,
          y: 350,
          scale: 2,
          ease: "none",
        },
        0
      )
      tl.to(
        ".box5",
        {
          x: 100,
          y: -550,
          scale: 2,
          ease: "none",
        },
        0
      );

      // ===========================
      // CROSSFADE
      // ===========================

      tl.to(
        ".group1",
        {
          opacity: 1,
          duration: 0.4,
        },
        0.32
      );

      tl.to(
        ".group2",
        {
          opacity: 1,
          duration: 0.4,
        },
        0
      );

      // ===========================
      // GROUP 2 APPEAR
      // ===========================

      tl.to(
        ".group2 .box",
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.3,
          ease: "power3.out",
        },
        0
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);



  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen w-screen overflow-hidden relative bg-light"
    >
      <div className="zoom-content relative h-full w-full">


        {/* GROUP 1 */}


        <div className="group1 absolute z-40 inset-0">

          <div className="box1 absolute lg:top-10 top-0 z-40 lg:left-10 left-0">
            <div className="group relative w-[150px] h-[150px] overflow-hidden shadow-2xl cursor-pointer">

              <img
                src="/image/aboutUs1.jpg"
                className="
        absolute inset-0
        w-full h-full object-cover
        transition-all duration-500 ease-in-out
        group-hover:brightness-75
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-3 text-center
        opacity-0
        transition-all duration-500 ease-out
        group-hover:opacity-100
        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          translate-y-3
          transition-all duration-500 ease-out
          group-hover:translate-y-0
        "
                >
                  Your Text Here
                </p>
              </div>

            </div>
          </div>

          <div className="box2 absolute lg:top-[24rem] bottom-[3rem] z-40 lg:left-[8rem] left-[0px]">
            <div className="group relative w-[150px] h-[150px] overflow-hidden shadow-2xl cursor-pointer">

              <img
                src="/image/aboutUs2.jpg"
                className="
        absolute inset-0
        w-full h-full object-cover
        transition-all duration-500 ease-in-out
        group-hover:brightness-75
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-3 text-center
        opacity-0
        transition-all duration-500 ease-out
        group-hover:opacity-100
        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          translate-y-3
          transition-all duration-500 ease-out
          group-hover:translate-y-0
        "
                >
                  Your Text Here
                </p>
              </div>

            </div>
          </div>

          <div className="box3 absolute lg:top-16 top-4 right-0 lg:right-5 z-40">
            <div className="group relative lg:w-[230px] w-[150px] lg:h-[150px] h-[150px] overflow-hidden shadow-2xl cursor-pointer">

              <img
                src="/image/aboutUs3.jpg"
                className="
        absolute inset-0
        w-full h-full object-cover
        transition-all duration-500 ease-in-out
        group-hover:brightness-75
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-3 text-center
        opacity-0
        transition-all duration-500 ease-out
        group-hover:opacity-100
        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          translate-y-3
          transition-all duration-500 ease-out
          group-hover:translate-y-0
        "
                >
                  Your Text Here
                </p>
              </div>

            </div>
          </div>

          <div className="box4 absolute lg:bottom-15 bottom-10 lg:right-24 right-0 z-40">
            <div className="group relative w-[150px] h-[150px] overflow-hidden shadow-2xl cursor-pointer">

              <img
                src="/image/aboutUs4.jpg"
                className="
        absolute inset-0
        w-full h-full object-cover
        transition-all duration-500 ease-in-out
        group-hover:brightness-75
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-3 text-center
        opacity-0
        transition-all duration-500 ease-out
        group-hover:opacity-100
        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          translate-y-3
          transition-all duration-500 ease-out
          group-hover:translate-y-0
        "
                >
                  Your Text Here
                </p>
              </div>

            </div>
          </div>

          <div className="box5 absolute top-5 right-134 z-40">
            <div className="group relative w-[200px] h-[200px] overflow-hidden shadow-2xl cursor-pointer">

              <img
                src="/image/aboutUs5.jpg"
                className="
        absolute inset-0
        w-full h-full object-cover
        transition-all duration-500 ease-in-out
        group-hover:brightness-75
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-3 text-center
        opacity-0
        transition-all duration-500 ease-out
        group-hover:opacity-100
        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          translate-y-3
          transition-all duration-500 ease-out
          group-hover:translate-y-0
        "
                >
                  Your Text Here
                </p>
              </div>

            </div>
          </div>

        </div>


        {/* GROUP 2 */}


        <div className="group2 absolute inset-0 z-50">

          <div className="box absolute lg:top-24 top-30 lg:left-65 right-12">
            <div
              className="
      group relative cursor-pointer overflow-hidden
      lg:w-[140px] lg:h-[190px]
      w-[120px] h-[120px]
    "
            >
              {/* Image */}
              <img
                src="/image/about5.jpg"
                className="
        absolute inset-0 w-full h-full object-cover

        transition-all duration-500 ease-in-out

        group-hover:brightness-70
        group-hover:scale-105
      "
              />

              {/* Text overlay */}
              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-2 text-center

        opacity-0
        scale-95

        transition-all
        duration-500
        ease-out

        group-hover:opacity-100
        group-hover:scale-100

        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          scale-x-70
          scale-y-70

          translate-y-3
          transition-all
          duration-500
          ease-out

          group-hover:translate-y-0
        "
                >
                  Warm Hospitality
                </p>
              </div>
            </div>
          </div>

          <div className="box absolute lg:top-30 top-30 lg:left-140 right-12">
            <div
              className="
      group relative cursor-pointer overflow-hidden
      lg:w-[140px] lg:h-[120px]
      w-[120px] h-[120px]
    "
            >
              <img
                src="/image/about9.png"
                className="
        absolute inset-0 w-full h-full object-cover

        transition-all duration-500 ease-in-out

        group-hover:brightness-70
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-2 text-center

        opacity-0
        scale-95

        transition-all
        duration-500
        ease-out

        group-hover:opacity-100
        group-hover:scale-100

        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          scale-x-70
          scale-y-70

          translate-y-3
          transition-all
          duration-500
          ease-out

          group-hover:translate-y-0
        "
                >
                  Comfortable Stays
                </p>
              </div>
            </div>
          </div>

          <div className="box absolute lg:bottom-25 bottom-25 left-10 lg:left-54">
            <div
              className="
      group relative cursor-pointer overflow-hidden
      lg:w-[180px] lg:h-[120px]
      w-[120px] h-[120px]
    "
            >
              <img
                src="/image/about6.jpg"
                className="
        absolute inset-0 w-full h-full object-cover

        transition-all duration-500 ease-in-out

        group-hover:brightness-70
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-2 text-center

        opacity-0
        scale-95

        transition-all
        duration-500
        ease-out

        group-hover:opacity-100
        group-hover:scale-100

        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          scale-x-70
          scale-y-70

          translate-y-3
          transition-all
          duration-500
          ease-out

          group-hover:translate-y-0
        "
                >
                  Modern Rooms
                </p>
              </div>
            </div>
          </div>

          <div className="box absolute lg:top-30 top-26 lg:right-56 right-46">
            <div
              className="
      group relative cursor-pointer overflow-hidden
      lg:w-[180px] lg:h-[130px]
      w-[120px] h-[120px]
    "
            >
              <img
                src="/image/about7.jpg"
                className="
        absolute inset-0 w-full h-full object-cover

        transition-all duration-500 ease-in-out

        group-hover:brightness-70
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-2 text-center

        opacity-0
        scale-95

        transition-all
        duration-500
        ease-out

        group-hover:opacity-100
        group-hover:scale-100

        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          scale-x-70
          scale-y-70

          translate-y-3
          transition-all
          duration-500
          ease-out

          group-hover:translate-y-0
        "
                >
                  Exceptional Service
                </p>
              </div>
            </div>
          </div>

          <div className="box absolute lg:bottom-24 bottom-34 lg:right-70 right-5">
            <div
              className="
      group relative cursor-pointer overflow-hidden
      lg:w-[160px] lg:h-[160px]
      w-[120px] h-[120px]
    "
            >
              <img
                src="/image/about8.jpg"
                className="
        absolute inset-0 w-full h-full object-cover

        transition-all duration-500 ease-in-out

        group-hover:brightness-70
        group-hover:scale-105
      "
              />

              <div
                className="
        absolute inset-0 z-10
        flex items-center justify-center
        px-2 text-center

        opacity-0
        scale-95

        transition-all
        duration-500
        ease-out

        group-hover:opacity-100
        group-hover:scale-100

        pointer-events-none
      "
              >
                <p
                  className="
          text-[12px]
          font-DM
          font-medium
          text-light
          scale-x-70
          scale-y-70

          translate-y-3
          transition-all
          duration-500
          ease-out

          group-hover:translate-y-0
        "
                >
                  Peaceful Ambience
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div
        className="heading lg:leading-14 leading-10 text-center flex justify-center items-center flex-col  absolute lg:right-[460px] right-[35px] top-[270px] ">

        <h1 className="line scale-y-180 tracking-tight  text-secondary lg:text-[55px] text-[40px] font-bodoni font-bold">ABOUT US</h1>


        <p className="line text-secondary/80 scale-x-110 lg:text-[13px] text-[10px] font-semibold font-montserrat tracking-tighter whitespace-nowrap ">Experience hospitality reimagined with timeless design</p>

      </div>
    </section>
  );
}