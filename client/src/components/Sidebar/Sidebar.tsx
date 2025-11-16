import React from "react";
import { type AlgorithmType } from "../../types";
import AlgorithmSelector from "./AlgorithmSelector";
import Button from "../common/Button";
import { Play, RotateCcw, Cpu, Plus } from "lucide-react";

interface SidebarProps {
  algorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  quantum: number | string;
  onQuantumChange: (quantum: number | string) => void;
  onRun: () => void;
  onReset: () => void;
  onAddProcess: () => void;
  loading: boolean;
  hasResult: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  algorithm,
  onAlgorithmChange,
  quantum,
  onQuantumChange,
  onAddProcess,
  onRun,
  onReset,
  loading,
}) => {
  return (
    <div className="space-y-6" style={{ fontFamily: "Times New Roman, serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-300">
        <Cpu className="w-8 h-8 text-blue-800" />
        <h2 className="text-2xl font-bold text-blue-800">CPU Scheduler</h2>
      </div>

      {/* Algorithm Selector */}
      <AlgorithmSelector
        algorithm={algorithm}
        onChange={onAlgorithmChange}
        quantum={quantum}
        onQuantumChange={onQuantumChange}
      />

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          onClick={onRun}
          disabled={loading}
          variant="primary"
          fullWidth
          icon={<Play className="w-5 h-5" />}
        >
          {loading ? "Running..." : "Run Scheduler"}
        </Button>
        <Button
          onClick={onAddProcess}
          variant="primary"
          fullWidth
          icon={<Plus className="w-5 h-5" />}
        >
          Add Process
        </Button>

        <Button
          onClick={onReset}
          variant="secondary"
          fullWidth
          icon={<RotateCcw className="w-5 h-5" />}
        >
          Reset
        </Button>
      </div>

      {/* Current Algorithm Info */}
      <div className="pt-4 border-t-2 border-gray-300">
        <div className="text-sm text-gray-700 space-y-2">
          <p className="font-semibold">Current Algorithm:</p>
          <p className="text-blue-800 font-bold text-lg">{algorithm}</p>
          {algorithm === "RR" && (
            <p className="text-gray-600">Quantum: {quantum}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
