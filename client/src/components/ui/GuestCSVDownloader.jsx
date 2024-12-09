import React, { useState } from "react";
import Papa from "papaparse";

const GuestCSVDownloader = ({ slotId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/guests/${slotId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching guest details.");
      }

      const guests = data.guests;

      if (guests.length === 0) {
        throw new Error("No guest details found for this slot.");
      }

      // Convert JSON data to CSV
      const csv = Papa.unparse(guests);

      // Create a downloadable link
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `guests_${slotId}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download Guest Details"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default GuestCSVDownloader;
