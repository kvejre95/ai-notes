import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureCard = ({ title, description, icon }) => {
    return (
      <Card className="shadow-md transition-transform hover:scale-105 hover:shadow-lg">
        <CardHeader className="flex items-center space-x-4">
          {icon}
          <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    );
}
export default FeatureCard;