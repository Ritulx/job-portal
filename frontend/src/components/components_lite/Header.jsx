import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/jobportalbg.avif";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">

      {/* Blurred background layer */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)",
        }}
      />

      {/* Dark overlay on top of blurred bg */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Content sits above everything */}
      <div className="relative z-10 text-center flex flex-col gap-5 px-4 py-16 w-full max-w-4xl mx-auto">
        <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-white/20 backdrop-blur-sm text-pink-300 font-medium border border-white/30">
          <span className="text-pink-300">
            <PiBuildingOfficeBold />
          </span>
          No.1 Job Hunt Website
        </span>

        <h2 className="text-5xl font-bold text-white drop-shadow-lg">
          Your Dream Job <br />
          is just a <span className="text-[#f0a3c8]">Few Steps Away!</span>
        </h2>

        <p className="text-white/90 text-lg drop-shadow">
          Start your hunt for the best, life-changing career opportunities
          from here in your <br />
          selected areas conveniently and get hired quickly.
        </p>

        <div className="flex w-[80%] md:w-[50%] shadow-2xl border border-white/30 bg-white/95 backdrop-blur-sm pl-4 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Dream Job"
            className="outline-none border-none w-full bg-transparent text-gray-800 placeholder-gray-500"
          />
          <Button
            onClick={searchjobHandler}
            className="rounded-r-full bg-pink-600 hover:bg-pink-700"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;