"use client";

import gsap from "gsap";
import React, { useEffect, useState, useRef } from "react";


export default function Middle() {

  useEffect(() => {
    gsap.set(".preview2", {
      opacity: 1
    })

    gsap.to(".preview2", {
      scale: 1.4,
      duration: 1,
      repeat: -1,
      opacity: 0
    })

    gsap.to(".preview", {
      scale: 1.2,
      duration: 1,
      repeat: -1,
      opacity: 1
    })
  }, [])

  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<{
    show: boolean;
    image: string;
    x: number;
    y: number;
  }>({
    show: false,
    image: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!preview.show || !previewRef.current) return;

    gsap.set(previewRef.current, {
      x: preview.x,
      y: preview.y,
    });

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [preview]);

  const handleEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    image: string
  ) => {
  
    setPreview({
      show: true,
      image,
      x: e.clientX - 300,
      y: e.clientY + 250,
    });
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewRef.current) return;

    gsap.to(previewRef.current, {
      x: e.clientX - 300,
      y: e.clientY + 250,
      duration: 0.15,
      ease: "power3.out",
    });
  };
  const handleLeave = () => {
    if (!previewRef.current) return;

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      onComplete: () => {
        setPreview((prev) => ({
          ...prev,
          show: false,
        }));
      },
    });
  };
  return (
    <section className="relative h-[500px] flex items-center justify-center z-[99999]">
      <div
        className="preview h-6 w-6 cursor-pointer flex justify-center items-center absolute top-70 left-2 lg:left-150 lg:bottom-0 rounded-full border border-white"
        onMouseEnter={(e) => handleEnter(e, "/image/help-desk.png")}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="preview2 flex justify-center items-center h-6 w-6 rounded-full border border-white">
          <div className="h-1 w-1 bg-white rounded-full"></div>
        </div>
      </div>

      <div
        onMouseEnter={(e) => handleEnter(e, "/image/service-preview.png")}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="preview h-6 w-6 cursor-pointer absolute bottom-10 lg:bottom-80 flex justify-center items-center right-45 rounded-full border-1 bg-transparent border-white">
        <div className="preview2 flex justify-center items-center h-6 w-6 rounded-full border-1 border-white bg-transparent">
          <div className="h-1 w-1 bg-white rounded-full"></div>
        </div>
      </div>
      <div
        onMouseEnter={(e) => handleEnter(e, "/image/concierge.png")}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="preview h-6 w-6 cursor-pointer absolute top-50 lg:top-30 flex justify-center items-center  left-50 lg:left-85 rounded-full border-1 bg-transparent border-white">
        <div className="preview2 flex justify-center items-center h-6 w-6 rounded-full border-1 border-white bg-transparent">
          <div className="h-1 w-1 bg-white rounded-full"></div>
        </div>
      </div>


      {preview.show && (
        <div
          ref={previewRef}
          className="fixed top-0 left-0 w-64 h-64  z-[999999] pointer-events-none"
        >
          <img
            src={preview.image}
            alt="Preview"
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      )}

    </section>
  );
}