'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Code,
  Palette,
  GraduationCap,
  Rocket,
  Grid3x3,
  Eye,
  Palette as PaletteIcon,
  ExternalLink,
  ArrowRight,
  Layers,
  Github,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header/Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white dark:text-neutral-900" />
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">BentoBuilder</span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
              BETA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/u/demo"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Example
            </Link>
            <Link
              href="/builder-v2"
              className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Advanced Builder
            </Link>
            <Link
              href="/builder"
              className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Classic Builder
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-transparent dark:from-amber-950/20 dark:via-orange-950/10 dark:to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-8">
              <Sparkles className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <span>Create your portfolio in minutes</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              Build a beautiful
              <br />
              <span className="text-neutral-700 dark:text-neutral-300">
                portfolio in minutes
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create a modern, Bento-style portfolio to showcase your skills, experience, and projects. No coding required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder-v2"
                className="group px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span>Try Advanced Builder</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/builder"
                className="group px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span>Classic Builder</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/u/demo"
                className="px-8 py-4 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 flex items-center gap-2"
              >
                <span>View Example</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 via-transparent to-transparent z-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto opacity-80">
              <div className="col-span-2 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 rounded-3xl p-8 shadow-xl h-48" />
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 rounded-3xl p-8 shadow-xl h-48" />
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 rounded-3xl p-8 shadow-xl h-48" />
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 rounded-3xl p-8  h-32" />
              <div className="col-span-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-3xl p-8  h-32" />
              <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-950 dark:to-amber-950 rounded-3xl p-8  h-32" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              What you can build
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Choose from templates designed for different use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Developer Portfolio */}
            <div className="group bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                Developer Portfolio
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Showcase your coding projects, tech stack, and open source contributions.
              </p>
            </div>

            {/* Designer Portfolio */}
            <div className="group bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                Designer Portfolio
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Display your design work, case studies, and creative process.
              </p>
            </div>

            {/* Student Resume */}
            <div className="group bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                Student Resume
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Highlight your education, internships, and academic achievements.
              </p>
            </div>

            {/* Founder Profile */}
            <div className="group bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-neutral-200 dark:border-neutral-700">
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white dark:text-neutral-900" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                Founder Profile
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Share your startup journey, ventures, and entrepreneurial story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Three simple steps to your perfect portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-2xl mb-6 shadow-xl">
                  1
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700">
                  <Layers className="w-10 h-10 text-neutral-900 dark:text-neutral-100 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    Choose a template
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Start with a pre-designed template or build from scratch
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-2xl mb-6 shadow-xl">
                  2
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700">
                  <Grid3x3 className="w-10 h-10 text-neutral-900 dark:text-neutral-100 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    Customize with blocks
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Drag and drop blocks to add your content and personality
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-2xl mb-6 shadow-xl">
                  3
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700">
                  <Sparkles className="w-10 h-10 text-neutral-900 dark:text-neutral-100 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    Publish & share
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Get your unique link and share it with the world
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Powerful features to make your portfolio stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Grid3x3 className="w-6 h-6 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    Drag & drop blocks
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Intuitive builder with reorderable content blocks
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    Skills & experience
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Showcase your expertise with custom blocks
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    Project showcase
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Display your work with images and descriptions
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <PaletteIcon className="w-6 h-6 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    Light & dark themes
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Automatic theme switching for all portfolios
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    Live preview
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    See changes instantly across all devices
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    Public profile URL
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    Get your custom link to share anywhere
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Portfolio Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              See it in action
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real portfolio example built with BentoBuilder
            </p>
          </div>

          <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-neutral-300 dark:border-neutral-700">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Desktop Preview */}
              <div className="bg-white dark:bg-neutral-950 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-20 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                    <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                  </div>
                  <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="bg-neutral-900 dark:bg-neutral-800 rounded-3xl p-3 shadow-xl max-w-xs mx-auto">
                <div className="bg-white dark:bg-neutral-950 rounded-2xl p-4 h-full">
                  <div className="space-y-2">
                    <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                    <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                    <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                    <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/u/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <span>View Full Example</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-pink-950/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            Your portfolio,
            <br />
            <span className="text-neutral-700 dark:text-neutral-300">
              done right
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
            Join creators who are showcasing their work beautifully with BentoBuilder
          </p>
          <Link
            href="/builder"
            className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="w-6 h-6" />
            <span>Get Started Free</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-6">
            No credit card required • Free forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white dark:text-neutral-900" />
              </div>
              <span className="text-lg font-bold text-neutral-900 dark:text-white">BentoBuilder</span>
            </div>

            <div className="flex items-center gap-8">
              <Link
                href="/builder"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Builder
              </Link>
              <Link
                href="/u/demo"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Example
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              © 2026 BentoBuilder
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

