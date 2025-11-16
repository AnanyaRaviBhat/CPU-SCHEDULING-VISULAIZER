import React from "react";
import { Clock, Hourglass, Zap } from "lucide-react";

interface AverageMetricsProps {
  averages: {
    turnaround: number;
    waiting: number;
    response: number;
  };
}

const AverageMetrics: React.FC<AverageMetricsProps> = ({ averages }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 md:p-6 border border-blue-200">
        <div className="flex items-center gap-2 md:gap-3 mb-2">
          <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          <p className="text-xs md:text-sm font-medium text-gray-700">
            Avg Turnaround Time
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">
          {averages.turnaround}
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 md:p-6 border border-green-200">
        <div className="flex items-center gap-2 md:gap-3 mb-2">
          <Hourglass className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
          <p className="text-xs md:text-sm font-medium text-gray-700">
            Avg Waiting Time
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-green-600">
          {averages.waiting}
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 md:p-6 border border-purple-200">
        <div className="flex items-center gap-2 md:gap-3 mb-2">
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
          <p className="text-xs md:text-sm font-medium text-gray-700">
            Avg Response Time
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-purple-600">
          {averages.response}
        </p>
      </div>
    </div>
  );
};

export default AverageMetrics;
