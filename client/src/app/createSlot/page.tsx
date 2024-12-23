// pages/createSlot/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import UpdateSlotModal from "../components/profileComponets/updateMeeting";
import CreateSlotForm from "../components/slots/CreateSlotForm";
import SlotList from "../components/slots/SlotList";
// Import the UpdateSlotModal
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Slot } from "../components/slots/Slot";

const CreateSlotPage: React.FC = () => {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State to control modal visibility
  const token = Cookies.get("token");
  // Fetch user's slots on component mount
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        console.log("Retrieved Token:", token); // Debug

        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await fetch("http://localhost:5000/api/slot/myslots", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please log in again.");
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        }

        const data = await response.json();
        console.log("API Response Data:", data); // Debug
        console.log("Fetched Slots:", data); // Updated log

        if (!Array.isArray(data)) {
          throw new Error("Unexpected API response format.");
        }

        setSlots(data);
      } catch (err: any) {
        console.error("Failed to fetch slots:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  // Handle creation of a new slot
  const handleCreateSlot = (newSlot: Slot) => {
    setSlots((prevSlots) => [newSlot, ...prevSlots]);
  };

  // Handle slot update from UpdateSlotModal
  const handleUpdateSlot = (updatedSlot: Slot) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.slot_id === updatedSlot.slot_id ? updatedSlot : slot
      )
    );
  };

  // Function to open the UpdateSlotModal
  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  // Function to close the UpdateSlotModal
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Slots</h1>
        <button
          onClick={openUpdateModal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Update Slot
        </button>
      </div>

      {/* Create Slot Form */}
      <div className="mb-8">
        <CreateSlotForm onCreate={handleCreateSlot} />
      </div>

      {/* Slot List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Your Slots
        </h2>

        {loading && <p className="text-gray-600">Loading your slots...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && <SlotList slots={slots} />}
      </div>

      {/* Update Slot Modal */}
      <UpdateSlotModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onUpdate={handleUpdateSlot}
      />
    </div>
  );
};

export default CreateSlotPage;
