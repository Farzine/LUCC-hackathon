// components/MeetingCalendar.js
import { useState } from "react";

export default function MeetingCalendar({ appointments }) {
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
    <>
      <div className="w-full flex justify-start gap-2">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Previous
        </button>
        <h2 className="text-lg font-semibold">{monthYear}</h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
      
        <div className="w-full grid grid-cols-3 md:grid-cols-2 lg:grid-cols-7 ">
          {dayNames.map((day) => (
            <div key={day} className="p-2 w-10 border">
              {day}
            </div>
          ))}
        </div>
        <div className="w-full  grid lg:grid-cols-7  ">
          {eachDay.map((day, index) => {
            const keyIndex = day.toLocaleDateString();
            const appointmentsForDay = appointments.filter(
              (appointment) =>
                new Date(appointment.date).toLocaleDateString() ===
                day.toLocaleDateString()
            );
            return (
              <div
                key={keyIndex}
                className={`${appointmentsForDay.length > 0 ? "bg-slate-400" : "bg-gray-100"} h-10 w-10 flex flex-col justify-start items-end p-4 border `}
              >
                <div className={` ${appointmentsForDay.length > 0 ? "bg-customRed flex justify-center items-center text-white  text-center " : ""}text-sm w-10 h-10 rounded-full   font-semibold`}>{day.getDate()}</div>
                {appointmentsForDay.map((appt, idx) => (
                  <div key={idx} className="mt-1 text-xs text-gray-600">
                    {appt.time} <br />     {appt.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
