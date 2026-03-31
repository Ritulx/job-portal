import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    // If no search query is provided, reset to all jobs
    //     if (searchedQuery)
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    // Filter based on the searched query across various fields (title, description, etc.)
    const filteredJobs = allJobs.filter((job) => {
      const query = searchedQuery.toLowerCase();

      let isTextMatch = false;
      if (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.jobType?.toLowerCase().includes(query)
      ) {
        isTextMatch = true;
      }
      
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
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    key={job.id}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
