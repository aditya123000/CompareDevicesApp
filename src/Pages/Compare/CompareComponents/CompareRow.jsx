import React from "react";
import CompareCell from "./CompareCell";

const CompareRow = ({ spec, devices, gridTemplate }) => {
  return (
    <div className="grid border-b border-slate-700" style={gridTemplate}>
      <div className="p-4 font-medium bg-slate-900 sticky left-0 z-10">
        {spec}
      </div>

      {devices.map((device) => (
        <CompareCell
          key={device.id}
          device={device}
          spec={spec}
        />
      ))}
    </div>
  );
};

export default CompareRow;
