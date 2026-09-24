"use client";

import { useEffect, useState, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import SplitType from "split-type";
import gsap from "gsap";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export default function SecondSection() {

  const imageRef = useRef<HTMLImageElement>(null);
  const roomNameRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(nextImage, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        x: 60,
        scale: 1.1,
      },
      {
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );
  }, [currentIndex]);

  useEffect(() => {
    gsap.fromTo(".bar", {
      scaleX: 0,
      transformOrigin: "center right",

    }, {
      scaleX: 1,
      transformOrigin: "center left",
      duration: 6,
      ease: "power2.inOut"

    })
  }, [currentIndex])

  useEffect(() => {
    gsap.fromTo(
      roomNameRef.current,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.out",
      }
    );
  }, [currentIndex]); // ✅

  useEffect(() => {
    if (!paraRef.current) return;

    // Split paragraph into lines
    const split = new SplitType(paraRef.current, {
      types: "lines",
    });

    gsap.from(split.lines, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });

    return () => {
      split.revert(); // restore original HTML
    };
  }, [currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1)
  }

  const prevImages = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1)
  }

  const images = [
    "/image/room1.jpg",
    "/image/room2.jpg",
    "/image/room3.jpg",
  ]

  const header = [
    "Suite",
    "Deluxe",
    "Executive"
  ]

  const aboutRoom = [
    "Experience spacious luxury with elegant interiors, premium furnishings, and thoughtful amenities. Designed for guests seeking comfort, privacy, and a truly refined stay.",
    "A perfect blend of modern style and everyday comfort, featuring plush bedding and contemporary finishes. Ideal for both business travelers and leisure escapes.",
    "Elevate your stay with sophisticated design, generous space, and exclusive comforts. Crafted for professionals and discerning guests who appreciate effortless luxury."
  ]

  const prevIndex =
    currentIndex === 0 ? images.length - 1 : currentIndex - 1;

  const nextIndex =
    currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  const handleMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 80;
    const rotateX = -(y / rect.height - 0.5) * 80;

    gsap.to(divRef.current, {
      x: rotateX,
      y: rotateY,
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power3.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });
  };

  const handleLeave = () => {
    if (!divRef.current) return;

    gsap.to(divRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section
      
      className="second-section overflow-hidden relative -mt-[100vh] h-[400vh] bg-primary rounded-t-full">
      <div className="second-text-section flex flex-col items-center justify-center h-[200vh]">
        <div className="logo-wrapper flex flex-col gap-5 w-[500px] h-[350px] mt-20  z-20">
          {/*logo head */}
          <div className="logo-head flex flex-row gap-5 w-full items-center justify-center">
            <h1 className="text-[10px] font-montserrat text-[#17233b] tracking-widest scale-y-90 font-bold">CLOUD</h1>
            <img
              className="w-12 h-9 object-cover overflow-hidden"
              alt="cloud logo"
              src="/assets/cloud2.png"
            />
            <h1 className="text-[10px] font-montserrat text-secondary tracking-widest scale-y-90 font-bold">NINE</h1>
          </div>
          {/*middle bar */}
          <div className="w-full flex justify-center items-center">
            <div className="h-60 w-[0.5px] ml-3 bg-secondary"></div>
          </div>
          {/*tail text */}
          <div className="w-full flex justify-center items-center">
            <h2 className="text-[10px] text-secondary font-montserrat tracking-widest scale-y-90 font-bold">REST WELL, WORK WELL</h2>
          </div>
        </div>

        {/*header */}
        <div
          className="middle-comps w-full h-full mt-10  flex flex-col items-center justify-start ">
          <div className="header-text w-[800px] h-[150px] flex justify-center items-center">
            <h1 className={`header lg:text-[90px] text-[37px] mr-2 lg:mr-0 tracking-tighter ${playfair.className} scale-y-135 scale-x-90 font-semibold text-secondary`}>ROOMS AVAILABLE</h1>
          </div>

          <div
            id="rooms"
            className="image-wrapper lg:mt-9 mt-0 lg:w-[500px] lg:h-[260px] w-[270px] h-[140px]  lg:mr-0 overflow-hidden">
            <img
              ref={imageRef}
              className="w-full h-full object-cover"
              src={images[currentIndex]}
            />
          </div>
          <div className="lg:w-[300px] w-[250px] flex justify-between items-center mt-3">
            <button
              onClick={prevImages}
              className="text-secondary text-[11px] scale-y-90 font-montserrat font-semibold">{"<"} {prevIndex + 1}</button>
            <div className="bar bg-secondary h-[1px] w-[130px]"></div>
            <button
              onClick={nextImage}
              className="text-secondary text-[11px] scale-y-90 font-montserrat font-semibold">{nextIndex + 1} {">"} </button>
          </div>

          <div className="room-names overflow-hidden w-16 h-5 mt-5">
            <div ref={roomNameRef}>
              <h2 className="text-center font-semibold text-secondary font-montserrat text-[14px] tracking-wide scale-x-90">
                {header[currentIndex]}
              </h2>

              <h2 className="text-center font-semibold text-secondary font-montserrat text-[14px] tracking-wide scale-x-90">
                {header[currentIndex]}
              </h2>
            </div>
          </div>
          <div className="lg:w-[400px] w-[250px] overflow-hidden mt-2">
            <div className="flex justify-center w-full items-center text-center">
              <p
                ref={paraRef}
                className="font-montserrat text-[13px] tracking-tight leading-4 font-medium scale-y-95 text-secondary">{aboutRoom[currentIndex]}</p>
            </div>
          </div>
        </div>
      </div>

      {/*image sec */}
      <div className="relative second-image-section h-[200vh] overflow-hidden">

        {/* Fade background from primary → black */}
        <div
          className="absolute inset-0 z-0
      bg-gradient-to-b
      from-[#B6D0E2]
      via-[#95BFE4]
      to-black"
        />

        {/* Image */}
        <img
          src="/image/second-page2.png"
          className="
        absolute inset-0
        w-full h-full
        object-cover
        z-10 filter brightness-90
       

        [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]
        [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]
      "
        />
       


        {/*glass card */}
        <div
          ref={divRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className=" cursor-pointer
    absolute
    bottom-70
    lg:right-30 right-6
    lg:w-[400px] w-[280px]
    lg:h-[200px] h-[150px] 
    z-20
    flex
    items-center
    justify-center
    bg-white/5
    border border-white/30
    shadow-2xl
    p-15
    overflow-hidden
  "
        >
          <p className="text-light font-bold font-bodoni lg:text-[28px] text-[18px] scale-y-120 leading-6.5 tracking-tighter">
            " A PLACE TO LIVE
            TO RETURN YEAR AFTER YEAR "
          </p>
        </div>

      </div>
    </section>
  );
}