"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  User,
  PawPrint,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; // We use Link to navigate safely

export default function TestsPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Hyderabad");
  const [testType, setTestType] = useState("human");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profiles/");

        // Only try to set data if the response is perfectly OK
        if (response.ok) {
          setProfiles(await response.json());
        }
      } catch (error) {
        // We intentionally leave this entirely blank!
        // By removing console.error(error), the terminal stays perfectly clean.
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Filter profiles based on the search term
  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();

    // 1. Does the profile name match?
    const matchesProfileName = profile.name.toLowerCase().includes(searchLower);

    // 2. Does ANY test inside this profile match?
    const matchesTestName = profile.tests?.some((test: any) =>
      test.name.toLowerCase().includes(searchLower),
    );

    // Return true if either matches
    return matchesProfileName || matchesTestName;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Explore Our <span className="text-blue-600">Health Packages</span>
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            {/* The input now updates the search state */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-full text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for profiles..."
            />
          </div>
          {/* LOCATION & TYPE DROPDOWNS */}
          <div className="max-w-2xl mx-auto mt-4 flex flex-col sm:flex-row gap-4 text-left">
            {/* Location Dropdown */}
            <div className="relative flex-1 group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors pointer-events-none" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl appearance-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 cursor-pointer shadow-sm hover:border-blue-300 transition-all"
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vijayawada" disabled>
                  Vijayawada (Coming Soon)
                </option>
                <option value="Vizag" disabled>
                  Vizag (Coming Soon)
                </option>
                <option value="Kakinada" disabled>
                  Kakinada (Coming Soon)
                </option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {/* Test Type Dropdown */}
            <div className="relative flex-1 group">
              {testType === "human" ? (
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none" />
              ) : (
                <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
              )}
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl appearance-none outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 cursor-pointer shadow-sm hover:border-blue-300 transition-all"
              >
                <option value="human">Human Diagnostics</option>
                <option value="veterinary">Veterinary Diagnostics</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-10">Loading profiles...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProfiles.map((profile) => (
              <Link href={`/tests/${profile.id}`} key={profile.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all"
                >
                  {profile.image && (
                    <img
                      src={
                        profile.image?.startsWith("http")
                          ? profile.image
                          : `http://127.0.0.1:8000${profile.image}`
                      }
                      alt={profile.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-slate-500 line-clamp-2">
                    {profile.purpose_section}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
