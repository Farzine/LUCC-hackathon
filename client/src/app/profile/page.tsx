// pages/index.js
'use client';
import MeetingCalender from '../components/profileComponets/MeetingCalender';

const appointments = [
  { date: '2024-12-15', time: '10:00 - 11:00', title: 'Meeting with John' },
  // Add more appointments here
];

export default function Page() {
  return (
    <div className="container mx-auto p-10">
      
      <MeetingCalender appointments={appointments} />

      
    </div>
  );
}
