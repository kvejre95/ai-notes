"use client";
import FileCard from '@/components/FileCard';
import UploadButton from '@/components/UploadCard';
import UploadDocument from '@/components/UploadDocument';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import Link from 'next/link';
import React from 'react'

function Dashboard() {
  const {user} = useUser()
  const allFiles = useQuery(api.fileStorage.getAllFiles,{userId: user?.primaryEmailAddress?.emailAddress})
  
  return (
    <div>
      <h2 className='font-medium text-3xl mb-5'>Home Directory</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <UploadDocument>
          <UploadButton />
        </UploadDocument>
        {allFiles&&allFiles.map((file)=>{
          const work_path = `/workspace/${file.fileId}`
          return (
            <Link key={file._id} href={work_path} ><FileCard key={file._id} fileName={file.fileName}/></Link>
          )
        })
        }
        
      </div>
  </div>
  )
}

export default Dashboard