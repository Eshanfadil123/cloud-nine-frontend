"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function ChatBot() {
  const [message, setMessage] = useState("");        //storing the current message typed by the user
  const [messages, setMessages] = useState<ChatMessage[]>([]);      //storing the entire conversation between the user and the bot
  const [isThinking, setIsThinking] = useState(false);      //to show the thinking animation when the bot is processing the user's message
  const [displayChatBot, setDisplayChatBot] = useState(false);          //for showing and hiding the chatbot div
  const bottomRef = useRef<HTMLDivElement>(null);           //automatically scrolls to the bottom of the chat when a new message is added
  const chatRef = useRef<HTMLDivElement>(null);             //ref for the chatbot div, used for animations


  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);        //automatically scrolls to the bottom of the chat when a new message is added

  async function sendMessage() {
    if (!message.trim()) return;     //if input is empty, do nothing

    const userMessage = message;
    const lowerMessage = userMessage.toLowerCase();

    setMessages((prev) => [
      ...prev,              //used to store the new message without removing the old messages 
      {
        role: "user",
        text: userMessage,
      },
    ]);


    setMessage("");      //clearing the textbox
    setIsThinking(true);      //showing the thinking animation when the bot is processing the user's message

    if (lowerMessage.includes("home")) {            //checking if user typed "home"
      document
        .getElementById("home")
        ?.scrollIntoView({ behavior: "smooth" });      //get us to the section/div where id="home exist"

      setMessages((prev) => [         //reply by the robot if user types home
        ...prev,
        {
          role: "bot",
          text: "Taking you to the Home section.",
        },
      ]);

      return;
    }

    if (lowerMessage.includes("rooms")) {
      document
        .getElementById("rooms")
        ?.scrollIntoView({ behavior: "smooth" });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Taking you to the Rooms section.",
        },
      ]);

      return;
    }

    if (lowerMessage.includes("video")) {
      document
        .getElementById("video")
        ?.scrollIntoView({ behavior: "smooth" });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Taking you to the Video section.",
        },
      ]);

      return;
    }

    if (lowerMessage.includes("services")) {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Taking you to the Service section.",
        },
      ]);

      return;
    }

    if (lowerMessage.includes("about")) {
      document
        .getElementById("about")
        ?.scrollIntoView({ behavior: "smooth" });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Taking you to the About Us section.",
        },
      ]);

      return;
    }

    if (lowerMessage.includes("book") || lowerMessage.includes("reservation") || lowerMessage.includes("reserve") || lowerMessage.includes("booking")) {
      window.open("https://www.makemytrip.com/hotels/hotel-listing/?Campaign=21406544844&_uCurrency=INR&checkin=08102026&checkout=08112026&city=CTTSS&cmp=googlehoteldfinder_Old_DH_META_Paid_type%3Dbl_RateRule%3Dmobile_usernolist_aud%3D_21406544844_default_IN_mob_localuniversal_202601211536539855&country=IN&gad_campaignid=21406544844&gad_source=1&gbraid=0AAAAACwdfVUSwFJ3CcReSRGYPSqL-A9Ej&gclid=CjwKCAjwhNbTBhB4EiwAsFSg-u8MqFlaL-BTZbrMLa1j1JbIstbYQTOJH9dBXR3vec8Yf_Bh_SV5KxoCNy4QAvD_BwE&locusId=CTTSS&locusType=city&mtkeys=c5023b7b-de36-4680-90d9-59afcdfa1353_312167_2&roomCount=1&roomStayQualifier=2e0e&rsc=1e2e0e&topHtlId=202601211536539855&totalGuestCount=2", "_blank");

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Taking you to the Booking section.",
        },
      ])
    }

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      setIsThinking(false);      //hiding the thinking animation when the bot is done processing the user's message

      let errorMessage = "Something went wrong.";

      try {
        const error = JSON.parse(text);
        errorMessage = error.error || error.message || errorMessage;
      } catch {
        errorMessage = text || errorMessage;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: errorMessage,
        },
      ]);

      return;
    }

    const data = await response.json();
    setIsThinking(false);      //hiding the thinking animation when the bot is done processing the user's message

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: data.reply,
      },
    ]);
  }

  const openChat = () => {
    setDisplayChatBot(true);

    requestAnimationFrame(() => {
      gsap.fromTo(
        chatRef.current,
        {
          opacity: 0,
          scale: 0.2,
          y: 50,
          transformOrigin: "bottom right",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    });
  };

  const closeChat = () => {
    gsap.to(chatRef.current, {
      opacity: 0,
      scale: 0.2,
      y: 50,
      duration: 0.35,
      ease: "power2.in",
      transformOrigin: "bottom right",
      onComplete: () => {
        setDisplayChatBot(false);
      },
    });
  };

  return (
    <>
      {!displayChatBot ? (
        <button
          onClick={openChat}
          className="fixed lg:bottom-5 bottom-3 right-3 lg:right-5 z-[999999] w-18 h-18 rounded-full bg-transparent border-b-5 border-white/30 shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          <img
            src="/assets/Robot.png" // Your robot logo
            alt="Chatbot"
            className="w-12 h-12 object-contain"
          />
        </button>
      ) : (
        <div
          ref={chatRef}
          className="fixed overscroll-y-auto lg:bottom-5 lg:right-5 bottom-2 right-5 z-[999999] lg:h-[350px] lg:w-[360px] h-[270px] w-[280px] rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}

          <div className="p-3 flex items-center justify-between">
            <div>
              <h2 className="text-secondary font-semibold text-lg font-bodoni tracking-tighter">
                Cloud Nine AI
              </h2>

              <p className="text-secondary/50 lg:text-sm text-xs font-montserrat scaley-60 tracking-tighter">
                Hit me up with your doubts!
              </p>
            </div>

            <button
              onClick={closeChat}
              className="text-secondary text-md cursor-pointer hover:scale-110 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}

          <div
            className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 space-y-4"
            onWheel={(e) => e.stopPropagation()}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                    ? "bg-secondary text-white rounded-br-md"
                    : "bg-white/10 text-white rounded-bl-md"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-1 h-1 bg-white/60 rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}

          <div className="p-4">
            <div className="flex gap-2 lg:gap-4">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Ask something..."
                className="flex-1 rounded-xl bg-transparent border-b-3 border-white/30 px-4 py-3 text-secondary placeholder:font-montserrat placeholder:text-secondary/40 outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-full border-b-3 border-white/30 lg:px-6 px-1 text-montserrat font-semibold scale-y-90 lg:text-md text-sm text-secondary hover:scale-110 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
