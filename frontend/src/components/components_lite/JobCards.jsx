import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, DollarSign, Briefcase } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white rounded-2xl border border-[#F2CCDC] p-5 card-hover cursor-pointer group flex flex-col gap-3"
    >
      {/* Company */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-[#F2CCDC] bg-[#FDF0F5] flex items-center justify-center overflow-hidden">
          <Avatar className="w-8 h-8">
            <AvatarImage src={job?.company?.logo} alt={job?.name} className="object-contain" />
          </Avatar>
        </div>
        <div>
          <p className="font-semibold text-sm text-[#1A0A12]">{job.name || job?.company?.name}</p>
          <p className="text-xs text-[#C4849E] flex items-center gap-1">
            <MapPin className="w-3 h-3" /> India
          </p>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h2 className="font-display font-bold text-base text-[#1A0A12] group-hover:text-[#C0136A] transition-colors duration-200 leading-snug">
          {job.title}
        </h2>
        <p className="text-xs text-[#6B3A50] mt-1 line-clamp-2 leading-relaxed">{job.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <span className="badge-rose flex items-center gap-1">
          <Briefcase className="w-3 h-3" /> {job.position} Open
        </span>
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-xs px-2.5 py-0.5 rounded-full">
          <DollarSign className="w-3 h-3" /> {job.salary} LPA
        </span>
        <span className="badge-mauve">{job.location}</span>
      </div>
    </div>
  );
};

export default JobCards;