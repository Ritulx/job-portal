import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);

  return (
    <section className="section-gradient py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C0136A] mb-2">Freshly Posted</p>
            <h2 className="font-display text-4xl font-bold text-[#1A0A12]">
              Latest <span className="text-[#C0136A]">&</span> Top Openings
            </h2>
          </div>
          <Link
            to="/Jobs"
            className="flex items-center gap-2 text-sm font-semibold text-[#C0136A] hover:gap-3 transition-all duration-200"
          >
            View all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allJobs.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-[#6B3A50]">
              <p className="font-display text-xl">No jobs available yet.</p>
            </div>
          ) : (
            allJobs
              .slice(0, 6)
              .map((job) =>
                job?._id ? (
                  <JobCards key={job._id} job={job} />
                ) : (
                  <span key={Math.random()}>Invalid Job Data</span>
                )
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;