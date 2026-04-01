import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Briefcase, Upload } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "", email: "", password: "", role: "",
    phoneNumber: "", pancard: "", adharcard: "", file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const ChangeFilehandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, []);

  const Field = ({ label, name, type = "text", placeholder, required }) => (
    <div>
      <label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">
        {label}
      </label>
      <Input
        type={type}
        name={name}
        value={input[name]}
        onChange={changeEventHandler}
        placeholder={placeholder}
        className="input-pink w-full"
        required={required}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDF0F5]">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl border border-[#F2CCDC] shadow-[0_8px_40px_rgba(192,19,106,0.08)] p-8 animate-float-in">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C0136A] to-[#E8A0BF] flex items-center justify-center shadow-md mb-3">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-[#1A0A12]">Create an account</h1>
              <p className="text-sm text-[#6B3A50] mt-1">Start your career journey today</p>
            </div>

            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" name="fullname" placeholder="John Doe" />
                <Field label="Email" name="email" type="email" placeholder="john@example.com" />
                <Field label="Password" name="password" type="password" placeholder="••••••••" />
                <Field label="Phone Number" name="phoneNumber" type="tel" placeholder="+91 9876543210" />
                <Field label="PAN Card" name="pancard" placeholder="ABCDE1234F" />
                <Field label="Aadhaar Card" name="adharcard" placeholder="1234 5678 9012" />
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

              {/* Profile Photo */}
              <div>
                <p className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5">Profile Photo</p>
                <label className="flex items-center gap-3 border border-dashed border-[#E8A0BF] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#FDF0F5] transition-colors group">
                  <Upload className="w-4 h-4 text-[#C0136A] group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-[#6B3A50]">
                    {input.file ? input.file.name : "Click to upload photo"}
                  </span>
                  <input type="file" accept="image/*" onChange={ChangeFilehandler} className="hidden" />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-[#C0136A] hover:bg-[#9B0E55] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(192,19,106,0.35)] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-[#6B3A50] mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[#C0136A] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;