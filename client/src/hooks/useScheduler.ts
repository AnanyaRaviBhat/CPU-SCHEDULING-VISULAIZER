import { useState } from "react";
import {
  type AlgorithmType,
  type Process,
  type SchedulerResponse,
} from "../types";
import { scheduleProcesses } from "../api/schedulerApi";

export const useScheduler = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("FCFS");
  const [quantum, setQuantum] = useState<number | string>(2);
  const [processes, setProcesses] = useState<Process[]>([
    { pid: "P1", arrival: "", burst: "", priority: "" },
    { pid: "P2", arrival: "", burst: "", priority: "" },
    { pid: "P3", arrival: "", burst: "", priority: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SchedulerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addProcess = () => {
    const newPid = `P${processes.length + 1}`;
    setProcesses([
      ...processes,
      { pid: newPid, arrival: "", burst: "", priority: "" },
    ]);
  };

  const removeProcess = (index: number) => {
    if (processes.length > 1) {
      const updated = processes.filter((_, i) => i !== index);
      const renumbered = updated.map((p, i) => ({
        ...p,
        pid: `P${i + 1}`,
      }));
      setProcesses(renumbered);
    }
  };

  const updateProcess = (
    index: number,
    field: keyof Process,
    value: string | number
  ) => {
    const updated = [...processes];
    updated[index] = { ...updated[index], [field]: value };
    setProcesses(updated);
  };

  const runScheduler = async () => {
    setLoading(true);
    setError(null);

    try {
      // Convert process values to numbers
      const processesWithNumbers = processes.map((p) => ({
        pid: p.pid,
        arrival:
          typeof p.arrival === "string" ? parseFloat(p.arrival) : p.arrival,
        burst: typeof p.burst === "string" ? parseFloat(p.burst) : p.burst,
        priority:
          p.priority !== undefined && p.priority !== ""
            ? typeof p.priority === "string"
              ? parseFloat(p.priority)
              : p.priority
            : undefined,
      }));

      const response = await scheduleProcesses({
        algorithm,
        processes: processesWithNumbers,
        quantum:
          algorithm === "RR"
            ? typeof quantum === "string"
              ? parseInt(quantum)
              : quantum
            : undefined,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setProcesses([
      { pid: "P1", arrival: "", burst: "", priority: "" },
      { pid: "P2", arrival: "", burst: "", priority: "" },
      { pid: "P3", arrival: "", burst: "", priority: "" },
    ]);
    setResult(null);
    setError(null);
    setAlgorithm("FCFS");
    setQuantum(2);
  };

  return {
    algorithm,
    setAlgorithm,
    quantum,
    setQuantum,
    processes,
    addProcess,
    removeProcess,
    updateProcess,
    loading,
    result,
    error,
    runScheduler,
    reset,
  };
};
