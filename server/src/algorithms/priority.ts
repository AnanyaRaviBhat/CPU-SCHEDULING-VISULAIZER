import {
  Process,
  SchedulerResponse,
  GanttChartItem,
  ProcessResult,
} from "../types";

export function priority(processes: Process[]): SchedulerResponse {
  // Validate that all processes have priority
  for (const process of processes) {
    if (typeof process.priority !== "number") {
      throw new Error(`Process ${process.pid} is missing priority value`);
    }
  }

  const ganttChart: GanttChartItem[] = [];
  const processResults: ProcessResult[] = [];
  const n = processes.length;

  const completed: boolean[] = new Array(n).fill(false);
  const responseTime: { [key: string]: number } = {};

  let currentTime = 0;
  let completedCount = 0;

  while (completedCount < n) {
    // Find highest priority process that has arrived and not completed
    let highestPriorityIndex = -1;
    let highestPriority = Infinity;

    for (let i = 0; i < n; i++) {
      if (!completed[i] && processes[i].arrival <= currentTime) {
        const processPriority = processes[i].priority!;

        if (processPriority < highestPriority) {
          highestPriority = processPriority;
          highestPriorityIndex = i;
        }
        // If priorities are equal, choose FCFS (earliest arrival)
        else if (
          processPriority === highestPriority &&
          processes[i].arrival < processes[highestPriorityIndex].arrival
        ) {
          highestPriorityIndex = i;
        }
      }
    }

    // If no process is ready, jump to next arrival
    if (highestPriorityIndex === -1) {
      const nextArrival = Math.min(
        ...processes.filter((p, i) => !completed[i]).map((p) => p.arrival)
      );
      currentTime = nextArrival;
      continue;
    }

    const process = processes[highestPriorityIndex];

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

    completed[highestPriorityIndex] = true;
    completedCount++;
  }

  // Sort results by PID
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
