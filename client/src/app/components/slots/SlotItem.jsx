"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../ContextAPI/DataContext";
import UpdateMeeting from "../profileComponets/UpdateMeeting";

// Define the structure of the decoded token
const SlotItem = ({ slot }) => {
  const {
    ProfileComponet,
    setProfileComponet,
    MeetingsPerDay,
    setMeetingsPerDay,
  } = useContext(DataContext);

  const [user, setUser] = useState(null);

  // Decode JWT token and store user data
  useEffect(() => {
    const fetchUserData = () => {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        try {
          const token = Cookies.get("token");
          if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.userId;
            axios.get(`http://localhost:5000/api/user/user-details`, {
              headers: {
              Authorization: `Bearer ${token}`,
              userId: userId,
              }
            })
              .then(response => {
              setUser(response.data);
              console.log(response.data);
              })
              .catch(error => {
              console.error("Error fetching user details:", error);
              });
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    fetchUserData();
  }, []);



  // Book a slot
  const bookSlot = async (slotId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/booking/book",
        { slotId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking response:", response.data);
      alert("Slot booked successfully!");
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Failed to book the slot.");
    }
  };

  // Validate slot data
  if (!slot || !slot.start_time || !slot.end_time) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Invalid slot data.
      </div>
    );
  }

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
        {user && (
          <p className="text-sm text-gray-600">
            Logged in as: {user.name || "Unknown User"}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="border border-sky-300 rounded-full px-2">
          <span className="font-medium text-gray-700">Start:</span>{" "}
          {formattedStart}
        </div>
        <div className="border border-yellow-300 rounded-full px-2">
          <span className="font-medium text-gray-700">End:</span> {formattedEnd}
        </div>
        {ProfileComponet === "mymeetingsperday" ? (
          <div>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-customPurple rounded-full text-white">
                  Edit Meeting
                </Button>
              </DialogTrigger>
              <DialogContent>
                <UpdateMeeting slots={slot} />
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button
            className="bg-customRed rounded-full text-white"
            onClick={() => bookSlot(slot.slot_id)}
          >
            Book This Slot
          </Button>
        )}
      </div>
    </div>
  );
};

export default SlotItem;
