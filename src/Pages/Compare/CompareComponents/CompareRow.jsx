import React from "react";
import CompareCell from "./CompareCell";
import { getBestIndices } from "./getBestIndices";
import { getSpecValue } from "./compareUtils";

const CompareRow = ({ spec, devices, gridTemplate }) => {
  const values = devices.map((device) =>
    getSpecValue(device, spec)
  );
  const rawValues = devices.map((d) => d);

  const bestIndices = getBestIndices(spec, values);

  return (
    <div className="grid border-b border-slate-700" style={gridTemplate}>
      <div className="p-4 font-medium bg-slate-900 sticky left-0 z-10">
        {spec}
      </div>

      {devices.map((device,index) => (
        <CompareCell
          key={device.id}
          device={device}
          spec={spec}
          isBest={bestIndices.includes(index)}
        />
      ))}
    </div>
  );
};

export default CompareRow;
