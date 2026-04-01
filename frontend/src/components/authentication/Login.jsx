import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Briefcase } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_8px_40px_rgba(192,19,106,0.08)] p-8 animate-float-in">
            {/* Logo area */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C0136A] to-[#E8A0BF] flex items-center justify-center shadow-md mb-3">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-[#1A0A12]">Welcome back</h1>
              <p className="text-sm text-[#6B3A50] mt-1">Sign in to find your dream job</p>
            </div>

            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              {/* Email */}
              <div>
                <Label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="johndoe@gmail.com"
                  className="input-pink w-full"
                />
              </div>

              {/* Password */}
              <div>
                <Label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="input-pink w-full"
                />
              </div>

              {/* Role */}
              <div>
                <p className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-2">I am a</p>
                <RadioGroup className="flex items-center gap-3">
                  {["Student", "Recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 flex-1 cursor-pointer border rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        input.role === role
                          ? "border-[#C0136A] bg-[#FDF0F5] text-[#C0136A]"
                          : "border-[#F2CCDC] text-[#6B3A50] hover:border-[#C0136A]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={input.role === role}
                        onChange={changeEventHandler}
                        className="accent-[#C0136A] w-4 h-4"
                      />
                      {role}
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-[#C0136A] hover:bg-[#9B0E55] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(192,19,106,0.35)] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-[#6B3A50] mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#C0136A] font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;