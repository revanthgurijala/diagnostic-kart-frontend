"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          loading: false,
          success: "Message sent successfully! We will contact you soon.",
          error: "",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: "",
        error: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Side: Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            Have questions about our tests, profiles, or need help booking? Send
            us a message and our support team will assist you immediately.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">
                  Call Us
                </p>
                <p className="text-lg font-bold text-slate-900">
                  +91 94918 65695
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">
                  Email Us
                </p>
                <p className="text-lg font-bold text-slate-900">
                  info@diagnostickart.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase">
                  Headquarters
                </p>
                <p className="text-lg font-bold text-slate-900">
                  Hyderabad, Telangana
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Send a Message
          </h2>
          {status.success && (
            <div className="p-4 bg-green-50 text-green-700 rounded-xl mb-6 font-bold text-sm border border-green-200">
              {status.success}
            </div>
          )}
          {status.error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-6 font-bold text-sm border border-red-200">
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Full Name
                </label>
                {/* Added text-slate-900 here */}
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Phone Number
                </label>
                {/* Added text-slate-900 here */}
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Email Address
              </label>
              {/* Added text-slate-900 here */}
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Topic
              </label>
              {/* Added text-slate-900 here */}
              <select
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Home Collection Request">
                  Home Collection Request
                </option>
                <option value="Veterinary Testing">Veterinary Testing</option>
                <option value="Report Issue">Issue with my Report</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Your Message
              </label>
              {/* Added text-slate-900 here */}
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <Send className="w-5 h-5" />{" "}
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
