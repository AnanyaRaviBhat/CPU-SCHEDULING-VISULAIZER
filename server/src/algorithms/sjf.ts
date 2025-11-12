import {
  Process,
  SchedulerResponse,
  GanttChartItem,
  ProcessResult,
} from "../types";

export function sjf(processes: Process[]): SchedulerResponse {
  const ganttChart: GanttChartItem[] = [];
  const processResults: ProcessResult[] = [];
  const n = processes.length;

  // Track which processes are completed
  const completed: boolean[] = new Array(n).fill(false);
  const responseTime: { [key: string]: number } = {};

  let currentTime = 0;
  let completedCount = 0;

  while (completedCount < n) {
    // Find process with shortest burst time that has arrived and not completed
    let shortestIndex = -1;
    let shortestBurst = Infinity;

    for (let i = 0; i < n; i++) {
      if (!completed[i] && processes[i].arrival <= currentTime) {
        if (processes[i].burst < shortestBurst) {
          shortestBurst = processes[i].burst;
          shortestIndex = i;
        }
        // If burst times are equal, choose the one that arrived first
        else if (
          processes[i].burst === shortestBurst &&
          processes[i].arrival < processes[shortestIndex].arrival
        ) {
          shortestIndex = i;
        }
      }
    }

    // If no process is ready, jump to next arrival
    if (shortestIndex === -1) {
      const nextArrival = Math.min(
        ...processes.filter((p, i) => !completed[i]).map((p) => p.arrival)
      );
      currentTime = nextArrival;
      continue;
    }

    const process = processes[shortestIndex];

    // Record response time
    responseTime[process.pid] = currentTime - process.arrival;

    // Add to Gantt chart
    ganttChart.push({
      pid: process.pid,
      start: currentTime,
      end: currentTime + process.burst,
    });

    // Update time
    currentTime += process.burst;

    // Calculate times
    const completion = currentTime;
    const turnaround = completion - process.arrival;
    const waiting = turnaround - process.burst;

    processResults.push({
      pid: process.pid,
      arrival: process.arrival,
      burst: process.burst,
      completion,
      turnaround,
      waiting,
      response: responseTime[process.pid],
    });

    completed[shortestIndex] = true;
    completedCount++;
  }

  // Sort results by PID for consistent output
  processResults.sort((a, b) => a.pid.localeCompare(b.pid));

  // Calculate averages
  const avgTurnaround =
    processResults.reduce((sum, p) => sum + p.turnaround, 0) /
    processResults.length;
  const avgWaiting =
    processResults.reduce((sum, p) => sum + p.waiting, 0) /
    processResults.length;
  const avgResponse =
    processResults.reduce((sum, p) => sum + p.response, 0) /
    processResults.length;

  return {
    ganttChart,
    processResults,
    averages: {
      turnaround: Math.round(avgTurnaround * 100) / 100,
      waiting: Math.round(avgWaiting * 100) / 100,
      response: Math.round(avgResponse * 100) / 100,
    },
  };
}
