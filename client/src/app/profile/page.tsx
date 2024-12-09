// pages/index.js
"use client";
import { MdLogout } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { DataContext } from "../../../ContextAPI/DataContext";
import Chatbot from "../../components/ui/Chatbot";
import AcceptGuest from "../components/profileComponets/AcceptGuest";
import Analytics from "../components/profileComponets/Analytics";
import MeetingCalendar from "../components/profileComponets/MeetingCalender";
import MeetingsPerDay from "../components/profileComponets/MeetingsPerDay";
import MyMeetingCalender from "../components/profileComponets/MyMeetingCalender";
import MyMeetingPerDay from "../components/profileComponets/MyMeetingsPerDay";
import logo from "/public/images/logo-no-bg.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  user_pic_url: string;
  name: string;
  // Add other user properties here
}

export default function Page() {
  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userSession = localStorage.getItem("user");
    if (userSession) {
      const user = JSON.parse(userSession);
      setUser(user);
      console.log("Retrieved user:", user);
    }
  }, []);

  // console.log("user", User);

  const { ProfileComponet, setProfileComponet } = useContext(DataContext);

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    Cookies.remove("token");
    router.push("/");
  };

  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      router.push("/auth");
    }
  }, []);

  console.log(ProfileComponet);

  return (
    <div className=" flex w-full bg-white  h-full">
      <div className=" w-1/6  flex flex-col justify-between shadow-lg h-auto px-4 left">
        <Image
          src={logo} // Path to your image
          alt="MeetSync"
          className="my-2 mx-auto"
          width={200} // Image width
          height={100} // Image height
        />

        <h2 className="font-extralight  text-sm ">
          Simplify Scheduling, Empower Productivity.
        </h2>

        {/* menu */}
        <div className="mt-5  h-screen   ">
          <ul>
            <li
              onClick={() => setProfileComponet("analytics")}
              className="p-2 w-full h-10 hover:border-r-4 hover:bg-red-100  hover:cursor-pointer hover:border-r-red-500 flex items-center gap-2"
            >
              <MdOutlineSpaceDashboard />
              Analytics
            </li>
            <li
              onClick={() => setProfileComponet("allmeetings")}
              className="p-2 w-full h-10 hover:border-r-4 hover:bg-red-100  hover:cursor-pointer hover:border-r-red-500"
            >
              All Meetings
            </li>
            <li
              onClick={() => setProfileComponet("mymeetings")}
              className="p-2 w-full h-10 hover:border-r-4 hover:bg-red-100  hover:cursor-pointer  hover:border-r-red-500"
            >
              My Meetings
            </li>
            <li
              onClick={() => setProfileComponet("acceptguest")}
              className="p-2 w-full h-10 hover:border-r-4 hover:bg-red-100  hover:cursor-pointer  hover:border-r-red-500"
            >
              Accept Guest
            </li>
            <Chatbot />
          </ul>
        </div>

        {/* profile Avatat */}

        <DropdownMenu>
          <DropdownMenuTrigger className="sticky bottom-10">
            <div className="rounded-full shadow-xl gap-5 hover:cursor-pointer w-50 flex justify-start items-center p-8 h-16 border my-20 ">
              <Avatar className="h-12 w-12">
                <AvatarImage src={User?.user_pic_url} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{User?.name}</h3>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem> Edit Profile</DropdownMenuItem>

            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={() => Logout()}
            >
              <MdLogout className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* render componet here  */}

      <div className="w-5/6 border bg-slate-50 h-auto right ">
        {/* {ProfileComponet==='dashboard' && <Dashboard />} */}

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
