import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, Bookmark, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const openResume = () => {
    if (user?.profile?.resume) {
      window.open(user.profile.resume, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_4px_24px_rgba(192,19,106,0.08)] overflow-hidden">
          {/* Banner */}
          <div className="h-24 bg-gradient-to-r from-[#C0136A] via-[#D4457A] to-[#E8A0BF]" />

          <div className="px-8 pb-8">
            <div className="flex items-end justify-between -mt-10 mb-5">
              <div className="ring-4 ring-white rounded-full shadow-lg">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
              </div>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="flex items-center gap-2 border-[#F2CCDC] hover:bg-[#FDF0F5] hover:text-[#C0136A] rounded-xl text-[#6B3A50]"
              >
                <Pen className="w-3.5 h-3.5" /> Edit Profile
              </Button>
            </div>

            <h1 className="font-display text-2xl font-bold text-[#1A0A12]">{user?.fullname}</h1>
            <p className="text-[#6B3A50] text-sm mt-1">{user?.profile?.bio}</p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mt-5">
              <a href={`mailto:${user?.email}`} className="flex items-center gap-2 text-sm text-[#6B3A50] hover:text-[#C0136A] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#FDF0F5] flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-[#C0136A]" />
                </div>
                {user?.email}
              </a>
              <a href={`tel:${user?.phoneNumber}`} className="flex items-center gap-2 text-sm text-[#6B3A50] hover:text-[#C0136A] transition-colors">
                <div className="w-7 h-7 rounded-full bg-[#FDF0F5] flex items-center justify-center">
                  <Contact className="w-3.5 h-3.5 text-[#C0136A]" />
                </div>
                {user?.phoneNumber}
              </a>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C0136A] mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((skill, i) => (
                    <span key={i} className="badge-rose">{skill}</span>
                  ))
                ) : (
                  <span className="text-sm text-[#6B3A50]">No skills added yet</span>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FDF0F5] border border-[#F2CCDC]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C0136A] mb-2">Resume</p>
              {user?.profile?.resume ? (
                <button
                  onClick={openResume}
                  className="flex items-center gap-2 text-sm font-medium text-[#C0136A] hover:text-[#9B0E55] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {user.profile.resumeOriginalName || "View Resume"}
                </button>
              ) : (
                <p className="text-sm text-[#6B3A50]">No resume uploaded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_4px_24px_rgba(192,19,106,0.06)] p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-[#1A0A12]">Applied Jobs</h2>
            <Link to="/wishlist">
              <Button variant="outline" className="flex items-center gap-2 border-[#F2CCDC] hover:bg-[#FDF0F5] text-[#C0136A] rounded-xl">
                <Bookmark className="w-3.5 h-3.5 fill-[#C0136A]" /> Saved Jobs
              </Button>
            </Link>
          </div>
          <AppliedJob />
        </div>
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;