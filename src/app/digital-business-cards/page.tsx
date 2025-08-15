import React from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import FlipCard from "./FlipCard";

export default function DigitalBusinessCardsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-12 shadow-sm">
          <div className="bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] py-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Digital Business Cards with QR Codes
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  Share your contact details instantly with smart, eco-friendly
                  digital business cards. Use QR codes to connect with clients,
                  exchange info at events, and make a lasting impression —
                  without paper waste.
                </p>
                <a
                  href="/signup"
                  className="inline-block bg-[#063970] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#052c5c] transition"
                >
                  Get Started Free
                </a>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="/web-image/stylusqr-business-card.png"
                  alt="Digital Business Card"
                  className="object-contain rounded-xl shadow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Flip Cards */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-[#063970] mb-10">
            Why Choose QR Code Business Cards?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FlipCard
              frontIcon="/instant-share-icon.png"
              frontTitle="Instant Info Sharing"
              frontText="Share your contact details instantly with just a QR scan — no typing required."
              backTitle="Fast & Simple"
              backText="No apps needed. Just scan and connect instantly."
            />
            <FlipCard
              frontIcon="/customize-icon.png"
              frontTitle="Fully Customizable"
              frontText="Add your logo, colors, and personal branding to stand out from the crowd."
              backTitle="Make It Yours"
              backText="Tailor every detail to match your style."
            />
            <FlipCard
              frontIcon="/eco-friendly-icon.png"
              frontTitle="Eco-Friendly"
              frontText="Go paperless and reduce waste while keeping your networking smart and modern."
              backTitle="Save the Planet"
              backText="Each card helps reduce paper waste."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#063970] mt-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Upgrade Your Networking?
            </h2>
            <p className="text-white mb-6">
              Create your personalized QR code business card today. Share it
              anywhere, anytime.
            </p>
            <a
              href="/signup"
              className="inline-block bg-white text-[#063970] px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
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
