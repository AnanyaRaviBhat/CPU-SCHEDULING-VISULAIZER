import React from "react";
import { type AlgorithmType } from "../../types";

interface TableHeaderProps {
  algorithm: AlgorithmType;
}

const TableHeader: React.FC<TableHeaderProps> = ({ algorithm }) => {
  const needsPriority = algorithm === "PRIORITY";

  return (
    <thead>
      <tr className="bg-blue-100">
        <th className="px-4 py-3 text-left text-sm font-semibold text-black w-32">
          Process ID
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-black">
          Arrival Time
        </th>
        <th className="px-4 py-3 text-left text-sm font-semibold text-black">
          Burst Time
        </th>
        {needsPriority && (
          <th className="px-4 py-3 text-left text-sm font-semibold text-black">
            Priority
          </th>
        )}
        <th className="px-4 py-3 text-left text-sm font-semibold text-black w-24">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
