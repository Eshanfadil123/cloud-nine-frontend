"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type AuthMode = "login" | "signup";

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess?: (username: string) => void;
}

const API_BASE = "http://localhost:4000"; // match your Express server's port

export default function AuthModal({ onClose, onAuthSuccess }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);   // 👈 ADDED
  const [mode, setMode] = useState<AuthMode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);   // 👈 ADDED — only render the portal after client mount
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/login" : "/signup";

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        setError(text || "Something went wrong");
        return;
      }

      if (mode === "signup") {
        setMode("login");
        setError("Account created! Please log in.");
      } else {
        onAuthSuccess?.(email);
        onClose();
      }
    } catch (err) {
      setError("Could not reach the server. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;   // 👈 ADDED — avoids SSR/portal mismatch

  return createPortal(         // 👈 CHANGED — wraps the whole modal
    <div
      className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {mode === "login"
              ? "Login to continue to Cloud Nine"
              : "Create your Cloud Nine account"}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          )}

          {mode === "login" && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-black"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                className="font-medium text-black underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className="font-medium text-black underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body   // 👈 renders modal directly into <body>, outside Header's DOM tree
  );
}