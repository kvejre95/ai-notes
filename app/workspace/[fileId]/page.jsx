"use client";
import WorkspaceHeader from '@/components/WorkspaceHeader';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PdfViewer from '@/components/PdfViewer';
import TextEditor from '@/components/TextEditor';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Workspace() {
  const { fileId } = useParams();
  const router = useRouter();
  const GetFileInfo = useMutation(api.fileStorage.getFileInfo);

  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    const getUrlData = async () => {
      try {
        const response = await GetFileInfo({ fileId });
        if (response && response.fileUrl) {
          setFileInfo(response);
        } else {
          alert("No such workspace exists.");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching file info:", error);
        alert("Failed to load file information.");
        router.push("/dashboard");
      }
    }
    getUrlData();
    // console.log(fileInfo);
  }, [fileId]);

  if (!fileInfo){
    return
  }

  return (
    <div className='h-screen'>
      <WorkspaceHeader fileName={fileInfo.fileName}/>

    <div className='grid grid-cols-2 gap-2'>
      <div>
        <TextEditor fileId={fileId} />
      </div>
      <div className=''>
        <PdfViewer fileUrl={fileInfo.fileUrl}/>
      </div>
    </div>
    </div>
  )
}

export default Workspace