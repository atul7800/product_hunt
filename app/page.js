"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/explore");
    } else {
      router.replace("/login");
    }
  }, []);

  return null; // No need to render anything
}
