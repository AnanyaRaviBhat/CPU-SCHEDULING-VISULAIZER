// Process definition
export interface Process {
  pid: string;
  arrival: number | string; // ADD: Allow string
  burst: number | string; // ADD: Allow string
  priority?: number | string; // ADD: Allow string
}

// Gantt chart item
export interface GanttChartItem {
  pid: string;
  start: number;
  end: number;
}

// Process result after scheduling
export interface ProcessResult {
  pid: string;
  arrival: number;
  burst: number;
  completion: number;
  turnaround: number;
  waiting: number;
  response: number;
}

// API response
export interface SchedulerResponse {
  ganttChart: GanttChartItem[];
  processResults: ProcessResult[];
  averages: {
    turnaround: number;
    waiting: number;
    response: number;
  };
}

// API request
export interface SchedulerRequest {
  algorithm: AlgorithmType;
  processes: Process[];
  quantum?: number;
}

// Algorithm type
export type AlgorithmType = "FCFS" | "SJF" | "RR" | "PRIORITY";
