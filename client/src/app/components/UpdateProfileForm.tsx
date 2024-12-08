// components/UpdateProfileForm.tsx
"use client";

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Avatar, AvatarImage, AvatarFallback } from '../components/Avatar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Profile {
    name: string;
    email: string;
    user_id: string;
    user_pic_url: string;
    time_zone: string;
}

interface UpdateProfileFormProps {
    profile: Profile;
    onUpdate: (updatedProfile: Profile) => void;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ profile, onUpdate }) => {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        currentPassword: string;
        newPassword: string;
        timeZone: string;
        profilePicture: File | null;
    }>({
        name: profile.name,
        email: profile.email,
        currentPassword: '',
        newPassword: '',
        timeZone: profile.time_zone,
        profilePicture: null,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        if (name === "profilePicture" && (e.target as HTMLInputElement).files) {
            const files = (e.target as HTMLInputElement).files;
            if (files) {
                setFormData(prev => ({ ...prev, profilePicture: files[0] }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const token = Cookies.get('token');

        if (!token) {
            router.push('/authpage');
            return;
        }

        const submissionData = new FormData();
        submissionData.append('email', formData.email);
        submissionData.append('password', formData.currentPassword);
        if (formData.name) submissionData.append('name', formData.name);
        if (formData.newPassword) submissionData.append('newPassword', formData.newPassword);
        if (formData.timeZone) submissionData.append('timeZone', formData.timeZone);
        if (formData.profilePicture) submissionData.append('userPicUrl', formData.profilePicture);

        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/api/user/update-user`, {
                method: 'PUT', // Ensure your backend uses PUT for updates
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Do not set 'Content-Type' when sending FormData
                },
                body: submissionData
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message || "Profile updated successfully.");
                // Update the parent component with the new profile data
                const updatedProfile: Profile = {
                    ...profile,
                    name: formData.name,
                    email: formData.email,
                    time_zone: formData.timeZone,
                    user_pic_url: formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : profile.user_pic_url,
                };
                onUpdate(updatedProfile);
                // Reset password fields
                setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrorMessage("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Update Profile</h2>

            {successMessage && (
                <div className='mb-4 p-4 bg-green-100 text-green-700 rounded'>
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className='mb-4 p-4 bg-red-100 text-red-700 rounded'>
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Profile Picture */}
                <div className='flex flex-col items-center'>
                    <Avatar className="w-32 h-32 mb-4">
                        {formData.profilePicture ? (
                            <AvatarImage src={URL.createObjectURL(formData.profilePicture)} alt={formData.name} />
                        ) : (
                            profile.user_pic_url ? (
                                <AvatarImage src={profile.user_pic_url} alt={profile.name} />
                            ) : (
                                <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                            )
                        )}
                    </Avatar>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className='hidden'
                        id='profilePicture'
                    />
                    <label htmlFor='profilePicture' className='cursor-pointer px-4 py-2 bg-customRed text-white rounded hover:bg-red-600 transition'>
                        Change Profile Picture
                    </label>
                </div>

                {/* Name */}
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed'
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed'
                        required
                    />
                </div>

                {/* Current Password */}
                <div>
                    <label htmlFor='currentPassword' className='block text-sm font-medium text-gray-700'>Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed'
                        required
                    />
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700'>New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed'
                        placeholder='Leave blank to keep current password'
                    />
                </div>

                {/* Time Zone */}
                <div>
                    <label htmlFor='timeZone' className='block text-sm font-medium text-gray-700'>Time Zone</label>
                    <select
                        id="timeZone"
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={handleChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-customRed focus:border-customRed'
                        required
                    >
                        <option value="">Select your time zone</option>
                        {/* Comprehensive list of time zones */}
                        <option value="Pacific/Midway">(UTC-11:00) Midway Island</option>
                        <option value="America/Adak">(UTC-10:00) Hawaii-Aleutian</option>
                        <option value="Etc/GMT+10">(UTC-10:00) Hawaii</option>
                        <option value="Pacific/Marquesas">(UTC-09:30) Marquesas Islands</option>
                        <option value="Pacific/Gambier">(UTC-09:00) Gambier Islands</option>
                        <option value="America/Anchorage">(UTC-09:00) Alaska</option>
                        <option value="America/Los_Angeles">(UTC-08:00) Pacific Time (US & Canada)</option>
                        <option value="America/Denver">(UTC-07:00) Mountain Time (US & Canada)</option>
                        <option value="America/Chicago">(UTC-06:00) Central Time (US & Canada)</option>
                        <option value="America/New_York">(UTC-05:00) Eastern Time (US & Canada)</option>
                        <option value="America/Caracas">(UTC-04:30) Caracas</option>
                        <option value="America/Halifax">(UTC-04:00) Atlantic Time (Canada)</option>
                        <option value="America/St_Johns">(UTC-03:30) Newfoundland</option>
                        <option value="America/Argentina/Buenos_Aires">(UTC-03:00) Buenos Aires</option>
                        <option value="Atlantic/South_Georgia">(UTC-02:00) South Georgia</option>
                        <option value="Atlantic/Azores">(UTC-01:00) Azores</option>
                        <option value="UTC">(UTC+00:00) UTC</option>
                        <option value="Europe/London">(UTC+00:00) London</option>
                        <option value="Europe/Berlin">(UTC+01:00) Berlin</option>
                        <option value="Europe/Paris">(UTC+01:00) Paris</option>
                        <option value="Europe/Athens">(UTC+02:00) Athens</option>
                        <option value="Asia/Beirut">(UTC+02:00) Beirut</option>
                        <option value="Africa/Cairo">(UTC+02:00) Cairo</option>
                        <option value="Asia/Jerusalem">(UTC+02:00) Jerusalem</option>
                        <option value="Asia/Dubai">(UTC+04:00) Dubai</option>
                        <option value="Asia/Karachi">(UTC+05:00) Karachi</option>
                        <option value="Asia/Kolkata">(UTC+05:30) Kolkata</option>
                        <option value="Asia/Kathmandu">(UTC+05:45) Kathmandu</option>
                        <option value="Asia/Dhaka">(UTC+06:00) Dhaka</option>
                        <option value="Asia/Bangkok">(UTC+07:00) Bangkok</option>
                        <option value="Asia/Shanghai">(UTC+08:00) Shanghai</option>
                        <option value="Asia/Tokyo">(UTC+09:00) Tokyo</option>
                        <option value="Australia/Sydney">(UTC+10:00) Sydney</option>
                        <option value="Pacific/Auckland">(UTC+12:00) Auckland</option>
                    </select>
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
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfileForm;
