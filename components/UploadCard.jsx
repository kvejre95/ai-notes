import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const UploadCard = () => {
  return (
    <Card className="w-full max-w-xs hover:bg-gray-300 transition-colors cursor-pointer border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-3">
            <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-700">Upload New Document</h3>
            <p className="text-xs text-gray-500 mt-1">Click to browse files</p>
        </CardContent>
    </Card>
  );
};

export default UploadCard;