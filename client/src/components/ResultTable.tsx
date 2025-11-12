import { type ProcessResult } from "../types";

interface ResultTableProps {
  results: ProcessResult[];
  averages: {
    turnaround: number;
    waiting: number;
    response: number;
  };
}

const ResultTable = ({ results, averages }: ResultTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Scheduling Results
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                Process ID
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
              <tr key={result.pid} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {result.pid}
                </td>
                <td className="px-4 py-3 text-gray-700">{result.arrival}</td>
                <td className="px-4 py-3 text-gray-700">{result.burst}</td>
                <td className="px-4 py-3 text-gray-700">{result.completion}</td>
                <td className="px-4 py-3 text-gray-700">{result.turnaround}</td>
                <td className="px-4 py-3 text-gray-700">{result.waiting}</td>
                <td className="px-4 py-3 text-gray-700">{result.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Averages */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Average Turnaround Time</p>
          <p className="text-2xl font-bold text-blue-600">
            {averages.turnaround}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Average Waiting Time</p>
          <p className="text-2xl font-bold text-green-600">
            {averages.waiting}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Average Response Time</p>
          <p className="text-2xl font-bold text-purple-600">
            {averages.response}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
