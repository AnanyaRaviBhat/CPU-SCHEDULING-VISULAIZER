import { type GanttChartItem } from "../../types";

interface GanttChartProps {
  ganttChart: GanttChartItem[];
}

const GanttChart = ({ ganttChart }: GanttChartProps) => {
  const maxTime = Math.max(...ganttChart.map((item) => item.end));

  const colorPalette = [
    { bg: "#3B82F6", name: "Blue" },
    { bg: "#10B981", name: "Green" },
    { bg: "#F59E0B", name: "Yellow" },
    { bg: "#EF4444", name: "Red" },
    { bg: "#8B5CF6", name: "Purple" },
    { bg: "#EC4899", name: "Pink" },
    { bg: "#6366F1", name: "Indigo" },
    { bg: "#14B8A6", name: "Teal" },
  ];

  const pidColorMap: { [key: string]: (typeof colorPalette)[0] } = {};
  let colorIndex = 0;

  ganttChart.forEach((item) => {
    if (!pidColorMap[item.pid]) {
      pidColorMap[item.pid] = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
    }
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        padding: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#1F2937",
          marginBottom: "1.5rem",
        }}
      >
        Gantt Chart
      </h2>

      {/* Main Chart Container */}
      <div
        style={{
          backgroundColor: "#F9FAFB",
          padding: "2rem",
          borderRadius: "0.5rem",
          border: "2px solid #E5E7EB",
          marginBottom: "1rem",
        }}
      >
        {/* Process Blocks */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
            gap: "2px",
            width: "100%",
          }}
        >
          {ganttChart.map((item, index) => {
            const duration = item.end - item.start;
            const widthPercentage = (duration / maxTime) * 100;
            const color = pidColorMap[item.pid];

            return (
              <div
                key={index}
                style={{
                  backgroundColor: color.bg,
                  color: "white",
                  width: `${widthPercentage}%`,
                  minWidth: "90px",
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  fontWeight: "bold",
                  border: `3px solid ${color.bg}`,
                  filter: "brightness(1)",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1)";
                }}
              >
                <span style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                  {item.pid}
                </span>
                <span style={{ fontSize: "0.875rem", opacity: 0.9 }}>
                  {item.start} → {item.end}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                    opacity: 0.8,
                  }}
                >
                  Duration: {duration}
                </span>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div
          style={{
            borderTop: "3px solid #6B7280",
            paddingTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "3px",
                height: "20px",
                backgroundColor: "#4B5563",
              }}
            ></div>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "#374151",
              }}
            >
              0
            </span>
          </div>

          <span
            style={{
              fontSize: "0.875rem",
              color: "#6B7280",
              fontWeight: "600",
            }}
          >
            Time Units →
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                color: "#374151",
              }}
            >
              {maxTime}
            </span>
            <div
              style={{
                width: "3px",
                height: "20px",
                backgroundColor: "#4B5563",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          backgroundColor: "#F9FAFB",
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid #E5E7EB",
          marginBottom: "1rem",
        }}
      >
        <h3
          style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "0.75rem",
          }}
        >
          Process Legend:
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {Object.entries(pidColorMap).map(([pid, color]) => (
            <div
              key={pid}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: color.bg,
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                  border: `2px solid ${color.bg}`,
                }}
              ></div>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                {pid}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#DBEAFE",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #BFDBFE",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#1F2937",
              marginBottom: "0.25rem",
            }}
          >
            Total Processes
          </p>
          <p
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2563EB" }}
          >
            {Object.keys(pidColorMap).length}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#D1FAE5",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #A7F3D0",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "#1F2937",
              marginBottom: "0.25rem",
            }}
          >
            Total Time
          </p>
          <p
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#059669" }}
          >
            {maxTime} units
          </p>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
