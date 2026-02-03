"use client"

import React from "react";
import { Mail, Clock, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FEFEFE] dark:bg-neutral-950 transition-colors">
      {/* Header */}
      <header className="border-b border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Left Nav */}
          <nav className="flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#showcase" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Showcase
            </a>
          </nav>

          {/* Center Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/assets/logo.jpg" alt="Logo" className="h-11 w-11 rounded-full" />
          </a>

          {/* Right Nav */}
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Sign in
            </a>
            <a
              href="/signup"
              className="rounded-full border-2 border-black dark:border-white px-6 py-2.5 text-sm font-semibold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-24 sm:py-32">
        {/* Floating decorative circles */}
        <div className="absolute left-[10%] top-20 h-4 w-4 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
        <div className="absolute right-[15%] top-32 h-3 w-3 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
        <div className="absolute left-[8%] bottom-20 h-5 w-5 rounded-full border-2 border-neutral-300 dark:border-neutral-600" />
        <div className="absolute right-[12%] top-[60%] h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
        <div className="absolute right-[20%] bottom-[15%] h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        <div className="absolute left-[15%] top-[45%] text-6xl opacity-10 dark:opacity-5">\</div>

        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-6xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-7xl lg:text-8xl">
            Didn't reinvent the
            <br />
            wheel, just{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-white dark:text-black px-4">portfolio</span>
              <span className="absolute inset-0 bg-black dark:bg-white rounded-lg transform -skew-x-6" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl">
            Portfolios as you know it is out the door. Portfolios as you want it.
            Just arrives.
          </p>

          <a
            href="/builder"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-black dark:bg-white px-8 py-4 text-base font-semibold text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Our Builder
            <span className="text-lg">→</span>
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-8 text-center transition-transform hover:-translate-y-1">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black dark:bg-white">
              <Mail className="h-8 w-8 text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Choose Template</h3>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Pick a stunning template & customize as many sections as you'd like.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-8 text-center transition-transform hover:-translate-y-1">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black dark:bg-white">
              <Clock className="h-8 w-8 text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Build</h3>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Within a few minutes on average, we'll get your portfolio live.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-8 text-center transition-transform hover:-translate-y-1">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black dark:bg-white">
              <CheckCircle2 className="h-8 w-8 text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Publish</h3>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We'll review the portfolio until you're 100% satisfied.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 dark:border-neutral-800 px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} PortfolioKit. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              How it Works
            </a>
            <a href="/signup" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
