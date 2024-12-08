'use client'
import React, { useState } from 'react';

const UpdateSlotModal = ({ isOpen, onClose }) => {
  const [slotId, setSlotId] = useState('');
  const [slotName, setSlotName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slotId || !slotName || !startTime || !endTime) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/slot/updatemyslot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slotId, slotName, startTime, endTime }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setSlotId('');
        setSlotName('');
        setStartTime('');
        setEndTime('');
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setError('Error updating slot.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-4">Update Slot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Slot ID</label>
            <input
              type="text"
              value={slotId}
              onChange={(e) => setSlotId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Slot ID"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Slot Name</label>
            <input
              type="text"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Slot Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          {/* Success Message */}
          {successMessage && <div className="text-green-600 text-sm mb-4">{successMessage}</div>}

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update Slot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSlotModal;
