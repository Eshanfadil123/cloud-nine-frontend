"use client";


import { useRef } from "react";
import gsap from "gsap";

export default function Last() {

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();  //gives us the button position or info about where button on the screen

    const x = e.clientX - rect.left;  //where the mouse is inside the button 
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 30;   //converting the mouse position into small value inbetween 0-1
    const moveY = (y / rect.height - 0.5) * 30;

    gsap.to(buttonRef.current, {
      x: moveX,
      y: moveY,
      rotate: moveX * 0.15,
      duration: 0.8,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1,
      ease: "elastic.out(1,0.4)",
    });
  };
  return (
    <section className="last-section h-screen flex items-center justify-center">
      <button
        ref={buttonRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="
        cursor-pointer
        flex justify-center items-center
      w-36 h-36 lg:w-40 lg:h-40 rounded-full
      border border-white/30
      bg-white/10
      shadow-[0_8px_32px_rgba(255,255,255,0.15)]
      text-[#faf9f6]
      font-bodoni
      tracking-wider
    "
        onClick={() =>
          window.open(
            "https://www.makemytrip.com/hotels/hotel-details?Campaign=&_uCurrency=INR&checkin=08052026&checkout=08062026&city=CTTSS&cmp=googlehoteldfinder_Old_DH_META_Free_type%3D_RateRule%3Dmobile_usernolist_aud%3D__default_IN_mob_localuniversal_202601211536539855&country=IN&locusId=CTTSS&locusType=city&mtkeys=2fb1f8c2-4944-4935-83b5-6b064c2550ce_312167_2&rank=1&roomCount=1&roomStayQualifier=2e0e&rsc=1e2e0e&searchText=Thalasserry%2C+India&topHtlId=202601211536539855&totalGuestCount=2&hotelId=202601211536539855&isPropSearch=T",
            "_blank"
          )
        }
      >
        <div className="border-t z-10 w-36 h-36 lg:w-40 lg:h-40 border-white rounded-full flex justify-center items-center">
          BOOK NOW
        </div>
      </button>
    </section>
  );
}