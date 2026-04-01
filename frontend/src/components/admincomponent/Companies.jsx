import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import { Plus, Search } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#1A0A12]">Companies</h1>
            <p className="text-sm text-[#6B3A50] mt-1">Manage your registered companies</p>
          </div>
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="flex items-center gap-2 bg-[#C0136A] hover:bg-[#9B0E55] text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_4px_16px_rgba(192,19,106,0.3)] text-sm"
          >
            <Plus className="w-4 h-4" /> Add Company
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#F2CCDC] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#F2CCDC]">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4849E]" />
              <Input
                className="pl-9 border-[#F2CCDC] rounded-xl focus:ring-[#C0136A]/20 focus:border-[#C0136A]"
                placeholder="Filter by name..."
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;