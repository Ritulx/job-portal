import React from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { Bookmark, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistJobs } = useSelector((store) => store.wishlist);

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#F2CCDC] flex items-center justify-center shadow-sm">
              <Bookmark className="w-5 h-5 text-[#C0136A] fill-[#C0136A]" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-[#1A0A12]">Saved Jobs</h1>
              <p className="text-sm text-[#6B3A50]">
                {wishlistJobs.length} {wishlistJobs.length === 1 ? "job" : "jobs"} saved
              </p>
            </div>
          </div>
          <Link
            to="/Jobs"
            className="flex items-center gap-2 text-sm font-medium text-[#6B3A50] hover:text-[#C0136A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Browse more
          </Link>
        </div>

        {wishlistJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-[#6B3A50] bg-white rounded-3xl border border-[#F2CCDC]">
            <Bookmark className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-display text-xl text-[#1A0A12]">No saved jobs yet</p>
            <p className="text-sm mt-2 max-w-xs">
              Click the bookmark icon on any job card to save it for later.
            </p>
            <Link to="/Jobs" className="mt-6 btn-primary text-sm">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wishlistJobs.map((job) => (
              <Job1 key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;