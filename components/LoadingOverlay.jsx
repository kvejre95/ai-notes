import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isVisible, message }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-700 font-medium">{message || 'Processing...'}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;