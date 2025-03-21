import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";

function WorkspaceHeader({ fileName }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
        {/* Left - Logo */}
        <Link href="/dashboard">
        <div className="flex flex-shrink-0">
          {/* <Image src="/logo-cropped.svg" alt="logo" width={80} height={80} /> */}
          <div className="flex items-center gap-2 cursor-pointer">
            <NotebookIcon className="w-6 h-6 text-gray-800" />
            <span className="text-lg font-semibold text-gray-800">NOTE-ME</span>
      </div>
        </div>
        </Link>
        {/* Center - File Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-semibold text-gray-800">{fileName}</h1>
        </div>

        {/* Right - User Button */}
        <div className="flex">
          <UserButton />
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      <div className="h-px bg-gray-300 shadow-md"></div>
    </div>
  );
}

export default WorkspaceHeader;
