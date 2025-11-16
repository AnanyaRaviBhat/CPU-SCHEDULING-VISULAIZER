import React from "react";
import { type ProcessResult } from "../../types";

interface ResultTableProps {
  results: ProcessResult[];
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 md:mb-6">
        Process Metrics
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Process
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Arrival
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Burst
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Completion
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Turnaround
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Waiting
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Response
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result) => (
              <tr
                key={result.pid}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
                    {result.pid}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{result.arrival}</td>
                <td className="px-4 py-3 text-gray-700">{result.burst}</td>
                <td className="px-4 py-3 text-gray-700 font-semibold">
                  {result.completion}
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  {result.turnaround}
                </td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  {result.waiting}
                </td>
                <td className="px-4 py-3 text-purple-600 font-semibold">
                  {result.response}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {results.map((result) => (
          <div
            key={result.pid}
            className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200"
          >
            <div className="font-bold text-lg text-blue-800 mb-3 pb-2 border-b-2 border-blue-300">
              {result.pid}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Arrival:</span>
                <span className="ml-2 font-semibold">{result.arrival}</span>
              </div>
              <div>
                <span className="text-gray-600">Burst:</span>
                <span className="ml-2 font-semibold">{result.burst}</span>
              </div>
              <div>
                <span className="text-gray-600">Completion:</span>
                <span className="ml-2 font-semibold">{result.completion}</span>
              </div>
              <div>
                <span className="text-gray-600">Turnaround:</span>
                <span className="ml-2 font-semibold text-blue-600">
                  {result.turnaround}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Waiting:</span>
                <span className="ml-2 font-semibold text-green-600">
                  {result.waiting}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Response:</span>
                <span className="ml-2 font-semibold text-purple-600">
                  {result.response}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultTable;
