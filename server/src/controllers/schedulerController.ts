import { Request, Response } from "express";
import { SchedulerRequest } from "../types";
import { fcfs } from "../algorithms/fcfs";
import { sjf } from "../algorithms/sjf";
import { roundRobin } from "../algorithms/rr";
import { priority } from "../algorithms/priority";

export const scheduleProcesses = (req: Request, res: Response): void => {
  try {
    const { algorithm, processes, quantum }: SchedulerRequest = req.body;

    // Validation
    if (
      !algorithm ||
      !processes ||
      !Array.isArray(processes) ||
      processes.length === 0
    ) {
      res
        .status(400)
        .json({
          error: "Invalid input: algorithm and processes array required",
        });
      return;
    }

    // Validate each process
    for (const process of processes) {
      if (
        !process.pid ||
        typeof process.arrival !== "number" ||
        typeof process.burst !== "number"
      ) {
        res
          .status(400)
          .json({ error: "Each process must have pid, arrival, and burst" });
        return;
      }
      if (process.burst <= 0) {
        res.status(400).json({ error: "Burst time must be positive" });
        return;
      }
    }

    let result;

    switch (algorithm) {
      case "FCFS":
        result = fcfs(processes);
        break;

      case "SJF":
        result = sjf(processes);
        break;

      case "RR":
        if (!quantum || quantum <= 0) {
          res
            .status(400)
            .json({ error: "Round Robin requires a positive quantum value" });
          return;
        }
        result = roundRobin(processes, quantum);
        break;

      case "PRIORITY":
        // Check if all processes have priority
        const missingPriority = processes.some(
          (p) => typeof p.priority !== "number"
        );
        if (missingPriority) {
          res
            .status(400)
            .json({
              error:
                "Priority scheduling requires priority value for all processes",
            });
          return;
        }
        result = priority(processes);
        break;

      default:
        res
          .status(400)
          .json({ error: "Invalid algorithm. Use FCFS, SJF, RR, or PRIORITY" });
        return;
    }

    res.json(result);
  } catch (error) {
    console.error("Error in scheduleProcesses:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
