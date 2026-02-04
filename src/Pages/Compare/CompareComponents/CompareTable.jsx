import React from "react";
import { useCompare } from "@/context/CompareContext";

const CompareTable = () => {
  const { selectedDevices } = useCompare();
  console.log(selectedDevices);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">
        Selected Devices
      </h2>

      <div className="flex gap-4">
        {selectedDevices.map((device) => (
          <div key={device.id} className="p-4 rounded-lg bg-slate-800 text-slate-100">
            {device.model}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareTable;
