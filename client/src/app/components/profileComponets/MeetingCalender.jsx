// components/MeetingCalendar.js
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

export default function MeetingCalendar() {

  const appointments = [
    { date: "2024-12-15", time: "10:00 - 11:00", title: "Meeting with John" },
    // Add more appointments here
  ];









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

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Day names header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className=" p-10 min-h-screen">
      <h1 className="text-3xl font-semibold my-4 ">Appoinmets</h1>
      <h1 className="  my-4 ">here is the latest update for the last 30 days. check now</h1>
      <div className="w-full flex justify-start items-center gap-2  mb-4">
        <Button
          onClick={handlePrevMonth}
          variant={'outline'}
          className="rounded-full"
        >
         <RiArrowLeftSLine/>
        </Button>
        <h2 className="text-lg font-semibold mx-4 text-center">{monthYear}</h2>
        <Button
          onClick={handleNextMonth}
          variant={'outline'}
          className="rounded-full"
        >
           <RiArrowRightSLine/>
        </Button>
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
                new Date(appointment.date).toLocaleDateString() === day.toLocaleDateString()
            );
            return (
              <div
                key={keyIndex}
                className={`${
                  appointmentsForDay.length > 0 ? "bg-slate-400" : "bg-gray-100"
                } h-32 w-full flex flex-col justify-start items-end p-4 border`}
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
                  <div key={idx} className="mt-1 text-xs text-gray-600">
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
