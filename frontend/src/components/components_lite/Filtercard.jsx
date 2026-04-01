import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Kolhapur", "Pune", "Bangalore", "Hyderabad", "Chennai", "Remote"],
  },
  {
    filterType: "Technology",
    array: ["Mern", "React", "Data Scientist", "Fullstack", "Node", "Python", "Java", "frontend", "backend"],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-3 LPA", "3-5 LPA", "5-10 LPA", "10+ LPA"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full">
      {selectedValue && (
        <div className="flex items-center justify-between mb-4 p-2 bg-[#FDF0F5] rounded-xl border border-[#F2CCDC]">
          <span className="text-xs font-medium text-[#C0136A] truncate max-w-[120px]">{selectedValue}</span>
          <button onClick={clearFilter} className="text-[#C4849E] hover:text-[#C0136A] transition-colors ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C0136A] mb-2">{data.filterType}</p>
            <div className="flex flex-col gap-1">
              {data.array.map((item, indx) => {
                const itemId = `filter-${index}-${indx}`;
                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-xs font-medium transition-all duration-150 ${
                      selectedValue === item
                        ? "bg-[#FDF0F5] text-[#C0136A] border border-[#F2CCDC]"
                        : "text-[#6B3A50] hover:bg-[#FDF0F5] hover:text-[#C0136A]"
                    }`}
                  >
                    <RadioGroupItem value={item} id={itemId} className="accent-[#C0136A]" />
                    {item}
                  </label>
                );
              })}
            </div>
            {index < filterData.length - 1 && <hr className="border-[#F2CCDC] mt-3" />}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;