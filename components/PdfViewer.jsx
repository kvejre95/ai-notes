import React from 'react'

function PdfViewer({fileUrl}) {
    const url = `${fileUrl}#toolbar=0`;
    
    return (
        <div className="w-full h-[90vh] rounded-md overflow-hidden border border-gray-200 shadow-sm bg-white">
            <iframe 
                src={url} 
                className="w-full h-full border-none"
                title="PDF Viewer"
            ></iframe>
        </div>
    );
}

export default PdfViewer