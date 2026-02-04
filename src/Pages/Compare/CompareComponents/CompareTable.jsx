import React from "react";
import { useCompare } from "@/context/CompareContext";

const specs = ["Brand","Display","Processor","Battery","Price"];
const SPEC_KEY_MAP = {Brand: "brand",Display: "display",Processor: "processor",Battery: "battery",Price: "price",};

const getSpecValue = (device, spec) => {
  const key = SPEC_KEY_MAP[spec];
  return device[key] ?? "—";
};


const CompareTable = () => {
  const { selectedDevices } = useCompare();
  const deviceCount=selectedDevices.length;

  const gridTemplate={gridTemplateColumns:`200px repeat(${deviceCount}, minmax(0, 1fr))`,};

  return (
    <section className="overflow-x-auto">
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="grid border-b border-slate-700 bg-slate-800" style={gridTemplate}>
          <div className="p-4 text-slate-400 text-sm uppercase tracking-wide">
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
            <div className="p-4 text-slate-400 font-medium bg-slate-900">
              {spec}
            </div>

            {selectedDevices.map((device) => (
              <div key={device.id} className="p-4 text-slate-300 text-center border-l border-slate-700">
                {getSpecValue(device, spec)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareTable;
