// pages/index.js
"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { DataContext } from "../../../ContextAPI/DataContext";
import Analytics from "../components/profileComponets/Analytics";
import MeetingCalendar from "../components/profileComponets/MeetingCalender";
import MeetingsPerDay from "../components/profileComponets/MeetingsPerDay";
import MyMeetingCalender from "../components/profileComponets/MyMeetingCalender";
import MyMeetingPerDay from "../components/profileComponets/MyMeetingsPerDay";
import logo from "/public/images/logo-no-bg.png";
import { useRouter } from "next/navigation";
export default function Page() {
  const { ProfileComponet, setProfileComponet } = useContext(DataContext);

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
    <div className=" flex w-full bg-white  h-auto">
      <div className=" w-1/6  shadow-lg h-auto px-4 left">
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
        <div className="mt-5  ">
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
          </ul>
        </div>
      </div>

      {/* render componet here  */}

      <div className="w-5/6 border bg-slate-50 h-auto right ">
        {/* {ProfileComponet==='dashboard' && <Dashboard />} */}
        {ProfileComponet === "analytics" && <Analytics />}
        {ProfileComponet === "allmeetings" && <MeetingCalendar />}
        {ProfileComponet === "meetingsperday" && <MeetingsPerDay />}
        {ProfileComponet === "mymeetings" && <MyMeetingCalender />}
        {ProfileComponet === "mymeetingsperday" && <MyMeetingPerDay />}
      </div>
      {/* <MeetingCalender appointments={appointments} /> */}
    </div>
  );
}
