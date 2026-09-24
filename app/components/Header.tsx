"use client";

import { useEffect, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";
import gsap from "gsap";
import AuthModal from "./AuthModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const API_BASE = "http://localhost:4000";

export default function Header() {
  const textRef = useRef<SVGSVGElement | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [user, setUser] = useState<string | null>(null);   // 👈 ADDED — tracks logged-in user

  useEffect(() => {
    const tween = gsap.to(textRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });

    return () => {
      tween.kill();
    };
  }, []);

  // 👇 ADDED — check login state on page load
  useEffect(() => {
    fetch(`${API_BASE}/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("not logged in");
        return res.json();
      })
      .then((data) => setUser(data.username))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <>
      <header
        onClick={() => {
          document.getElementById("hero")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="cursor-pointer fixed z-[999999] top-2 lg:top-10 left-0 lg:left-10 w-20 h-20 lg:w-28 lg:h-28"
      >
        <img
          src="/assets/cloud-icon.png"
          alt="Cloud"
          className="absolute inset-0 m-auto w-7 h-7 lg:w-10 lg:h-10 z-10"
        />

        <svg
          ref={textRef}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <path
              id="circlePath"
              d="
          M 50,50
          m -38,0
          a 38,38 0 1,1 76,0
          a 38,38 0 1,1 -76,0
        "
            />
          </defs>

          <text
            fill="white"
            fontSize="7"
            letterSpacing="6"
            fontWeight="600"
            color="#FAF9F6"
            style={{ fontFamily: playfair.style.fontFamily }}
          >
            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
              CLOUD NINE • CLOUD NINE •
            </textPath>
          </text>
        </svg>
      </header>

      <nav
        className="
  z-[999999]
  fixed
  font-DM
  top-[30px]
  right-[20px]
  lg:top-[80px]
  lg:right-[70px]
  text-[12px]
  lg:text-[15px]
  text-[#faf9f6]
"
      >
        <ul className="flex flex-row gap-5 justify-center items-center">
          <li
            className="cursor-pointer"
            onClick={() => {
              document.getElementById("rooms")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Rooms
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Service
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            About US
          </li>

          {/* 👇 CHANGED — shows blank/generic icon when logged out, username + logout when logged in */}
          {user ? (
            <li className="flex items-center gap-2">
              <span className="hidden sm:inline">{user}</span>
              <button
                onClick={handleLogout}
                className="w-[30px] h-[30px] rounded-full shadow-2xl backdrop-blur-3xl bg-white flex items-center justify-center text-xs font-semibold text-black"
                title="Log out"
              >
                {user.charAt(0).toUpperCase()}
              </button>
            </li>
          ) : (
            <li
              onClick={() => setOpenForm(true)}
              className="w-[30px] h-[30px] rounded-full shadow-2xl backdrop-blur-3xl bg-white cursor-pointer hover:scale-125 active:opacity-90 transition-all duration-300"
            >
              <img
                src="/image/user.jpg"
                alt="User profile"
                className="object-cover w-full h-full rounded-full cursor-pointer transition-all duration-300"
              />
            </li>
          )}
        </ul>
      </nav>

      {openForm && (
        <AuthModal
          onClose={() => setOpenForm(false)}
          onAuthSuccess={(username) => setUser(username)}   // 👈 CHANGED — updates Header state on login
        />
      )}
    </>
  );
}