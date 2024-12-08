import { useState } from "react";

interface Appointment {
  date: string;
  time: string;
  title: string;
}

export default function MeetingCalendar({ appointments }: { appointments: Appointment[] }) {
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
    monthStart.getFullYear(),
    monthStart.getMonth(),
    1 - monthStart.getDay()
  );
  const endDate = new Date(
    monthEnd.getFullYear(),
    monthEnd.getMonth(),
    monthEnd.getDate() + (6 - monthEnd.getDay())
  );

  const days = [];
  for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
    days.push(new Date(day));
  }

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">{monthYear}</h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const appointmentsForDay = appointments.filter(
            (appointment) =>
              new Date(appointment.date).toLocaleDateString() ===
              day.toLocaleDateString()
          );

          return (
            <div
              key={index}
              className={`p-2 border rounded-lg ${
                isCurrentMonth ? "bg-white" : "bg-gray-100"
              }`}
            >
              <div
                className={`flex items-center justify-center text-sm font-bold w-8 h-8 rounded-full ${
                  appointmentsForDay.length > 0
                    ? "bg-blue-500 text-white"
                    : "text-gray-800"
                }`}
              >
                {day.getDate()}
              </div>
              {appointmentsForDay.map((appointment, idx) => (
                <div
                  key={idx}
                  className="mt-2 text-xs text-gray-600 leading-tight"
                >
                  <div>{appointment.time}</div>
                  <div>{appointment.title}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
