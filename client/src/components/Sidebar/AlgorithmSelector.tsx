import React from "react";
import { type AlgorithmType } from "../../types";
import Input from "../common/Input";

interface AlgorithmSelectorProps {
  algorithm: AlgorithmType;
  onChange: (algorithm: AlgorithmType) => void;
  quantum: number | string;
  onQuantumChange: (quantum: number | string) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithm,
  onChange,
  quantum,
  onQuantumChange,
}) => {
  const handleQuantumChange = (value: string) => {
    onQuantumChange(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-blue-800 mb-2">
          Select Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => onChange(e.target.value as AlgorithmType)}
          className="w-full px-4 py-3 border-2 border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-black hover:bg-blue-50 transition-all"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          <option value="FCFS">First Come First Serve (FCFS)</option>
          <option value="SJF">Shortest Job First (SJF)</option>
          <option value="RR">Round Robin (RR)</option>
          <option value="PRIORITY">Priority Scheduling</option>
        </select>
      </div>

      {algorithm === "RR" && (
        <div>
          <label className="block text-sm font-semibold text-blue-800 mb-2">
            Time Quantum
          </label>
          <Input
            type="number"
            value={quantum}
            onChange={handleQuantumChange}
            placeholder=""
          />
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector;
