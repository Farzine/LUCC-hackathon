// components/slots/SlotItem.tsx
"use client";

import React from "react";
import { Slot } from "../slots/Slot";
import { format } from "date-fns";

interface SlotItemProps {
  slot: Slot;
}

const SlotItem: React.FC<SlotItemProps> = ({ slot }) => {
  console.log("Slot Data:", slot); // Debugging line

  // Validate that slot and necessary fields exist
  if (!slot || !slot.start_time || !slot.end_time) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Invalid slot data.
      </div>
    );
  }

  // Validate that start_time and end_time are valid dates
  const startDate = new Date(slot.start_time);
  const endDate = new Date(slot.end_time);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Invalid date format in slot data.
      </div>
    );
  }

  const formattedStart = format(startDate, "PPpp");
  const formattedEnd = format(endDate, "PPpp");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-800">{slot.slot_name}</h3>
        <p className="text-sm text-gray-600">ID: {slot.slot_id}</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div>
          <span className="font-medium text-gray-700">Start:</span> {formattedStart}
        </div>
        <div>
          <span className="font-medium text-gray-700">End:</span> {formattedEnd}
        </div>
      </div>
    </div>
  );
};

export default SlotItem;
