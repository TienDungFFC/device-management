"use client";
import Image from "next/image";
import AVATAR from "~/avatar.png";
import ARROW_DOWN from "~/down-arrow-56.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userId");
      router.push("/login");
    }
  };
  return (
    <div className="border-b">
      <div className="h-16 border-1 flex justify-between items-center container m-auto">
        <h2 className="font-bold">CE32 PROEJCT</h2>
        <div className="flex gap-4 items-center">
          <button className="h-10 w-12 bg-[#e2e1e1] font-bold rounded-lg flex items-center justify-center leading-none text-black">
            <span className="mt-[-6px] inline-block">...</span>
          </button>

          <a
            type="button"
            className="px-4 leading-[40px] h-10 rounded-lg font-bold bg-black text-white cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </a>
          <div className="flex gap-2 items-center">
            <div className="relative size-8 rounded-full overflow-hidden">
              <Image src={AVATAR} alt="avatar" fill />
            </div>
            <div className="relative size-6 flex items-center">
              <ARROW_DOWN />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
