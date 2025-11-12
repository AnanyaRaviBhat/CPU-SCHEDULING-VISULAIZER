import {
  Process,
  SchedulerResponse,
  GanttChartItem,
  ProcessResult,
} from "../types";

export function roundRobin(
  processes: Process[],
  quantum: number
): SchedulerResponse {
  if (quantum <= 0) {
    throw new Error("Quantum must be positive");
  }

  const ganttChart: GanttChartItem[] = [];
  const processResults: ProcessResult[] = [];

  // Create a working copy with remaining burst time
  interface WorkingProcess extends Process {
    remaining: number;
    index: number;
  }

  const workingProcesses: WorkingProcess[] = processes.map((p, index) => ({
    ...p,
    remaining: p.burst,
    index,
  }));

  const responseTime: { [key: string]: number } = {};
  const completionTime: { [key: string]: number } = {};

  let currentTime = 0;
  const readyQueue: WorkingProcess[] = [];
  let processIndex = 0;

  // Add first process(es) that arrive at time 0
  while (
    processIndex < workingProcesses.length &&
    workingProcesses[processIndex].arrival <= currentTime
  ) {
    readyQueue.push(workingProcesses[processIndex]);
    processIndex++;
  }

  while (readyQueue.length > 0 || processIndex < workingProcesses.length) {
    if (readyQueue.length === 0) {
      // Jump to next arrival
      currentTime = workingProcesses[processIndex].arrival;
      readyQueue.push(workingProcesses[processIndex]);
      processIndex++;
      continue;
    }

    const currentProcess = readyQueue.shift()!;

    // Record response time (first time process gets CPU)
    if (!(currentProcess.pid in responseTime)) {
      responseTime[currentProcess.pid] = currentTime - currentProcess.arrival;
    }

    // Execute for quantum or remaining time, whichever is smaller
    const executeTime = Math.min(quantum, currentProcess.remaining);

    ganttChart.push({
      pid: currentProcess.pid,
      start: currentTime,
      end: currentTime + executeTime,
    });

    currentTime += executeTime;
    currentProcess.remaining -= executeTime;

    // Add newly arrived processes to ready queue
    while (
      processIndex < workingProcesses.length &&
      workingProcesses[processIndex].arrival <= currentTime
    ) {
      readyQueue.push(workingProcesses[processIndex]);
      processIndex++;
    }

    // If process is not complete, add back to queue
    if (currentProcess.remaining > 0) {
      readyQueue.push(currentProcess);
    } else {
      // Process completed
      completionTime[currentProcess.pid] = currentTime;
    }
  }

  // Calculate results for each process
  processes.forEach((process) => {
    const completion = completionTime[process.pid];
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
