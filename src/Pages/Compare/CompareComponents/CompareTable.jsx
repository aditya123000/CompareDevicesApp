import React from "react";
import { useCompare } from "@/context/CompareContext";

const specs = ["Brand","Display","Processor","Battery","Price","Availability"];
const SPEC_KEY_MAP = {Brand: "brand",Display: "display",Processor: "processor",Battery: "battery",Price: "price",Availability: "available",};

const getSpecValue = (device, spec) => {
  const key = SPEC_KEY_MAP[spec];
  return device[key] ?? "—";
};

const formatSpecValue = (spec, value) => {
  if (value === "—") return value;
  switch (spec) {
    case "Price":
      return `₹${value.toLocaleString("en-IN")}`;

    case "Availability":
      return (
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
            ${
              value
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
        >
          {value ? "Available" : "Out of stock"}
        </span>
      );

    default:
      return value;
  }
};



const CompareTable = () => {
  const { selectedDevices } = useCompare();
  const deviceCount=selectedDevices.length;

  const gridTemplate={gridTemplateColumns:`200px repeat(${deviceCount}, minmax(0, 1fr))`,};

  return (
    <section className="overflow-x-auto">
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="grid border-b border-slate-700 bg-slate-800 sticky top-0 z-20" style={gridTemplate}>
          <div className="p-4 text-slate-400 text-sm uppercase tracking-wide sticky left-0 z-30 bg-slate-800">
            Specifications
          </div>

          {selectedDevices.map((device) => (
            <div
              key={device.id}
              className="p-4 text-slate-100 font-semibold text-center border-l border-slate-700"
            >
              {device.model}
            </div>
          ))}
        </div>

        {/* Spec rows */}
        {specs.map((spec) => (
          <div
            key={spec}
            className="grid border-b border-slate-700 last:border-b-0" style={gridTemplate}
          >
            <div className="p-4 text-slate-400 font-medium bg-slate-900 sticky left-0 z-10">
              {spec}
            </div>

            {selectedDevices.map((device) => (
              <div key={device.id} className="p-4 text-slate-300 text-center border-l border-slate-700">
                {formatSpecValue(spec, getSpecValue(device, spec))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareTable;
