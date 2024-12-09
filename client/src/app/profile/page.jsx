"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBuildingGear } from "react-icons/bs";
import { FaChartPie } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { GrScheduleNew } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import Chatbot from "../../components/ui/Chatbot";
import AcceptGuest from "../components/profileComponets/AcceptGuest";
import Analytics from "../components/profileComponets/Analytics";
import MeetingCalendar from "../components/profileComponets/MeetingCalender";
import MeetingsPerDay from "../components/profileComponets/MeetingsPerDay";
import MyMeetingCalender from "../components/profileComponets/MyMeetingCalender";
import MyMeetingPerDay from "../components/profileComponets/MyMeetingsPerDay";
import logo from "/public/images/logo-no-bg.png";

export default function Page() {
  const [User, setUser] = useState(null);
  const [ProfileComponet, setProfileComponet] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve user session from localStorage
    const userSession = localStorage.getItem("user");
    if (userSession) {
      const user = JSON.parse(userSession);
      setUser(user);
    }

    // Retrieve ProfileComponet and token validation
    const pcmp = localStorage.getItem("pcmp");
    setProfileComponet(pcmp || "analytics");

    const token = Cookies.get("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      router.push("/auth");
    }
  }, [router]);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    Cookies.remove("token");
    router.push("/auth");
  };

  const [formData, setFormData] = useState({
    name: User?.name || "",
    email: User?.email || "",
    password: "",
    newPassword: "",
    time_zone: User?.time_zone || "",
    user_pic_url: User?.user_pic_url || "",
    browser_time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);
    // Add API call to update user details
  };

  const [image, setImage] = useState(null); // Store the selected image
  const [preview, setPreview] = useState(User?.user_pic_url); // Store the preview URL

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type (only images allowed)
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      setImage(file);

      // Generate a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }};

  return (
    <div className="flex w-full bg-white h-full">
      {/* Left Sidebar */}
      <div className="w-1/6 flex flex-col justify-between shadow-lg h-auto px-4">
        <Image
          src={logo}
          alt="MeetSync"
          className="my-2 mx-auto"
          width={200}
          height={100}
        />
        <h2 className="font-extralight text-sm">
          Simplify Scheduling, Empower Productivity.
        </h2>
        {/* Sidebar Menu */}
        <div className="mt-5 h-screen">
          <ul>
            <li
              onClick={() => setProfileComponet("analytics")}
              className={`p-2 flex gap-2 items-center w-full h-10 hover:border-r-4 hover:bg-red-100 cursor-pointer hover:border-r-red-500 ${
                ProfileComponet === "analytics"
                  ? "border-r-4 bg-red-100 border-r-red-500"
                  : ""
              }`}
            >
              <FaChartPie />
              Analytics
            </li>
            <li
              onClick={() => setProfileComponet("allmeetings")}
              className={`p-2 flex gap-2 items-center w-full h-10 hover:border-r-4 hover:bg-red-100 cursor-pointer hover:border-r-red-500 ${
                ProfileComponet === "allmeetings"
                  ? "border-r-4 bg-red-100 border-r-red-500"
                  : ""
              }`}
            >
              <BsBuildingGear />
              All Meetings
            </li>
            <li
              onClick={() => setProfileComponet("mymeetings")}
              className={`p-2 flex gap-2 items-center w-full h-10 hover:border-r-4 hover:bg-red-100 cursor-pointer hover:border-r-red-500 ${
                ProfileComponet === "mymeetings"
                  ? "border-r-4 bg-red-100 border-r-red-500"
                  : ""
              }`}
            >
              <GrScheduleNew />
              My Meetings
            </li>
            <li
              onClick={() => setProfileComponet("acceptguest")}
              className="p-2 flex gap-2 items-center w-full h-10 hover:border-r-4 hover:bg-red-100 cursor-pointer hover:border-r-red-500"
            >
              Accept Guest
            </li>
            <Chatbot />
          </ul>
        </div>
        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="sticky bottom-0">
            <div className="rounded-full border gap-5 cursor-pointer flex justify-start items-center p-8 h-16 my-10">
              <Avatar className="h-12 w-12">
                <AvatarImage src={User?.user_pic_url} alt={User?.name || "User"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{User?.name}</h3>
              <GoGear className="h-6 w-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
           
            <Dialog>
              <DialogTrigger>
    <DropdownMenuItem onClick={(e)=>preventDefault()} className="hover:cursor-pointer">Edit Profile</DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update your Profile</DialogTitle>
                  <DialogDescription>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Form Fields */}
                      <div>
                      <Image
          src={logo}
          alt="MeetSync"
          className="my-2 mx-auto"
          width={200}
          height={100}
        />
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full border rounded-md p-2"
                          required
                        />
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="eamil"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full border rounded-md p-2"
                          required
                        />
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="mt-1 block w-full border rounded-md p-2"
                          required
                        />
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="mt-1 block w-full border rounded-md p-2"
                          required
                        />
                       






                       
                      </div>
                      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload and Preview Image</h2>
      <div className="space-y-4">
        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
            <img
              src={preview}
              alt="Selected"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

      
      </div>
    </div>
                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Save Changes
                      </button>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <DropdownMenuItem onClick={Logout}>
              <MdLogout className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Main Content */}
      <div className="w-5/6 bg-slate-50 h-auto">
        {ProfileComponet === "analytics" && <Analytics />}
        {ProfileComponet === "allmeetings" && <MeetingCalendar />}
        {ProfileComponet === "meetingsperday" && <MeetingsPerDay />}
        {ProfileComponet === "mymeetings" && <MyMeetingCalender />}
        {ProfileComponet === "mymeetingsperday" && <MyMeetingPerDay />}
        {ProfileComponet === "acceptguest" && <AcceptGuest />}
      </div>
    </div>
  );
}
