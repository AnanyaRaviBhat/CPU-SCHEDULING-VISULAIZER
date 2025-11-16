import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ProcessTable from "../components/ProcessTable/ProcessTable";
import ResultsContainer from "../components/Results/ResultsContainer";
import { useScheduler } from "../hooks/useScheduler";

const SchedulerPage: React.FC = () => {
  const {
    algorithm,
    setAlgorithm,
    quantum,
    setQuantum,
    processes,
    addProcess,
    removeProcess,
    updateProcess,
    loading,
    result,
    error,
    runScheduler,
    reset,
  } = useScheduler();

  const handleReset = () => {
    reset();
  };

  const handleRunScheduler = () => {
    // Validate processes
    for (const process of processes) {
      // Check if empty
      if (process.arrival === "" || process.burst === "") {
        alert("Please fill all fields. Arrival and Burst time are required.");
        return;
      }

      // Convert to numbers
      const arrival =
        typeof process.arrival === "string"
          ? parseFloat(process.arrival)
          : process.arrival;
      const burst =
        typeof process.burst === "string"
          ? parseFloat(process.burst)
          : process.burst;

      // Validate numbers
      if (
        !process.pid ||
        isNaN(arrival) ||
        arrival < 0 ||
        isNaN(burst) ||
        burst <= 0
      ) {
        alert(
          "Please enter valid numbers. Arrival time cannot be negative and Burst time must be positive."
        );
        return;
      }

      // Check priority for PRIORITY algorithm
      if (algorithm === "PRIORITY") {
        if (process.priority === "" || process.priority === undefined) {
          alert(
            "Priority scheduling requires priority values for all processes."
          );
          return;
        }
        const priority =
          typeof process.priority === "string"
            ? parseFloat(process.priority)
            : process.priority;
        if (isNaN(priority) || priority < 0) {
          alert("Priority values must be valid non-negative numbers.");
          return;
        }
      }
    }

    // Validate quantum for RR
    if (algorithm === "RR") {
      const q = typeof quantum === "string" ? parseInt(quantum) : quantum;
      if (isNaN(q) || q <= 0 || quantum === "" || quantum === 0) {
        alert("Quantum must be a positive number for Round Robin.");
        return;
      }
    }

    runScheduler();
  };

  return (
    <div className="h-screen w-screen bg-white overflow-hidden flex flex-col">
      {/* Mobile: Scrollable vertical layout, Desktop: Side by side with border */}
      <div className="flex-1 flex flex-col md:flex-row md:border-2 md:border-black md:rounded-lg md:m-4 overflow-hidden">
        {/* Sidebar - Scrollable on mobile, fixed on desktop */}
        <aside className="w-full md:w-80 flex-shrink-0 bg-white p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 border-black overflow-y-auto max-h-[40vh] md:max-h-full">
          <Sidebar
            algorithm={algorithm}
            onAlgorithmChange={setAlgorithm}
            quantum={quantum}
            onQuantumChange={setQuantum}
            onRun={handleRunScheduler}
            onReset={handleReset}
            onAddProcess={addProcess}
            loading={loading}
            hasResult={!!result}
          />
        </aside>

        {/* Main Content - Always visible and scrollable */}
        <main className="flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-100 border-2 border-red-400 text-red-700 px-4 md:px-6 py-4 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 md:h-20 w-16 md:w-20 border-t-4 border-b-4 border-blue-800 mx-auto mb-4"></div>
                <p className="text-blue-800 text-lg md:text-xl font-semibold">
                  Processing...
                </p>
              </div>
            </div>
          )}

          {/* Input Form */}
          {!loading && !result && (
            <ProcessTable
              processes={processes}
              algorithm={algorithm}
              onUpdateProcess={updateProcess}
              onRemoveProcess={removeProcess}
            />
          )}

          {/* Results Display */}
          {!loading && result && (
            <ResultsContainer
              result={result}
              algorithm={algorithm}
              onBack={handleReset}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default SchedulerPage;
