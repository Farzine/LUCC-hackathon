// pages/createSlot/page.tsx
'use client';

import React, { useEffect, useState } from "react";
import CreateSlotForm from "../slots/CreateSlotForm";
 // Import the UpdateSlotModal

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


//Slot.ts

export interface Slot {
  slot_id: string;
  slot_name: string;
  user_id: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
}


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

        const response = await fetch('http://localhost:5000/api/slot/myslots', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
        console.log('API Response Data:', data); // Debug
        console.log('Fetched Slots:', data); // Updated log

        if (!Array.isArray(data)) {
          throw new Error("Unexpected API response format.");
        }

        setSlots(data);
      } catch (err: any) {
        console.error('Failed to fetch slots:', err);
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
      prevSlots.map((slot) => (slot.slot_id === updatedSlot.slot_id ? updatedSlot : slot))
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
        <CreateSlotForm onCreate={handleCreateSlot} />
  );
};

export default CreateSlotPage;
