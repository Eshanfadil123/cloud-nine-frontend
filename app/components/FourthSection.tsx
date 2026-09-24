"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export default function FourthSection() {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageSliderRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const ITEM_HEIGHT = 50;

  const serviceImages = [
    "/image/service1.jpg",
    "/image/service2.jpg",
    "/image/service3.jpg",
    "/image/service4.jpg",
    "/image/service5.jpg",
  ]

  const headings = [
    "ROOM SERVICE",
    "BREAKFAST",
    "CONFERENCE ROOM",
    "24/7 RECEPTION",
    "PARKING",

  ]

  const paragraphs = [
    [
      "Freshly prepared meals",
      "and essentials delivered",
      "to your room whenever",
      "you need them.",
    ],

    [
      "Start every morning",
      "with a carefully curated",
      "breakfast made from",
      "fresh local ingredients.",
    ],

    [
      "Our front desk is",
      "available around the clock",
      "to assist you with",
      "every request.",
    ],

    [
      "A modern well-equipped",
      "space designed for",
      "productive meetings and",
      "professional gatherings.",
    ],

    [
      "Secure convenient",
      "on-site parking",
      "for a smooth and",
      "worry-free stay.",
    ],
  ];


  useEffect(() => {
    const interval = setInterval(nextImage, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!paraRef.current) return;

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
      }
    );
  }, [currentIndex]);


  const nextImage = () => {
    if (!sliderRef.current || !imageSliderRef.current) return;

    setCurrentIndex((prev) => {
      const next = prev === serviceImages.length - 1 ? 0 : prev + 1;

      // Image slide
      gsap.to(imageSliderRef.current, {
        xPercent: -(next * 100),
        duration: 1,
        ease: "power3.inOut",
      });

      // Heading slide
      gsap.to(sliderRef.current, {
        y: -ITEM_HEIGHT,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(sliderRef.current, { y: ITEM_HEIGHT });

          gsap.to(sliderRef.current, {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        },
      });

      return next;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? serviceImages.length - 1 : prev - 1
    )
  }

  const nextIndex = currentIndex === headings.length - 1 ? 0 : currentIndex + 1;
  const prevIndex = currentIndex === 0 ? headings.length - 1 : currentIndex - 1;

  return (
    <div 
    id="services"
    className="fourth-sec shadow-2xl rounded-t-full relative h-screen w-screen flex justify-center items-center bg-light">
      <div className="fourth-wrapper shadow-2xl rounded-t-full relative h-full w-full">
        <div className="image-wrapper  relative rounded-b-[100px] rounded-t-[100px] h-full w-full overflow-hidden">
          <div
            ref={imageSliderRef}
            className="absolute inset-0 flex"
          >
            {serviceImages.map((image) => (
              <div
                key={image}
                className="min-w-full h-full shrink-0"
              >
                <img
                  src={image}
                  className="w-full h-full object-cover filter brightness-90"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div
            className="
          absolute
          top-1/2
          lg:right-[100px] right-[90px]
          -translate-y-1/2
          h-[210px]
          overflow-hidden
          "
          >
            <div
              ref={sliderRef}
              className="flex font-bodoni lg:gap-2 flex-col items-center"
            >
              <h1 className="h-[50px] lg:text-lg text-[12px] flex font-semibold items-center justify-center text-light/40">
                {headings[prevIndex]}
              </h1>

              <h1 className="h-[50px] lg:text-[50px] text-[20px] whitespace-nowrap flex items-center justify-center tracking-tighter scale-y-150 font-bold text-light">
                {headings[currentIndex]}
              </h1>

              <h1 className="h-[50px] lg:text-lg text-[12px] flex font-semibold items-center justify-center text-light/40">
                {headings[nextIndex]}
              </h1>
            </div>
          </div>

          <div className="bar absolute lg:bottom-[400px] bottom-[450px] lg:-right-40 -right-47  rotate-[90deg] w-[200px] h-0.5 bg-light"></div>

          <div
            ref={paraRef}
            className="w-[300px] lg:shadow-lg absolute lg:bottom-15 bottom-8 left-18"
          >
            {paragraphs[currentIndex].map((line, index) => (
              <div key={index} className="h-[35px] overflow-hidden flex justify-center items-center">
                <p
                  className={`line ${playfair.className}
        lg:text-light text-light/80
        lg:text-[23px] text-[13px] 
        lg:leading-8 leading-0 scale-y-150
        font-medium`}
                >
                  {line}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div >
  );
}