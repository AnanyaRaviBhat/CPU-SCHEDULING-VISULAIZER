import React from "react";
import { type Process, type AlgorithmType } from "../../types";
import TableHeader from "./TableHeader";
import ProcessRow from "./ProcessRow";

interface ProcessTableProps {
  processes: Process[];
  algorithm: AlgorithmType;
  onUpdateProcess: (
    index: number,
    field: keyof Process,
    value: string | number
  ) => void;
  onRemoveProcess: (index: number) => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({
  processes,
  algorithm,
  onUpdateProcess,
  onRemoveProcess,
}) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
        Process Input
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHeader algorithm={algorithm} />
            <tbody className="divide-y divide-gray-200">
              {processes.map((process, index) => (
                <ProcessRow
                  key={index}
                  process={process}
                  index={index}
                  algorithm={algorithm}
                  onUpdate={onUpdateProcess}
                  onRemove={onRemoveProcess}
                  canRemove={processes.length > 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {processes.map((process, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl p-4 border-2 border-gray-200"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-blue-200">
              <span className="font-bold text-lg text-blue-800">
                {process.pid}
              </span>
              {processes.length > 1 && (
                <button
                  onClick={() => onRemoveProcess(index)}
                  className="text-red-600 hover:text-red-800 px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-all text-sm font-semibold"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Arrival Time
                </label>
                <input
                  type="text"
                  value={process.arrival}
                  onChange={(e) =>
                    onUpdateProcess(index, "arrival", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Burst Time
                </label>
                <input
                  type="text"
                  value={process.burst}
                  onChange={(e) =>
                    onUpdateProcess(index, "burst", e.target.value)
                  }
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="1"
                />
              </div>

              {algorithm === "PRIORITY" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Priority
                  </label>
                  <input
                    type="text"
                    value={process.priority || ""}
                    onChange={(e) =>
                      onUpdateProcess(index, "priority", e.target.value)
                    }
                    className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <p className="text-xs md:text-sm text-blue-800">
          <strong>Note:</strong> Process IDs are automatically renumbered when
          processes are removed.
          {algorithm === "PRIORITY" &&
            " Lower priority number = Higher priority."}
        </p>
      </div>
    </div>
  );
};

export default ProcessTable;
