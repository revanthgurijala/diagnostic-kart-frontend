"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, FileText, Mail, User, X } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");

  const handleDownloadClick = (title: string) => {
    setSelectedPdf(title);
    setIsModalOpen(true);
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to trigger PDF download goes here
    alert(`Downloading PDF for: ${selectedPdf}`);
    setIsModalOpen(false);
  };

  // Placeholder data - you will update these later
  const articles = [
    {
      title: "Understanding Your Hb1Ac Profile: Blood Sugar Control",
      excerpt:
        "A deep dive into what your Hb1Ac levels actually mean and how lifestyle changes can impact your long-term glucose.",
      category: "Diabetes Care",
      date: "Oct 12, 2023",
      image: "/images/Hb1Ac.jpeg",
      hasPdf: true,
    },
    {
      title: "The Importance of Routine Pet Diagnostics",
      excerpt:
        "Why preventative screening is just as important for your furry family members as it is for you.",
      category: "Pet Health",
      date: "Oct 08, 2023",
      image: "/images/Pets.jpeg", // Using a placeholder from your context
      hasPdf: true,
    },
    {
      title: "Vitamin D Deficiency: The Silent Epidemic",
      excerpt:
        "How lacking this crucial vitamin affects your mood, bones, and immune system.",
      category: "Wellness",
      date: "Sep 28, 2023",
      image: "/images/Vitamin D.jpeg",
      hasPdf: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= BLOG HERO ================= */}
      <section
        id="blog-hero"
        // bg-contain ensures the image fits perfectly without any cropping.
        // justify-start on mobile pushes text to the top, leaving the bottom for the image.
        className="relative min-h-[calc(100vh-80px)] flex flex-col justify-start md:justify-center bg-slate-900 bg-[url('/images/DK-Blog.png')] bg-contain bg-bottom md:bg-right bg-no-repeat px-6 lg:px-16 pt-12 md:pt-0 text-left overflow-hidden border-b border-slate-800"
      >
        {/* Shortened Gradient: It fades to transparent at 60% on desktop, leaving the entire right side (where the image is) 100% clear and uncovered */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900 from-50% md:from-40% via-slate-900/80 via-70% md:via-50% to-transparent to-100% md:to-60% pointer-events-none" />

        {/* Content wrapper: Placed normally on the left side */}
        <div className="relative z-10 max-w-2xl py-12 md:py-20">
          <div className="inline-flex flex-wrap items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 mb-8 text-xs md:text-sm font-bold text-blue-300 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-[2rem] shadow-sm mt-4">
            <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" /> Insights &
            Updates
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.2] font-serif drop-shadow-md">
            Diagnostic Kart <br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mt-4 inline-block tracking-wide drop-shadow-md">
              Journal.
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 font-sans font-medium leading-relaxed mb-10 drop-shadow-md">
            Explore our latest articles, scientific breakdowns, and guides to
            understanding your health and your pet's health better.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col"
            >
              {/* Changed object-cover to object-contain, added padding, and softened the background so uncropped images blend perfectly */}
              <div className="relative h-48 bg-slate-50 w-full overflow-hidden border-b border-slate-100 flex items-center justify-center">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm shadow-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 z-10">
                  {article.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-slate-500 font-medium mb-2">
                  {article.date}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif leading-snug">
                  {article.title}
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <button className="text-blue-600 font-bold flex items-center gap-2 hover:text-blue-800 transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </button>
                  {article.hasPdf && (
                    <button
                      onClick={() => handleDownloadClick(article.title)}
                      className="text-slate-500 hover:text-indigo-600 p-2 bg-slate-50 rounded-full transition-colors tooltip relative group"
                      title="Download PDF Version"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PDF DOWNLOAD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-6 md:p-8 max-w-md w-full shadow-2xl relative mx-4"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">
              Download Article
            </h3>
            <p className="text-slate-600 mb-6">
              Enter your details to download{" "}
              <strong className="text-slate-800">"{selectedPdf}"</strong> as a
              PDF.
            </p>

            <form onSubmit={handleDownloadSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all mt-2"
              >
                Download PDF
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
