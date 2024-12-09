"use client";

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const DashboardAnalytics = () => {
  const [slotDistribution, setSlotDistribution] = useState({
    series: [],
    labels: [],
  });
  const [dailyBookings, setDailyBookings] = useState({
    series: [],
    labels: [],
  });
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState("slotDistribution");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch slot distribution data
        const slotResponse = await axios.get("http://localhost:5000/api/dashboard/slotstatus");
        const slotData = slotResponse.data.data;

        const slotLabels = slotData.map((item) => item.status);
        const slotSeries = slotData.map((item) => item.slot_count);

        setSlotDistribution({ series: slotSeries, labels: slotLabels });

        // Fetch daily bookings data
        const bookingResponse = await axios.get("http://localhost:5000/api/dashboard/dailybookings");
        const bookingData = bookingResponse.data.data;

        const bookingLabels = bookingData.map((item) => item.booking_date);
        const bookingSeries = bookingData.map((item) => item.total_bookings);

        setDailyBookings({ series: bookingSeries, labels: bookingLabels });

        // Set initial chart data to slot distribution
        setChartData({ series: slotSeries, labels: slotLabels });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleToggle = (dataType) => {
    if (dataType === "slotDistribution") {
      setChartData(slotDistribution);
    } else if (dataType === "dailyBookings") {
      setChartData(dailyBookings);
    }
    setSelectedData(dataType);
  };

  const chartOptions = {
    series: chartData.series,
    labels: chartData.labels,
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
    chart: {
      type: "donut",
      height: 320,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: selectedData === "slotDistribution" ? "Total Slots" : "Total Bookings",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return `${sum}`;
              },
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Analytics</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleToggle("slotDistribution")}
          className={`px-4 py-2 rounded ${selectedData === "slotDistribution" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Slot Distribution
        </button>
        <button
          onClick={() => handleToggle("dailyBookings")}
          className={`px-4 py-2 rounded ${selectedData === "dailyBookings" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Daily Bookings
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading analytics...</p>
      ) : (
        <ReactApexChart options={chartOptions} series={chartData.series} type="donut" height={320} />
      )}
    </div>
  );
};

export default DashboardAnalytics;
