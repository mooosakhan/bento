"use client"

import React from "react";
import {
  Sparkles,
  LayoutTemplate,
  MousePointerClick,
  Smartphone,
  Check,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <LayoutTemplate className="h-6 w-6" />,
      title: "Customizable Templates",
      desc: "Pick a clean template and tailor it to your style in minutes.",
    },
    {
      icon: <MousePointerClick className="h-6 w-6" />,
      title: "Easy Content Management",
      desc: "Update sections with a simple, intuitive editing flow—no hassle.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive by Default",
      desc: "Looks great on desktop, tablet, and mobile out of the box.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Polished Design",
      desc: "Minimal UI with subtle accents and tasteful motion built-in.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      blurb: "Perfect to get started.",
      perks: ["1 portfolio", "Basic templates", "Community support"],
      featured: false,
      cta: "Start Free",
    },
    {
      name: "Pro",
      price: "$12",
      blurb: "For serious creators.",
      perks: ["Unlimited sections", "Custom domain", "Analytics"],
      featured: true,
      cta: "Go Pro",
    },
    {
      name: "Enterprise",
      price: "Custom",
      blurb: "Teams & organizations.",
      perks: ["SLA support", "SSO", "Dedicated onboarding"],
      featured: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center font-semibold tracking-tight">
        <img src="/assets/logo.jpg" alt="Logo" className="h-10 w-10" />
            <span>PortfolioKit</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
            <a className="hover:text-slate-900" href="#features">
              Features
            </a>
            <a className="hover:text-slate-900" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-slate-900" href="#cta">
              Get started
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#pricing"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:inline-flex"
            >
              View plans
            </a>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                New: launch your portfolio in minutes
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Build your digital portfolio with ease.
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                A minimal, professional landing + portfolio builder that helps you showcase work,
                ship updates fast, and look polished everywhere.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                >
                  See features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  No credit card required
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  Cancel anytime
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  Fast setup
                </span>
              </div>
            </div>

            {/* Minimal mock preview */}
            <div className="relative">
              {/* <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  </div>
                  <div className="h-8 w-24 rounded-lg bg-slate-100" />
                </div>
                <div className="mt-4 rounded-xl bg-slate-50 p-6">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="mt-3 h-8 w-64 rounded bg-slate-200" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-lg bg-white shadow-sm" />
                    <div className="h-20 rounded-lg bg-white shadow-sm" />
                    <div className="h-20 rounded-lg bg-white shadow-sm" />
                    <div className="h-20 rounded-lg bg-white shadow-sm" />
                  </div>
                </div>
              </div> */}

              <img
                src="/assets/hero-portfoli.png"
                alt="Portfolio preview"
                className="relative z-10 rounded-2xl shadow-lg"
              />

              <div className="pointer-events-none absolute -right-8 -top-10 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-slate-200/60 blur-3xl" />
          
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Core features, minus the clutter
            </h2>
            <p className="mt-3 text-slate-600">
              Everything you need to launch a clean online presence—focused, fast, and professional.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900 transition group-hover:border-slate-300">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-200/60 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple pricing</h2>
            <p className="mt-3 text-slate-600">
              Start free, upgrade when you’re ready. No hidden fees.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={[
                  "rounded-2xl border p-6 shadow-sm transition hover:shadow-md",
                  p.featured
                    ? "border-slate-900 bg-white"
                    : "border-slate-200 bg-white",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{p.blurb}</p>
                  </div>
                  {p.featured && (
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <div className="text-4xl font-semibold tracking-tight">{p.price}</div>
                  {p.price !== "Custom" && (
                    <div className="pb-1 text-sm text-slate-500">/mo</div>
                  )}
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-slate-900" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/signup"
                  className={[
                    "mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition",
                    p.featured
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 text-center shadow-sm sm:p-12">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build your portfolio?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Create a clean, modern page in minutes and share it anywhere. Start free—upgrade later.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Sign Up Now
              </a>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Contact Us
              </a>
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-8 text-sm text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} PortfolioKit. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a className="hover:text-slate-900" href="#features">
                Features
              </a>
              <a className="hover:text-slate-900" href="#pricing">
                Pricing
              </a>
              <a className="hover:text-slate-900" href="#top">
                Back to top
              </a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
