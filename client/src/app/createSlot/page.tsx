// // pages/createSlot/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import SlotList from "../components/slots/SlotList";
// import CreateSlotForm from "../components/slots/CreateSlotForm";
// import { Slot } from "../components/slots/Slot";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// const CreateSlotPage: React.FC = () => {
//   const router = useRouter();
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch user's slots on component mount
//   useEffect(() => {
//     const fetchSlots = async () => {
//       const token = Cookies.get("token");

//       if (!token) {
//         router.push("/auth");
//         return;
//       }

//       try {
//         const API_BASE_URL =
//           process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
//         const response = await fetch(`${API_BASE_URL}/api/slot/myslots`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch slots.");
//         }

//         const data = await response.json();
//         console.log("Fetched Slots:", data.slots); // Debugging line
//         setSlots(data.slots || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching slots:", err);
//         setError("Unable to fetch your slots. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchSlots();
//   }, [router]);

//   // Handle creation of a new slot
//   const handleCreateSlot = (newSlot: Slot) => {
//     setSlots((prevSlots) => [newSlot, ...prevSlots]);
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     const token = Cookies.get("token");
//     if (!token) {
//       router.push("/auth");
//       return;
//     }

//     try {
//       const API_BASE_URL =
//         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
//       const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         Cookies.remove("token");
//         alert("Logged out successfully.");
//         router.push("/auth");
//       } else {
//         throw new Error("Failed to log out.");
//       }
//     } catch (err) {
//       console.error("Error during logout:", err);
//       alert("Error logging out. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">My Slots</h1>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-customRed text-white rounded-md hover:bg-red-600 transition-colors"
//         >
//           Log Out
//         </button>
//       </div>

//       {/* Create Slot Form */}
//       <div className="mb-8">
//         <CreateSlotForm onCreate={handleCreateSlot} />
//       </div>

//       {/* Slot List */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Slots</h2>

//         {loading && <p className="text-gray-600">Loading your slots...</p>}

//         {error && <p className="text-red-500">{error}</p>}

//         {!loading && !error && <SlotList slots={slots} />}
//       </div>
//     </div>
//   );
// };

// export default CreateSlotPage;


// pages/index.js
'use client';
import MeetingCalender from '../components/calender';

const appointments = [
  { date: '2024-12-15', time: '10:00 - 11:00', title: 'Meeting with John' },
  // Add more appointments here
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Slots</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-customRed text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>

      {/* Create Slot Form */}
      <div className="mb-8">
        <CreateSlotForm onCreate={handleCreateSlot} />
      </div>

      {/* Slot List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Slots</h2>

        {loading && <p className="text-gray-600">Loading your slots...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && <SlotList slots={slots} />}
      </div>
    </div>
  );
}

