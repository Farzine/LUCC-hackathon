// components/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from './Avatar';



interface Profile {
  name: string;
  email: string;
  user_id: string;
  department: string;
  phone_number: string;
  user_pic_url: string;
  time_zone: string;
}

interface SidebarProps {
  profile: Profile;
}

const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  return (
    <div className="w-1/6 flex flex-col h-screen bg-background p-6 shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-32 h-32 mb-4">
          {profile.user_pic_url ? (
            <AvatarImage src={profile.user_pic_url} alt={profile.name} />
          ) : (
            <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
        <p className="text-sm text-gray-600">{profile.department}</p>
        <p className="text-sm text-gray-600">{profile.email}</p>
        <p className="text-sm text-gray-600">{profile.phone_number}</p>
        <p className="text-sm text-gray-600">{profile.time_zone}</p>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link href="/profile" className="text-gray-700 hover:text-customRed transition-colors">
            Profile

        </Link>
        <Link href="/settings" className="text-gray-700 hover:text-customRed transition-colors">
            Settings
         
        </Link>
        <button
          onClick={() => {
            // Implement logout logic or navigation
          }}
          className="text-gray-700 hover:text-customRed transition-colors text-left"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
