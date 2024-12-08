'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function IsAuthenticatedUser({ children }) {
  const router = useRouter();
  const userCookie = Cookies.get("token");

  useEffect(() => {
    if (!userCookie) {
      router.push("/auth");
    }
  }, [userCookie, router]);

  return userCookie ? children : null;
}
