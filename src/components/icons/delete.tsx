"use client";
import { useState } from "react";
import Delete from "~/x.svg";

export default function DeleteIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="inline-flex items-center justify-center size-6 rounded-full bg-none hover:bg-red-500 hover:text-white cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? <Delete /> : <Delete />}
    </div>
  );
}
