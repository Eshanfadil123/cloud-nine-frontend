"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SixthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const firstImageRef = useRef<HTMLDivElement>(null);
  const secondImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(".text-sec", {
        opacity: 0,
        y: 40,
      });

      gsap.to(".floating-cloud", {
        y: "random(-40,40)",
        x: "random(-20,20)",
        scale: "random(0.95,1.1)",
        // rotation: "random(-6,6)",
        duration: "random(2,4)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.1,
          from: "random"
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 2,
          anticipatePin: 1,
          pinSpacing: true,
        },
      });


      // STEP 1 - Align both cards
      tl.to(
        firstImageRef.current,
        {
          marginTop: 0,
          duration: 1,
          ease: "none",
        
        },
        0
      );

      tl.to(
        secondImageRef.current,
        {
          marginBottom: 0,
          duration: 1,
          ease: "none",
          
        },
        0
      );

      // STEP 2 - Small pause
      tl.to({}, { duration: 0.1 });

      tl.to(".image-wrapper", {
        gap: 0,
        duration: 1,
        ease: "power2.inOut",
        filter: "grayscale(100%)",
      })

      

      tl.to({}, { duration: 0.1 });


      // STEP 3 - Scale first card
      tl.to([".image-wrapper", ".image-section"], {
        scale: 1.25,
        transformOrigin: "center center",
        duration: 3,
        ease: "none"
      }, 2);

      tl.to(".cloud1", {
        x: -420,
        y: 150,
        scale: 1.8,
        duration: 1.2,
        ease: "none",
      }, 2)

      tl.to(".cloud2", {
        x: 490,
        y: -220,
        scale: 1.8,
        duration: 1.2,
        ease: "none",
      }, 2)

      tl.to(".text-sec", {
        opacity: 1,
        y: 0,
        ease: "none",
        duration: 1
      }, 1)

      tl.to(".image-wrapper", {
        y: -100,
        scale: 1.2,
        ease: "none",
        duration: 1.5,

      })




    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-screen bg-light"
    >


      <div className="image-section  flex h-screen items-center justify-center bg-light">
        <div className="image-wrapper  justify-center gap-4 items-center lg:w-[560px] lg:h-[330px] w-[460px] h-[230px] flex">
          <div className="text-sec absolute top-3 z-50 flex h-[83px] items-center justify-center text-red-700 lg:text-[100px] text-[48px] font-bodoni font-semibold scale-y-[1.3]">
            <h1>TIMELESS</h1>
          </div>
          <div
            ref={firstImageRef}
            className="lg:w-[280px] lg:h-[330px] w-[180px] h-[230px] shadow-2xl mt-20 bg-white"
          >
            <img
              className="h-full w-full object-bottom filter"
              src="/image/left_half.jpeg"

            />
          </div>

          <div
            ref={secondImageRef}
            className="lg:w-[280px] lg:h-[330px] w-[180px] h-[230px] shadow-2xl mb-20 bg-white"
          >
            <img
              className="h-full w-full object-bottom filter"
              src="/image/right_half.jpg"
            />
          </div>
        </div>
      </div>

      <div className="cloud1 absolute left-[-70px] bottom-[-69px]">
        <img
          src="/assets/cloud3d.png"
          className="floating-cloud w-[500px]"
        />
      </div>

      <div className="cloud2 absolute right-[-60px] top-[-80px]">
        <img
          src="/assets/cloud3d.png"
          className="floating-cloud w-[500px]"
        />
      </div>

    </section>
  );
}