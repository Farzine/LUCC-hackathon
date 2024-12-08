// components/slots/SlotList.tsx
"use client";

import React from "react";
import { Slot } from "../slots/Slot";
import SlotItem from "./SlotItem";

interface SlotListProps {
  slots: Slot[];
}

const SlotList: React.FC<SlotListProps> = ({ slots }) => {
  if (slots.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No slots available. Create a new slot to get started.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {slots.map((slot) => (
        <SlotItem key={slot.slot_id} slot={slot} />
      ))}
    </div>
  );
};

export default SlotList;
