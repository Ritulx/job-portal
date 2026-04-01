import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./Navbar";
import {
  MapPin, DollarSign, Briefcase, Clock, Users, CalendarDays, CheckCircle2, Loader2
} from "lucide-react";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.application?.some((a) => a.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      setApplying(true);
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some((a) => a.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (loading || !singleJob) {
    return (
      <div className="min-h-screen bg-[#FDF0F5]">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#C0136A]" />
        </div>
      </div>
    );
  }

  const details = [
    { icon: <Briefcase className="w-4 h-4" />, label: "Positions", value: `${singleJob?.position} Open` },
    { icon: <MapPin className="w-4 h-4" />, label: "Location", value: singleJob?.location },
    { icon: <DollarSign className="w-4 h-4" />, label: "Salary", value: `${singleJob?.salary} LPA` },
    { icon: <Clock className="w-4 h-4" />, label: "Experience", value: `${singleJob?.experienceLevel} Years` },
    { icon: <Users className="w-4 h-4" />, label: "Applicants", value: singleJob?.applications?.length },
    { icon: <Briefcase className="w-4 h-4" />, label: "Job Type", value: singleJob?.jobType },
    { icon: <CalendarDays className="w-4 h-4" />, label: "Posted On", value: singleJob?.createdAt?.split("T")[0] },
  ];

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_4px_24px_rgba(192,19,106,0.08)] p-8 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-[#1A0A12]">{singleJob?.title}</h1>
              <p className="text-[#6B3A50] mt-1 text-sm">{singleJob?.company?.name}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="badge-rose">{singleJob?.position} Positions</span>
                <span className="badge-mauve">{singleJob?.location}</span>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-xs px-2.5 py-0.5 rounded-full">
                  {singleJob?.salary} LPA
                </span>
                <span className="badge-mauve">{singleJob?.jobType}</span>
              </div>
            </div>

            <button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied || applying}
              className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isApplied
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                  : "bg-[#C0136A] hover:bg-[#9B0E55] text-white shadow-md hover:shadow-[0_4px_20px_rgba(192,19,106,0.35)] active:scale-95"
              }`}
            >
              {applying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Applying...</>
              ) : isApplied ? (
                <><CheckCircle2 className="w-4 h-4" /> Applied</>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-[#F2CCDC]">
            <p className="text-[#1A0A12] text-sm leading-relaxed">{singleJob?.description}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_4px_24px_rgba(192,19,106,0.06)] p-8">
          <h2 className="font-display text-xl font-bold text-[#1A0A12] mb-5">Job Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {details.map((item, i) => (
              <div key={i} className="bg-[#FDF0F5] rounded-2xl p-4 border border-[#F2CCDC]">
                <div className="flex items-center gap-2 text-[#C0136A] mb-2">{item.icon}</div>
                <p className="text-xs text-[#6B3A50] font-medium uppercase tracking-wide">{item.label}</p>
                <p className="text-sm font-semibold text-[#1A0A12] mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;