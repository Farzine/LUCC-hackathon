// components/slots/CreateSlotForm.tsx
"use client";

import React, { useState } from 'react';
import { Slot } from '../slots/Slot';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CreateSlotFormProps {
  onCreate: (newSlot: Slot) => void;
}

const CreateSlotForm: React.FC<CreateSlotFormProps> = ({ onCreate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    slotName: '',
    startTime: '',
    endTime: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const { slotName, startTime, endTime } = formData;
    if (!slotName || !startTime || !endTime) {
      setErrorMessage('All fields are required.');
      return false;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      setErrorMessage('Start time must be before end time.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const token = Cookies.get('token');

    if (!token) {
      router.push('/auth');
      return;
    }

    const payload = {
      slotName: formData.slotName,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/slot/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Slot created successfully.');
        // Optionally, reset the form
        setFormData({
          slotName: '',
          startTime: '',
          endTime: '',
        });
        // Update parent component with the new slot
        const newSlot: Slot = {
          slot_id: data.slot.slot_id,
          slot_name: data.slot.slot_name,
          user_id: data.slot.user_id,
          start_time: data.slot.start_time,
          end_time: data.slot.end_time,
        };
        onCreate(newSlot);
      } else {
        setErrorMessage(data.message || 'Failed to create slot.');
      }
    } catch (error) {
      console.error('Error creating slot:', error);
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Slot</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Slot Name */}
        <div>
          <label htmlFor="slotName" className="block text-sm font-medium text-gray-700">
            Slot Name
          </label>
          <input
            type="text"
            id="slotName"
            name="slotName"
            value={formData.slotName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed"
            placeholder="Enter slot name"
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed"
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={cn(
              "w-full px-4 py-2 rounded-md bg-customRed text-white font-semibold hover:bg-red-600 transition-colors",
              loading ? "opacity-50 cursor-not-allowed" : ""
            )}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Slot"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSlotForm;
