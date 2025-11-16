import React from "react";
import { Trash2 } from "lucide-react";
import { type Process, type AlgorithmType } from "../../types";
import Input from "../common/Input";

interface ProcessRowProps {
  process: Process;
  index: number;
  algorithm: AlgorithmType;
  onUpdate: (
    index: number,
    field: keyof Process,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const ProcessRow: React.FC<ProcessRowProps> = ({
  process,
  index,
  algorithm,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  const needsPriority = algorithm === "PRIORITY";

  const handleArrivalChange = (value: string) => {
    onUpdate(index, "arrival", value);
  };

  const handleBurstChange = (value: string) => {
    onUpdate(index, "burst", value);
  };

  const handlePriorityChange = (value: string) => {
    onUpdate(index, "priority", value);
  };

  return (
    <tr className="hover:bg-blue-100 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center">
          <span className="font-semibold text-black bg-blue-100 px-3 py-2 rounded-lg border border-blue-300">
            {process.pid}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <Input
          type="number"
          value={process.arrival}
          onChange={handleArrivalChange}
          min={0}
          placeholder=""
        />
      </td>
      <td className="px-4 py-3">
        <Input
          type="number"
          value={process.burst}
          onChange={handleBurstChange}
          min={1}
          placeholder=""
        />
      </td>
      {needsPriority && (
        <td className="px-4 py-3">
          <Input
            type="number"
            value={process.priority || ""} // CHANGE: Use empty string instead of 0
            onChange={handlePriorityChange}
            min={0}
            placeholder=""
          />
        </td>
      )}
      <td className="px-4 py-3">
        <button
          onClick={() => onRemove(index)}
          disabled={!canRemove}
          className="text-red-300 hover:text-red-100 hover:bg-red-500/20 p-2 rounded-lg transition-all disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title={canRemove ? "Remove process" : "At least one process required"}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default ProcessRow;
