import React from "react";

const CompareHeader = ({ devices, gridTemplate }) => {
  return (
    <div
      className="grid border-b border-slate-700 bg-slate-800 sticky top-0 z-20"
      style={gridTemplate}
    >
      <div className="p-4 text-slate-400 text-sm uppercase sticky left-0 bg-slate-800 z-30">
        Specifications
      </div>

      {devices.map((device) => (
        <div
          key={device.id}
          className="p-4 text-center font-semibold border-l border-slate-700"
        >
          {device.model || device.name}
        </div>
      ))}
    </div>
  );
};

export default CompareHeader;
