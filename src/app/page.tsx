"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.push("/device-management");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div></div>;
}
