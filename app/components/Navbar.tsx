"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Zap,
  CreditCard,
  Truck,
  ShieldCheck,
  Microscope,
  Globe,
  Award,
  CheckCircle2,
  Banknote,
} from "lucide-react";

// The array of trusted features. We will map through this to generate the ticker.
const marqueeItems = [
  { text: "EMI Available", icon: CreditCard },
  { text: "Free Shipping", icon: Truck },
  { text: "Clinically Verified", icon: ShieldCheck },
  { text: "Microbiome Test", icon: Microscope },
  { text: "Global Shipping", icon: Globe },
  { text: "ISO Certified", icon: Award },
  // { text: "NABH Accredited", icon: CheckCircle2 },
  { text: "NABL Accredited", icon: CheckCircle2 },
  { text: "Fast Delivery", icon: Zap },
  { text: "COD Available", icon: Banknote },
];

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm flex flex-col">
      {/* --- TOP MARQUEE BAR --- */}
      <div className="bg-slate-950 text-slate-300 py-1.5 overflow-hidden flex whitespace-nowrap border-b border-slate-800">
        <div className="animate-marquee flex gap-8 md:gap-12 min-w-max px-4">
          {/* We render the array TWICE side-by-side to create the seamless infinite scroll illusion */}
          {[...marqueeItems, ...marqueeItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between h-20 items-center">
          {/* LEFT: Logo Area */}
          <Link href="/#home" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Diagnostic Kart Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              Diagnostic<span className="text-blue-600">Kart</span>
            </span>
          </Link>

          {/* MIDDLE: Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/#home"
              className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              Services
            </Link>

            <Link
              href="/#ai"
              className="text-slate-600 hover:text-blue-600 font-semibold transition-colors flex items-center gap-1"
            >
              <Zap className="w-4 h-4" /> AI Assistant
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* RIGHT: Call to Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/tests"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
            >
              Book a Test
            </Link>
          </div>

          {/* MOBILE: Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE: Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4 shadow-lg">
          <Link
            href="/#home"
            className="block text-slate-600 font-semibold hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="block text-slate-600 font-semibold hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/#services"
            className="block text-slate-600 font-semibold hover:text-blue-600"
          >
            Services
          </Link>

          <Link
            href="/#ai"
            className="block text-slate-600 font-semibold hover:text-blue-600"
          >
            AI Assistant
          </Link>
          <Link
            href="/blog"
            className="block text-slate-600 font-semibold hover:text-blue-600"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="block text-slate-600 font-semibold hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/tests"
            className="w-full block text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold mt-4 hover:bg-blue-700 transition-colors"
          >
            Book a Test
          </Link>
        </div>
      )}
    </nav>
  );
}
