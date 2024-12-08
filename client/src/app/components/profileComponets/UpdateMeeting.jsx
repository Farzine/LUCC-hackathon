"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateMeeting = ({ slots }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    slotName: slots.slot_name || "",
    startTime: new Date(slots.start_time).toISOString().slice(0, 16), // Pre-fill datetime-local
    endTime: new Date(slots.end_time).toISOString().slice(0, 16), // Pre-fill datetime-local
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { slotName, startTime, endTime } = formData;
    if (!slotName || !startTime || !endTime) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (new Date(startTime) >= new Date(endTime)) {
      setErrorMessage("Start time must be before end time.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const token = Cookies.get("token");

    if (!token) {
      router.push("/auth");
      return;
    }

    const payload = {
      slotId: slots.slot_id,
      slotName: formData.slotName,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${API_BASE_URL}/api/slot/updatemyslot`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Meeting updated successfully.");
        // Call the onUpdate callback to update the parent state
       
      } else {
        setErrorMessage(data.message || "Failed to update meeting.");
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Meeting</h2>

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
            Meeting Name
          </label>
          <input
            type="text"
            id="slotName"
            name="slotName"
            value={formData.slotName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter meeting name"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Meeting"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMeeting;
