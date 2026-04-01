import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();
      let isTextMatch =
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.jobType?.toLowerCase().includes(query);

      let isSalaryMatch = false;
      if (query.includes("lpa")) {
        const salaryNum = Number(job.salary);
        if (query === "0-3 lpa") isSalaryMatch = salaryNum >= 0 && salaryNum <= 3;
        else if (query === "3-5 lpa") isSalaryMatch = salaryNum > 3 && salaryNum <= 5;
        else if (query === "5-10 lpa") isSalaryMatch = salaryNum > 5 && salaryNum <= 10;
        else if (query === "10+ lpa") isSalaryMatch = salaryNum > 10;
      }

      let isExpMatch = false;
      if (query.includes("years")) {
        const expNum = Number(job.experienceLevel);
        if (query === "0-3 years") isExpMatch = expNum >= 0 && expNum <= 3;
        else if (query === "3-5 years") isExpMatch = expNum > 3 && expNum <= 5;
        else if (query === "5-7 years") isExpMatch = expNum > 5 && expNum <= 7;
        else if (query === "7+ years") isExpMatch = expNum > 7;
      }

      return isTextMatch || isSalaryMatch || isExpMatch;
    });
    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-8 pb-12">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-[#1A0A12]">
            Find Your <span className="text-[#C0136A]">Perfect Role</span>
          </h1>
          <p className="text-sm text-[#6B3A50] mt-1">{filterJobs.length} jobs match your search</p>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <aside className="w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-[#F2CCDC] p-5 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-[#C0136A]" />
                <h2 className="font-semibold text-[#1A0A12]">Filters</h2>
              </div>
              <FilterCard />
            </div>
          </aside>

          {/* Jobs Grid */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-[#6B3A50]">
                <p className="font-display text-xl">No jobs found.</p>
                <p className="text-sm mt-1">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={job._id || job.id}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;