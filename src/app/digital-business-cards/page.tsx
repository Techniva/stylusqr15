import React from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

export default function DigitalBusinessCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-12 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#063970] mb-4">
                Digital Business Cards with QR Codes
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Share your contact details instantly with smart, eco-friendly digital business cards.
                Use QR codes to connect with clients, exchange info at events, and make a lasting impression —
                without paper waste.
              </p>
              <a
                href="/signup"
                className="inline-block bg-[#063970] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#052c5c] transition"
              >
                Get Started Free
              </a>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="/public/digital-card-hero.png"
                alt="Digital Business Card"
                className="w-72 h-72 object-contain rounded-xl shadow"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-[#063970] mb-10">
            Why Choose QR Code Business Cards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img
                src="/public/instant-share-icon.png"
                alt="Instant Info Sharing"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">
                Instant Info Sharing
              </h3>
              <p className="text-gray-600 text-center">
                Share your contact details instantly with just a QR scan — no typing required.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img
                src="/public/customize-icon.png"
                alt="Fully Customizable"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">
                Fully Customizable
              </h3>
              <p className="text-gray-600 text-center">
                Add your logo, colors, and personal branding to stand out from the crowd.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <img
                src="/public/eco-friendly-icon.png"
                alt="Eco-Friendly"
                className="w-16 h-16 mb-4"
              />
              <h3 className="font-semibold text-lg mb-2 text-[#063970]">
                Eco-Friendly
              </h3>
              <p className="text-gray-600 text-center">
                Go paperless and reduce waste while keeping your networking smart and modern.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Upgrade Your Networking?
            </h2>
            <p className="text-white mb-6">
              Create your personalized QR code business card today. Share it anywhere, anytime.
            </p>
            <a
              href="/signup"
              className="inline-block bg-white text-[#063970] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
            >
              Create Your Free Digital Card
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
