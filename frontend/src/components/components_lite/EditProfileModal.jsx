import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, Camera } from "lucide-react";
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

  // Preview URL for selected profile photo
  const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto);

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const resumeChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, resume: file });
  };

  const photoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file });
      // Show instant local preview
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // If a new profile photo was selected, upload it first
    if (input.profilePhoto) {
      const photoForm = new FormData();
      photoForm.append("file", input.profilePhoto);
      photoForm.append("uploadType", "profilePhoto");
      // also send other fields so everything saves in one call
      photoForm.append("fullname", input.fullname || "");
      photoForm.append("email", input.email || "");
      photoForm.append("phoneNumber", input.phoneNumber || "");
      photoForm.append("bio", input.bio || "");
      photoForm.append("skills", input.skills || "");

      try {
        setLoading(true);
        const res = await axios.post(
          `${USER_API_ENDPOINT}/profile/update`,
          photoForm,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
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

    // Upload resume + other fields
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
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
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

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">

            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={photoPreview} alt="Profile" />
                </Avatar>
                {/* Camera icon overlay */}
                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-0 bg-pink-600 hover:bg-pink-700 text-white rounded-full p-1.5 cursor-pointer shadow-md"
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
              <span className="text-xs text-gray-500">Click camera to change photo</span>
            </div>

            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phone</Label>
              <input
                type="tel"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bio</Label>
              <input
                type="text"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Skills */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Skills</Label>
              <input
                type="text"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="React, Node, CSS"
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Resume */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Resume</Label>
              <input
                type="file"
                accept="application/pdf"
                onChange={resumeChangeHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>

          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;