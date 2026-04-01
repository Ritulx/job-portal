import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Search } from "lucide-react";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#FDF0F5] border border-[#F2CCDC] flex items-center justify-center">
            <Search className="w-5 h-5 text-[#C0136A]" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-[#1A0A12]">
              Search Results
            </h1>
            <p className="text-sm text-[#6B3A50]">{allJobs.length} jobs found</p>
          </div>
        </div>

        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#6B3A50]">
            <Search className="w-16 h-16 opacity-20 mb-4" />
            <p className="font-display text-xl">No jobs found</p>
            <p className="text-sm mt-1">Try a different keyword or browse all jobs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allJobs.map((job) => (
              <Job1 key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;