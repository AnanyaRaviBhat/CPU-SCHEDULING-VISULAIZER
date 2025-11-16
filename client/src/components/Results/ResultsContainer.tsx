import React from "react";
import { ArrowLeft } from "lucide-react";
import { type SchedulerResponse, type AlgorithmType } from "../../types";
import GanttChart from "./GanttChart";
import ResultTable from "./ResultTable";
import AverageMetrics from "./AverageMetrics";
import Button from "../common/Button";

interface ResultsContainerProps {
  result: SchedulerResponse;
  algorithm: AlgorithmType;
  onBack: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({
  result,
  algorithm,
  onBack,
}) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
              Scheduling Results
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Algorithm:{" "}
              <span className="font-semibold text-purple-600">{algorithm}</span>
            </p>
          </div>
          <Button
            onClick={onBack}
            variant="secondary"
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Back
          </Button>
        </div>
      </div>

      {/* Average Metrics */}
      <AverageMetrics averages={result.averages} />

      {/* Gantt Chart */}
      <GanttChart ganttChart={result.ganttChart} />

      {/* Result Table */}
      <ResultTable results={result.processResults} />
    </div>
  );
};

export default ResultsContainer;
