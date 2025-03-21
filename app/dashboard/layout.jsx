import Header from '@/components/Header'
import React from 'react'
//style={{ backgroundColor: "#fcf9de" }}

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full shadow-lg bg-white border-r border-gray-700">
        <Header />
      </div>
      <div className='flex-1 p-4 w-full'>
        {children}
      </div>
  </div>
  )
}

export default DashboardLayout