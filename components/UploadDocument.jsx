"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button" 
import React from 'react'
import { Loader2Icon } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import uuid4 from "uuid4"
import { useUser } from "@clerk/nextjs"
import axios from 'axios'

function UploadDocument({children}) {
  // State Variables
  const [file, setFile] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const fileNameRef = React.useRef(null)

  // Clerk User
  const {user} = useUser()

  // Convex Mutations 
  const InsertFileData = useMutation(api.fileStorage.addFile)
  const getFilesUrl = useMutation(api.fileStorage.getFilesUrl)
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
  const checkFileName = useMutation(api.fileStorage.checkFileName)

  // Function to upload file
  const OnUpload = async () => {
    const fileName = fileNameRef.current.value

    if (!file || fileName.trim() === "" ) {
      return
    }

    setLoading(true) 

    // Check if file name already exists
    const fileExists = await checkFileName({fileName: fileName})
    if (fileExists) {
      alert("File name already exists")
      setLoading(false)
      return
    }

    try {
      // Get the upload URL
      const postUrl = await generateUploadUrl();

      // Upload the file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // Get the storage ID, file ID and file URL
      const { storageId } = await result.json();
      const fileId = uuid4();
      const fileUrl = await getFilesUrl({storageId: storageId})

      // Insert the file data
      await InsertFileData({
        fileId, 
        storageId, 
        fileName, 
        fileUrl, 
        userId: user.primaryEmailAddress.emailAddress
      })


      // TODO:  Implement Docling Later for Complex PDF Files

      const response = await axios.post('/api/process-pdf', {
        fileId: fileId,
        fileUrl: fileUrl,
      })  
      


      
      // Close dialog on successful upload
      setOpen(false)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      // Reset the form
      setLoading(false)
    }
  }

  // Reset form when dialog closes
  const handleOpenChange = (newOpen) => {
    if (!newOpen && !loading) {
      // Only allow closing if not loading
      setFile(null)
      if (fileNameRef.current) {
        fileNameRef.current.value = ""
      }
      setOpen(false)
    } else if (newOpen) {
      setOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger onClick={() => setOpen(true)}>{children}</DialogTrigger>
        <DialogContent 
          className="sm:max-w-md mx-auto top-1/3 -translate-y-1/3 left-1/3 -translate-x-1/3"
          onInteractOutside={(e) => {
            // Prevent closing when loading
            if (loading) {
              e.preventDefault()
            }
          }}
        >
        <DialogHeader>
          <DialogTitle>Upload PDF Files</DialogTitle>
          <DialogDescription asChild>
            <div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label className="block text-sm font-medium mb-1">Select File</label>
                    <div className="border-2 border-gray-300 rounded-md p-2 focus-within:border-primary">
                      <Input 
                        id="document" 
                        type="file" 
                        accept="application/pdf" 
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0" 
                        onChange={(e) => { setFile(e.target.files[0]) }}
                        disabled={loading}
                      />
                  </div>
                  <label className="block text-sm font-medium mb-1">Document Name</label>
                  <Input 
                    ref={fileNameRef}
                    className="border-2 border-gray-300 focus:border-primary" 
                    type="text" 
                    placeholder="File Name"
                    disabled={loading}
                  />
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="secondary"
              disabled={loading}
            >
              Close
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={OnUpload}
            disabled={loading}
          >
            {loading ? 
              <div className="flex items-center gap-2">
                <Loader2Icon className="animate-spin" />
                <span>Uploading...</span>
              </div> 
              : 
              "Confirm"
            }
          </Button>
        </DialogFooter>
        
        {/* Overlay to prevent interaction when loading */}
        {loading && (
          <div className="absolute inset-0 bg-black/5 rounded-md flex items-center justify-center">
            {/* This empty div prevents clicks from reaching elements behind it */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UploadDocument