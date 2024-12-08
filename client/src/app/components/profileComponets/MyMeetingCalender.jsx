// components/MeetingCalendar.js
'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { DataContext } from "../../../../ContextAPI/DataContext";
import HostMeeting from "../profileComponets/HostMeeting";

export default function MyMeetingCalendar() {
  const { ProfileComponet, setProfileComponet,MeetingsPerDay,
    setMeetingsPerDay, } = useContext(DataContext);
 

const [appointments, setAppointments] = useState([]);
const token = Cookies.get('token');
useEffect(() => {
  axios.get('http://localhost:5000/api/slot/myslots', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(response => {
      setAppointments(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the appointments!", error);
    });
}, []);



  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const monthEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDate = new Date(
    monthStart.setDate(monthStart.getDate() - monthStart.getDay())
  );
  const endDate = new Date(
    monthEnd.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()))
  );

  const eachDay = [];
  for (
    let day = new Date(startDate);
    day <= endDate;
    day.setDate(day.getDate() + 1)
  ) {
    eachDay.push(new Date(day));
  }

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };


  const gotoDailyMeeting = (appointmentsForDay) => {
    setProfileComponet('mymeetingsperday');
    setMeetingsPerDay(appointmentsForDay);

  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Day names header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className=" p-10 min-h-full">
      <h1 className="text-3xl font-semibold my-4 ">My Meetings</h1>
      <h1 className="  my-4 ">here is the latest update for the last 30 days. check now</h1>
      <div className="w-full flex justify-start items-center gap-2  mb-4">
       
       <div className="flex gap-4">
     
        <Button
          onClick={handlePrevMonth}
          variant={'outline'}
          className="rounded-full"
        >
         <RiArrowLeftSLine/>
        </Button>
        <h2 className="text-md font-semibold mx-4 text-center">{monthYear}</h2>
        <Button
          onClick={handleNextMonth}
          variant={'outline'}
          className="rounded-full"
        >
           <RiArrowRightSLine/>
        </Button>
      </div>

{/* 
<Button onClick={()=>setProfileComponet('meetingsperday')}>
goto
</Button> */}


  {/* host a meeting */}
  <div className="w-full my-10 flex justify-end">
  <Dialog>
  <DialogTrigger>
    <Button
      className="rounded-full bg-customRed text-white text-md font-semibold"
      size={'lg'}
    >
      Host a Meeting
    </Button>


    </DialogTrigger>
  <DialogContent>
   
       <HostMeeting/>
      
   
  </DialogContent>
</Dialog>











  </div>
   




  </div>
  {/* callender */}
    <div className="w-full max-w-4xl">
     
      <div className="bg-white shadow rounded-lg p-6">
        <div className="w-full grid grid-cols-7 text-center">
          {dayNames.map((day) => (
            <div key={day} className="p-2 border">
              {day}
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7 gap-1">
          {eachDay.map((day, index) => {
            const keyIndex = day.toLocaleDateString();
            const appointmentsForDay = appointments.filter(
              (appointment) =>
                new Date(appointment.start_time).toLocaleDateString() === day.toLocaleDateString()
            );
            return (
              <div
              onClick={() => appointmentsForDay.length > 0 &&
                gotoDailyMeeting(appointmentsForDay)
              }
              key={keyIndex}
              className={`${
                appointmentsForDay.length > 0 ? "bg-slate-400" : "bg-gray-100"
              } h-32 w-full flex flex-col justify-start items-end p-4 border hover:cursor-pointer`}
              >
              <div 
                className={`${
                appointmentsForDay.length > 0
                  ? "bg-customRed flex justify-center items-center text-white"
                  : ""
                } text-sm w-10 h-10 rounded-full font-semibold`}
              >
                {day.getDate()}
              </div>
              {appointmentsForDay.map((appt, idx) => (
                <div key={idx} className="mt-1 text-xs font-semibold text-white ">
                { idx === 0 &&
                <div className="flex items-center gap-2"> <AiOutlineSchedule className="h-8 w-8"/> Total Meetings {appointmentsForDay.length}
                
    
                
                </div>}
                {appt.time}
                <br /> {appt.title}
                </div>
              ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  
  );
}
