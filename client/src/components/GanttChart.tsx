import { type GanttChartItem } from "../types";

interface GanttChartProps {
  ganttChart: GanttChartItem[];
}

const GanttChart = ({ ganttChart }: GanttChartProps) => {
  const maxTime = Math.max(...ganttChart.map((item) => item.end));

  // Generate distinct colors for different processes
  const colorPalette = [
    { bg: "bg-blue-500", text: "text-white", border: "border-blue-600" },
    { bg: "bg-green-500", text: "text-white", border: "border-green-600" },
    { bg: "bg-yellow-500", text: "text-white", border: "border-yellow-600" },
    { bg: "bg-red-500", text: "text-white", border: "border-red-600" },
    { bg: "bg-purple-500", text: "text-white", border: "border-purple-600" },
    { bg: "bg-pink-500", text: "text-white", border: "border-pink-600" },
    { bg: "bg-indigo-500", text: "text-white", border: "border-indigo-600" },
    { bg: "bg-teal-500", text: "text-white", border: "border-teal-600" },
  ];

  const pidColorMap: { [key: string]: (typeof colorPalette)[0] } = {};
  let colorIndex = 0;

  // Assign colors to each unique process
  ganttChart.forEach((item) => {
    if (!pidColorMap[item.pid]) {
      pidColorMap[item.pid] = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gantt Chart</h2>

      {/* Main Gantt Chart */}
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
        <div className="overflow-x-auto">
          {/* Process blocks */}
          <div className="flex items-center min-w-max mb-4">
            {ganttChart.map((item, index) => {
              const duration = item.end - item.start;
              const widthPx = duration * 60; // 60px per time unit
              const colors = pidColorMap[item.pid];

              return (
                <div
                  key={index}
                  className={`${colors.bg} ${colors.text} border-2 ${colors.border} font-bold flex flex-col items-center justify-center rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl`}
                  style={{
                    width: `${widthPx}px`,
                    height: "100px",
                    minWidth: "100px",
                  }}
                >
                  <span className="text-2xl">{item.pid}</span>
                  <span className="text-sm mt-2 opacity-90">
                    Duration: {duration}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timeline markers */}
          <div className="flex items-start min-w-max border-t-2 border-gray-400 pt-2">
            {ganttChart.map((item, index) => {
              const duration = item.end - item.start;
              const widthPx = duration * 60;

              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    width: `${widthPx}px`,
                    minWidth: "100px",
                  }}
                >
                  {/* Start time marker */}
                  <div className="absolute left-0 flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-gray-600"></div>
                    <span className="text-sm font-semibold text-gray-700 mt-1">
                      {item.start}
                    </span>
                  </div>

                  {/* End time marker (only for last item) */}
                  {index === ganttChart.length - 1 && (
                    <div className="absolute right-0 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-gray-600"></div>
                      <span className="text-sm font-semibold text-gray-700 mt-1">
                        {item.end}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Process Legend:
        </h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(pidColorMap).map(([pid, colors]) => (
            <div key={pid} className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 ${colors.bg} border-2 ${colors.border} rounded shadow`}
              ></div>
              <span className="text-sm font-medium text-gray-700">{pid}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600">Total Processes</p>
          <p className="text-xl font-bold text-blue-600">
            {Object.keys(pidColorMap).length}
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600">Total Time</p>
          <p className="text-xl font-bold text-green-600">{maxTime} units</p>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
