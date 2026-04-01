import React, { useState } from "react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, Camera, Upload } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(", "),
    resume: null,
    profilePhoto: null,
  });

  const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const resumeChangeHandler = (e) => setInput({ ...input, resume: e.target.files?.[0] });
  const photoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.profilePhoto) {
      const photoForm = new FormData();
      photoForm.append("file", input.profilePhoto);
      photoForm.append("uploadType", "profilePhoto");
      photoForm.append("fullname", input.fullname || "");
      photoForm.append("email", input.email || "");
      photoForm.append("phoneNumber", input.phoneNumber || "");
      photoForm.append("bio", input.bio || "");
      photoForm.append("skills", input.skills || "");
      try {
        setLoading(true);
        const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, photoForm, {
          headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          toast.success("Profile photo updated!");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update photo");
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname || "");
    formData.append("email", input.email || "");
    formData.append("phoneNumber", input.phoneNumber || "");
    formData.append("bio", input.bio || "");
    formData.append("skills", input.skills || "");
    if (input.resume) {
      formData.append("uploadType", "resume");
      formData.append("file", input.resume);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const fields = [
    { label: "Full Name", name: "fullname", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phoneNumber", type: "tel" },
    { label: "Bio", name: "bio", type: "text" },
    { label: "Skills (comma separated)", name: "skills", type: "text" },
  ];

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px] border-[#F2CCDC] rounded-3xl p-0 overflow-hidden"
        onInteractOutside={() => setOpen(false)}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#FDF0F5] to-white px-6 py-5 border-b border-[#F2CCDC]">
          <DialogTitle className="font-display text-xl font-bold text-[#1A0A12]">
            Edit Profile
          </DialogTitle>
          <p className="text-xs text-[#6B3A50] mt-0.5">Update your personal information</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="px-6 py-5 flex flex-col gap-4">

            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-2 mb-1">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-[#F2CCDC]">
                  <AvatarImage src={photoPreview} alt="Profile" />
                </Avatar>
                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-0 bg-[#C0136A] hover:bg-[#9B0E55] text-white rounded-full p-1.5 cursor-pointer shadow-md transition-colors"
                >
                  <Camera className="h-3.5 w-3.5" />
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={photoChangeHandler}
                  className="hidden"
                />
              </div>
              <span className="text-xs text-[#6B3A50]">Click camera icon to change photo</span>
            </div>

            {/* Text Fields */}
            {fields.map((field) => (
              <div key={field.name}>
                <label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={input[field.name] || ""}
                  onChange={changeEventHandler}
                  className="w-full border border-[#F2CCDC] bg-[#FDF0F5]/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C0136A]/20 focus:border-[#C0136A] transition-all text-[#1A0A12] placeholder-[#C4849E]"
                />
              </div>
            ))}

            {/* Resume Upload */}
            <div>
              <label className="text-xs font-semibold text-[#1A0A12] uppercase tracking-wide mb-1.5 block">
                Resume (PDF)
              </label>
              <label className="flex items-center gap-3 border border-dashed border-[#E8A0BF] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#FDF0F5] transition-colors group">
                <Upload className="w-4 h-4 text-[#C0136A] group-hover:scale-110 transition-transform" />
                <span className="text-sm text-[#6B3A50]">
                  {input.resume ? input.resume.name : "Upload new resume"}
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={resumeChangeHandler}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 border border-[#F2CCDC] text-[#6B3A50] hover:bg-[#FDF0F5] rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-[#C0136A] hover:bg-[#9B0E55] text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-[0_4px_16px_rgba(192,19,106,0.3)] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;