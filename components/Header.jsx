import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { NotebookIcon } from 'lucide-react'

function Header() {
  return (
  <div>
  <div className="flex flex-row items-center justify-between px-4 py-2">
    <div className="w-1/4">
      {/* Empty div to balance the layout */}
    </div>
    <div className="flex justify-center w-2/4">
      {/* <Image src="/logo-cropped.svg" alt="logo" width={80} height={80} /> */}
      <div className="flex items-center gap-2 cursor-pointer">
            <NotebookIcon className="w-6 h-6 text-gray-800" />
            <span className="text-lg font-semibold text-gray-800">NOTE-ME</span>
      </div>
    </div>
    <div className="w-1/4 flex justify-end">
      <UserButton />
    </div>
  </div>
  <div className="h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
  <div className="h-px bg-gray-300 shadow-md"></div>
</div>
  )
}

export default Header