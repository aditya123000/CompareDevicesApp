import React from "react";
import { getSpecValue, normalizeSpecValue } from "./compareUtils";

const CompareCell = ({ device, spec }) => {
  const rawValue = getSpecValue(device, spec);
  const formatted = normalizeSpecValue(spec, rawValue);

  if (formatted.type === "availability") {
    return (
      <div className="p-4 text-center border-l border-slate-700">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
          ${
            formatted.value
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {formatted.value ? "Available" : "Out of stock"}
        </span>
      </div>
    );
  }

  if (formatted.type === "price") {
    return (
      <div className="p-4 text-center border-l border-slate-700">
        ₹{formatted.value.toLocaleString("en-IN")}
      </div>
    );
  }

  return (
    <div className="p-4 text-center border-l border-slate-700">
      {formatted.value}
    </div>
  );
};

export default CompareCell;
