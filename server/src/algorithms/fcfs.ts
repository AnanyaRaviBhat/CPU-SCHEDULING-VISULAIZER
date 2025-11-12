import {
  Process,
  SchedulerResponse,
  GanttChartItem,
  ProcessResult,
} from "../types";

export function fcfs(processes: Process[]): SchedulerResponse {
  // Sort by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrival - b.arrival);

  const ganttChart: GanttChartItem[] = [];
  const processResults: ProcessResult[] = [];

  let currentTime = 0;
  const responseTime: { [key: string]: number } = {};

  sortedProcesses.forEach((process) => {
    // If CPU is idle, jump to next process arrival
    if (currentTime < process.arrival) {
      currentTime = process.arrival;
    }

    // Record response time (first time CPU allocated)
    responseTime[process.pid] = currentTime - process.arrival;

    // Add to Gantt chart
    ganttChart.push({
      pid: process.pid,
      start: currentTime,
      end: currentTime + process.burst,
    });

    // Update current time
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
  });

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
