export interface Process {
  pid: string;
  arrival: number;
  burst: number;
  priority?: number;
}

export interface GanttChartItem {
  pid: string;
  start: number;
  end: number;
}

export interface ProcessResult {
  pid: string;
  arrival: number;
  burst: number;
  completion: number;
  turnaround: number;
  waiting: number;
  response: number;
}

export interface SchedulerResponse {
  ganttChart: GanttChartItem[];
  processResults: ProcessResult[];
  averages: {
    turnaround: number;
    waiting: number;
    response: number;
  };
}

export interface SchedulerRequest {
  algorithm: "FCFS" | "SJF" | "RR" | "PRIORITY";
  processes: Process[];
  quantum?: number;
}

export type AlgorithmType = "FCFS" | "SJF" | "RR" | "PRIORITY";
