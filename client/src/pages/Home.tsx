import { useState } from "react";
import Navbar from "../components/Navbar";
import InputForm from "../components/InputForm";
import ResultTable from "../components/ResultTable";
import GanttChart from "../components/GanttChart";
import {
  type AlgorithmType,
  type Process,
  type SchedulerResponse,
} from "../types";
import { scheduleProcesses } from "../api/schedulerApi";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SchedulerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const handleSubmit = async (
    algorithm: AlgorithmType,
    processes: Process[],
    quantum?: number
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSelectedAlgorithm(algorithm);

    try {
      const response = await scheduleProcesses({
        algorithm,
        processes,
        quantum,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Form */}
        <div className="mb-8">
          <InputForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8">
            {/* Algorithm Info */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800">
                Algorithm Used:{" "}
                <span className="text-purple-600">{selectedAlgorithm}</span>
              </h3>
            </div>

            {/* Gantt Chart */}
            <GanttChart ganttChart={result.ganttChart} />

            {/* Result Table */}
            <ResultTable
              results={result.processResults}
              averages={result.averages}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-white text-sm">
        <p>CPU Scheduler Visualizer - Operating Systems Project</p>
      </footer>
    </div>
  );
};

export default Home;
