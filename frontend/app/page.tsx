// Notion-like Landing Page

import React                                                                           from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-sm" />
            <span className="font-semibold text-lg">Portfolio Builder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a className="hover:text-black" href="#features">Features</a>
            <a className="hover:text-black" href="#templates">Templates</a>
            <a className="hover:text-black" href="/login">Login</a>
            <a className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700" href="/register">Create account</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar mock */}
          <aside className="hidden md:block">
            <div className="sticky top-20">
              <div className="w-64 bg-white border rounded-lg p-3 shadow-sm">
                <div className="mb-4">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
                  <div className="space-y-2">
                    {['Pages','Templates','Assets','Settings'].map((t,i)=> (
                      <div key={i} className="h-8 w-full bg-gray-100 rounded flex items-center px-3 text-sm text-gray-700">{t}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full py-2 bg-indigo-600 text-white rounded-md">New Portfolio</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Center hero + features */}
          <section className="md:col-span-2">
            <div className="bg-white rounded-lg p-10 shadow">
              <h1 className="text-4xl font-extrabold mb-4">Build a beautiful portfolio — without code</h1>
              <p className="text-gray-600 mb-6 text-lg">Create a professional portfolio in minutes with drag-and-drop sections, responsive templates, custom domains and analytics.</p>
              <div className="flex gap-4">
                <a href="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700">Get started — it's free</a>
                <a href="#templates" className="px-6 py-3 border rounded-full text-gray-800 hover:bg-gray-50">Browse templates</a>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-3">Powerful editor</h3>
                <p className="text-gray-600 text-sm">Blocks, embeds, tables — everything you need to write and organize.</p>
                <div className="mt-4 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-3">Collaborate in real-time</h3>
                <p className="text-gray-600 text-sm">Share pages, comment, and work together with teammates.</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>

            {/* Editor preview */}
            <div className="mt-8 bg-white border rounded-lg p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Jane Doe — Designer</div>
                <div className="text-sm text-gray-500">Published</div>
              </div>
              <article className="prose max-w-none">
                <h2 className="text-2xl font-semibold">Jane Doe</h2>
                <p className="text-gray-700">Product designer creating beautiful, usable interfaces. I focus on simple, elegant solutions for web and mobile.</p>

                <section className="mt-4">
                  <h3 className="text-lg font-semibold">Selected Projects</h3>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                      <div className="h-32 bg-gray-100 rounded mb-3" />
                      <div className="font-semibold">Portfolio Website</div>
                      <div className="text-sm text-gray-600">A minimal portfolio to showcase visual design work.</div>
                    </div>
                    <div className="p-4 border rounded">
                      <div className="h-32 bg-gray-100 rounded mb-3" />
                      <div className="font-semibold">Mobile App Redesign</div>
                      <div className="text-sm text-gray-600">End-to-end redesign improving onboarding and retention.</div>
                    </div>
                  </div>
                </section>

                <section className="mt-6">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['UX','UI','Figma','Prototyping','HTML','CSS'].map((s,i)=> (
                      <span key={i} className="text-sm px-3 py-1 bg-gray-100 rounded-full">{s}</span>
                    ))}
                  </div>
                </section>
              </article>
            </div>
          </section>
        </div>

        {/* Features strip */}
        <section id="features" className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {t:'Drag & Drop', d:'Arrange sections and projects visually.'},
            {t:'Responsive Themes', d:'Beautiful templates that look great on any device.'},
            {t:'Custom Domain', d:'Publish to your own domain with one click.'}
          ].map((f, i) => (
            <div key={i} className="bg-white border rounded-lg p-6 text-center">
              <h4 className="font-semibold mb-2">{f.t}</h4>
              <p className="text-sm text-gray-600">{f.d}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section id="cta" className="mt-10 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold">Create your portfolio today</h3>
          <p className="mt-2 text-sm">Free for students and personal projects. Pro plans for teams.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/register" className="px-6 py-3 bg-white text-indigo-600 rounded-full font-medium">Create account</a>
            <a href="/login" className="px-6 py-3 border rounded-full text-white/90">Login</a>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 mt-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600">© 2026 YourApp — Built with care.</div>
      </footer>
    </div>
  );
}

