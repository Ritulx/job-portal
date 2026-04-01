import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Bookmark, Briefcase } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-[#F2CCDC] shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C0136A] to-[#E8A0BF] flex items-center justify-center shadow-md group-hover:shadow-[0_4px_12px_rgba(192,19,106,0.4)] transition-all duration-300">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold font-display">
            <span className="text-[#C0136A]">Job</span>
            <span className="text-[#6B3A50]">Portal</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <ul className="flex font-body font-medium items-center gap-1">
          {user && user.role === "Recruiter" ? (
            <>
              <NavLink to="/admin/companies">Companies</NavLink>
              <NavLink to="/admin/jobs">Jobs</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/Home">Home</NavLink>
              <NavLink to="/Browse">Browse</NavLink>
              <NavLink to="/Jobs">Jobs</NavLink>
              <NavLink to="/Creator">About</NavLink>
            </>
          )}
        </ul>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <button className="btn-outline-pink text-sm">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn-primary text-sm">Register</button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative rounded-full ring-2 ring-[#F2CCDC] hover:ring-[#C0136A] transition-all duration-300 focus:outline-none">
                  <Avatar className="cursor-pointer h-9 w-9">
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0 border border-[#F2CCDC] shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#FDF0F5] to-white px-4 py-4 border-b border-[#F2CCDC]">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-[#E8A0BF]">
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#1A0A12] font-display">{user?.fullname}</p>
                      <p className="text-xs text-[#6B3A50] mt-0.5 line-clamp-1">{user?.profile?.bio || user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium bg-rose-100 text-[#C0136A] px-2 py-0.5 rounded-full">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2 px-2">
                  {user.role === "Student" && (
                    <>
                      <PopMenuItem icon={<User2 className="w-4 h-4" />} to="/Profile" label="My Profile" />
                      <PopMenuItem icon={<Bookmark className="w-4 h-4" />} to="/wishlist" label="Saved Jobs" />
                    </>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 font-medium mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="px-3 py-1.5 rounded-full text-sm text-[#6B3A50] hover:text-[#C0136A] hover:bg-rose-50 transition-all duration-200 font-medium"
    >
      {children}
    </Link>
  </li>
);

const PopMenuItem = ({ icon, to, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#1A0A12] hover:bg-[#FDF0F5] hover:text-[#C0136A] rounded-xl transition-colors duration-200 font-medium"
  >
    <span className="text-[#C0136A]">{icon}</span>
    {label}
  </Link>
);

export default Navbar;