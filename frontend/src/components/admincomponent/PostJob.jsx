import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "", description: "", requirements: "", salary: "",
    location: "", jobType: "", experience: "", position: 0, companyId: "",
  });
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((c) => c.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Job Title", name: "title", type: "text", placeholder: "e.g. Senior React Developer" },
    { label: "Description", name: "description", type: "text", placeholder: "Brief job description" },
    { label: "Location", name: "location", type: "text", placeholder: "e.g. Bangalore, Remote" },
    { label: "Salary (LPA)", name: "salary", type: "number", placeholder: "e.g. 12" },
    { label: "Positions", name: "position", type: "number", placeholder: "e.g. 3" },
    { label: "Requirements", name: "requirements", type: "text", placeholder: "Skills, tools required" },
    { label: "Experience (Years)", name: "experience", type: "number", placeholder: "e.g. 2" },
    { label: "Job Type", name: "jobType", type: "text", placeholder: "Full-time, Contract, etc." },
  ];

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-2 text-sm text-[#6B3A50] hover:text-[#C0136A] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </button>

        <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_4px_24px_rgba(192,19,106,0.08)] p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-[#1A0A12]">Post a New Job</h1>
            <p className="text-sm text-[#6B3A50] mt-1">Fill in the details to publish your job listing</p>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={input[field.name]}
                    placeholder={field.placeholder}
                    className="border-[#F2CCDC] rounded-xl focus:ring-[#C0136A]/20 focus:border-[#C0136A] bg-[#FDF0F5]/50"
                    onChange={changeEventHandler}
                  />
                </div>
              ))}

              {/* Company Selector */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">
                  Company
                </label>
                {companies.length > 0 ? (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="border-[#F2CCDC] rounded-xl focus:ring-[#C0136A]/20 bg-[#FDF0F5]/50 w-full">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent className="border-[#F2CCDC] rounded-xl">
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company.name.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    ⚠ Please register a company first before posting jobs.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || companies.length === 0}
              className="w-full py-3 mt-2 bg-[#C0136A] hover:bg-[#9B0E55] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(192,19,106,0.35)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</> : "Publish Job"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;