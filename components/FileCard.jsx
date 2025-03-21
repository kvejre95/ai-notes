import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const FileCard = (props) => {
  // Generate a random file name for demonstration
  
  
  return (
    <Card className="w-full max-w-xs hover:bg-gray-300 transition-colors cursor-pointer border border-gray-200">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mb-3">
          <FileText className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-sm font-medium text-gray-800 text-center truncate w-full">
          {props.fileName}
        </h3>
        <p className="text-xs text-gray-500 mt-1">Click to view</p>
      </CardContent>
    </Card>
  );
};

export default FileCard;