// app/updateProfile/page.tsx
"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/profileComponets/Sidebar";
import UpdateProfileForm from "../components/profileComponets/UpdateProfileForm";

interface Profile {
  name: string;
  email: string;
  user_id: string;
  department: string;
  phone_number: string;
  user_pic_url: string;
  time_zone: string;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");

      if (!token) {
        router.push("/authpage"); // Redirect to auth page if token is missing
        return;
      }

      try {
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/api/user/user-details`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          user_id: data.user_id || "",
          department: data.department || "",
          phone_number: data.phone_number || "",
          user_pic_url: data.user_pic_url || "",
          time_zone: data.time_zone || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
        router.push("/authpage"); // Redirect to auth page on error
      }
    };

    fetchUserData();
  }, [router]);

  // Handle profile updates from the form
  const handleUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  // Handle user logout
  const handleLogout = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/authpage");
      return;
    }

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Cookies.remove("token");
        alert("Logged out successfully");
        router.push("/authpage");
      } else {
        throw new Error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-gray-700">Loading profile...</p>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <p className="text-red-500">{error || "Profile not found."}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar profile={profile} />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-customRed text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>

        {/* Update Profile Form */}
        <UpdateProfileForm profile={profile} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ProfilePage;
