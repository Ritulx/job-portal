import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchjobHandler();
  };

  return (
    <div className="relative overflow-hidden min-h-[600px] flex items-center justify-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF0F5] via-white to-[#FFF0F8]" />

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#E8A0BF]/30 to-[#C0136A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-60px] w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-[#FDF0F5]/80 to-[#E8A0BF]/20 blur-3xl pointer-events-none" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C0136A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-6 px-4 py-20 w-full max-w-4xl mx-auto animate-float-in">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#F2CCDC] shadow-sm text-sm font-medium text-[#C0136A]">
          <Sparkles className="w-3.5 h-3.5 fill-[#C0136A]" />
          India's No.1 Job Hunt Platform
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#1A0A12] leading-tight">
          Your Dream Career
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-[#C0136A]">Starts Right Here</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9 Q75 2 150 8 Q225 14 298 6"
                stroke="#E8A0BF"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-[#6B3A50] text-lg max-w-xl leading-relaxed font-body">
          Discover life-changing career opportunities from top companies across India.
          Smart search, instant apply — your next role is waiting.
        </p>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-xl bg-white border border-[#F2CCDC] rounded-2xl shadow-[0_4px_24px_rgba(192,19,106,0.10)] overflow-hidden focus-within:ring-2 focus-within:ring-[#C0136A]/20 focus-within:border-[#C0136A] transition-all duration-300">
          <Search className="w-5 h-5 text-[#C0136A] ml-4 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search jobs, skills, or companies..."
            className="flex-1 py-3.5 px-4 text-sm bg-transparent outline-none text-[#1A0A12] placeholder-[#C4849E] font-body"
          />
          <button
            onClick={searchjobHandler}
            className="m-1.5 bg-[#C0136A] hover:bg-[#9B0E55] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_4px_16px_rgba(192,19,106,0.35)] active:scale-95"
          >
            Search
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {["React Developer", "Data Scientist", "UX Designer", "Remote", "Full Stack"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                dispatch(setSearchedQuery(tag));
                navigate("/browse");
              }}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-[#F2CCDC] text-[#6B3A50] hover:bg-[#FDF0F5] hover:text-[#C0136A] hover:border-[#C0136A] transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;