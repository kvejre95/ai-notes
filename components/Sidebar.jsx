import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Layout, Shield } from 'lucide-react'

function Sidebar() {
  return (
    <div className="ml-2">
  <div className="flex flex-col w-full">
    <div className="flex justify-center mt-3">
      <Image src="/logo-cropped.svg" alt="logo" width={80} height={80} />
    </div>
    
    <div className="mt-3 w-full px-2">
      <Button className="w-full rounded">Create New Notes</Button>
      
      <div className="flex gap-2 items-center p-3 mt-5 hover:bg-gray-400 rounded-lg cursor-pointer">
        <Layout/>
        <h2>Previous Uploads</h2>
      </div>
      
      {/* <div className="flex gap-2 items-center p-3 mt-1 hover:bg-gray-400 rounded-lg cursor-pointer">
        <Shield/>
        <h2>Upgrade</h2>
      </div> */}
    </div>
  </div>
</div>
  )
}

export default Sidebar