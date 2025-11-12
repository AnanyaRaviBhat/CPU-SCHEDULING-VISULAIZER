import { useState } from "react";
import { Plus, Trash2, Play } from "lucide-react";
import { type Process, type AlgorithmType } from "../types";

interface InputFormProps {
  onSubmit: (
    algorithm: AlgorithmType,
    processes: Process[],
    quantum?: number
  ) => void;
  loading: boolean;
}

const InputForm = ({ onSubmit, loading }: InputFormProps) => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("FCFS");
  const [quantum, setQuantum] = useState<number>(2);
  const [processes, setProcesses] = useState<Process[]>([
    { pid: "P1", arrival: 0, burst: 5, priority: 1 },
    { pid: "P2", arrival: 1, burst: 3, priority: 2 },
    { pid: "P3", arrival: 2, burst: 8, priority: 1 },
  ]);

  const addProcess = () => {
    const newPid = `P${processes.length + 1}`;
    setProcesses([
      ...processes,
      { pid: newPid, arrival: 0, burst: 1, priority: 1 },
    ]);
  };

  const removeProcess = (index: number) => {
    if (processes.length > 1) {
      setProcesses(processes.filter((_, i) => i !== index));
    }
  };

  const updateProcess = (
    index: number,
    field: keyof Process,
    value: string | number
  ) => {
    const updated = [...processes];
    updated[index] = { ...updated[index], [field]: value };
    setProcesses(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    for (const process of processes) {
      if (!process.pid || process.arrival < 0 || process.burst <= 0) {
        alert("Please fill all fields correctly. Burst time must be positive.");
        return;
      }
      if (
        algorithm === "PRIORITY" &&
        (process.priority === undefined || process.priority < 0)
      ) {
        alert("Priority scheduling requires valid priority values.");
        return;
      }
    }

    if (algorithm === "RR" && quantum <= 0) {
      alert("Quantum must be positive for Round Robin.");
      return;
    }

    onSubmit(algorithm, processes, algorithm === "RR" ? quantum : undefined);
  };

  const needsPriority = algorithm === "PRIORITY";
  const needsQuantum = algorithm === "RR";

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Process Input</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Algorithm Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scheduling Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="FCFS">First Come First Serve (FCFS)</option>
              <option value="SJF">Shortest Job First (SJF)</option>
              <option value="RR">Round Robin (RR)</option>
              <option value="PRIORITY">Priority Scheduling</option>
            </select>
          </div>

          {needsQuantum && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Quantum
              </label>
              <input
                type="number"
                min="1"
                value={quantum}
                onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Process Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Process ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Arrival Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Burst Time
                </th>
                {needsPriority && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Priority
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processes.map((process, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={process.pid}
                      onChange={(e) =>
                        updateProcess(index, "pid", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                      placeholder="P1"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      value={process.arrival}
                      onChange={(e) =>
                        updateProcess(
                          index,
                          "arrival",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      value={process.burst}
                      onChange={(e) =>
                        updateProcess(
                          index,
                          "burst",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                  </td>
                  {needsPriority && (
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        value={process.priority || 0}
                        onChange={(e) =>
                          updateProcess(
                            index,
                            "priority",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeProcess(index)}
                      disabled={processes.length === 1}
                      className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Process Button */}
        <button
          type="button"
          onClick={addProcess}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Process</span>
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Run Scheduler</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
