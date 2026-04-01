import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Bookmark, MapPin, Clock, Briefcase, DollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlistJobs } = useSelector((store) => store.wishlist);
  const isSaved = wishlistJobs.some((wJob) => wJob._id === job?._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isSaved) {
      dispatch(removeFromWishlist(job._id));
    } else {
      dispatch(addToWishlist(job));
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div
      className="relative bg-white rounded-2xl border border-[#F2CCDC] p-5 card-hover cursor-pointer group flex flex-col gap-4"
      onClick={() => navigate(`/description/${job?._id}`)}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-[#F2CCDC] bg-[#FDF0F5] flex items-center justify-center overflow-hidden shadow-sm">
            <Avatar className="w-10 h-10">
              <AvatarImage src={job?.company?.logo} alt={job?.company?.name} className="object-contain" />
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold text-[#1A0A12] text-sm leading-tight">{job?.company?.name}</h3>
            <p className="text-xs text-[#C4849E] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" /> India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#C4849E] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
          </span>
          <button
            onClick={handleWishlistClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
              isSaved
                ? "bg-[#FDF0F5] border-[#C0136A] text-[#C0136A]"
                : "bg-white border-[#F2CCDC] text-[#C4849E] hover:border-[#C0136A] hover:text-[#C0136A]"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-[#C0136A]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Job info */}
      <div>
        <h2 className="font-display font-bold text-lg text-[#1A0A12] leading-snug group-hover:text-[#C0136A] transition-colors duration-200">
          {job?.title}
        </h2>
        <p className="text-xs text-[#6B3A50] mt-1.5 line-clamp-2 leading-relaxed">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="badge-rose flex items-center gap-1">
          <Briefcase className="w-3 h-3" /> {job?.position} Positions
        </span>
        <span className="badge-mauve">{job?.jobType}</span>
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-xs px-2.5 py-0.5 rounded-full">
          <DollarSign className="w-3 h-3" /> {job?.salary} LPA
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-[#F2CCDC]">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/description/${job?._id}`); }}
          className="flex-1 py-2 text-sm font-medium text-[#C0136A] border border-[#F2CCDC] hover:bg-[#FDF0F5] rounded-xl transition-all duration-200"
        >
          View Details
        </button>
        <button
          onClick={handleWishlistClick}
          className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
            isSaved
              ? "bg-[#F2CCDC] text-[#6B3A50]"
              : "bg-[#C0136A] hover:bg-[#9B0E55] text-white shadow-md hover:shadow-[0_4px_16px_rgba(192,19,106,0.3)]"
          }`}
        >
          {isSaved ? "Saved ✓" : "Save Job"}
        </button>
      </div>
    </div>
  );
};

export default Job1;