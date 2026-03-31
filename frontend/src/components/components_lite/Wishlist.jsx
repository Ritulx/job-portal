import React from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { Bookmark } from "lucide-react";

const Wishlist = () => {
  const { wishlistJobs } = useSelector((store) => store.wishlist);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="h-6 w-6 text-pink-600 fill-pink-600" />
          <h1 className="font-bold text-2xl">
            My Wishlist
            <span className="ml-2 text-lg text-gray-500 font-normal">
              ({wishlistJobs.length} {wishlistJobs.length === 1 ? "job" : "jobs"})
            </span>
          </h1>
        </div>

        {wishlistJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Bookmark className="h-16 w-16 mb-4 opacity-30" />
            <p className="text-xl font-medium">No saved jobs yet</p>
            <p className="text-sm mt-2">Click the bookmark icon on any job to save it here</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
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
