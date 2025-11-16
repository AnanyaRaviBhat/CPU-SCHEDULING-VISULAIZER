import axios from "axios";
import { type SchedulerRequest, type SchedulerResponse } from "../types";

const API_BASE_URL = "/api";

export const scheduleProcesses = async (
  request: SchedulerRequest
): Promise<SchedulerResponse> => {
  try {
    const response = await axios.post<SchedulerResponse>(
      `${API_BASE_URL}/schedule`,
      request
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to schedule processes"
      );
    }
    throw error;
  }
};
