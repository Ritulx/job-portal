import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-16 bg-white border-y border-[#F2CCDC]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C0136A] mb-2">Explore by Role</p>
          <h2 className="font-display text-3xl font-bold text-[#1A0A12]">
            Browse <span className="text-[#C0136A]">Categories</span>
          </h2>
          <p className="text-sm text-[#6B3A50] mt-2">Find the perfect role in your domain</p>
        </div>

        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-3">
            {Category.map((category, index) => (
              <CarouselItem key={index} className="pl-3 basis-auto">
                <button
                  onClick={() => searchjobHandler(category)}
                  className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold border border-[#F2CCDC] bg-white text-[#6B3A50] hover:bg-[#C0136A] hover:text-white hover:border-[#C0136A] hover:shadow-[0_4px_16px_rgba(192,19,106,0.25)] transition-all duration-200 active:scale-95"
                >
                  {category}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-[#F2CCDC] hover:bg-[#FDF0F5] hover:text-[#C0136A]" />
          <CarouselNext className="border-[#F2CCDC] hover:bg-[#FDF0F5] hover:text-[#C0136A]" />
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;