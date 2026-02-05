import React from "react";
import { useCompare } from "@/context/CompareContext";
import { useCompareSpecs } from "./useCompareSpecs";
import CompareHeader from "./CompareHeader";
import CompareRow from "./CompareRow";

const CompareTable = () => {
  const { selectedDevices } = useCompare();
  const specs = useCompareSpecs(selectedDevices);

  if (!selectedDevices.length) {
    return (
      <div className="text-center py-12 text-slate-400">
        Select devices to compare
      </div>
    );
  }

  const gridTemplate = {
    gridTemplateColumns: `200px repeat(${selectedDevices.length}, minmax(0, 1fr))`,
  };

  return (
    <section className="overflow-x-auto">
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <CompareHeader
          devices={selectedDevices}
          gridTemplate={gridTemplate}
        />

        {specs.map((spec) => (
          <CompareRow
            key={spec}
            spec={spec}
            devices={selectedDevices}
            gridTemplate={gridTemplate}
          />
        ))}
      </div>
    </section>
  );
};

export default CompareTable;
