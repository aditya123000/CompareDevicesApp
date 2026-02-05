import React from "react";
import { getSpecValue, normalizeSpecValue } from "./compareUtils";

const CompareCell = ({ device, spec, isBest }) => {
  const rawValue = getSpecValue(device, spec);
  const formatted = normalizeSpecValue(spec, rawValue);

  const baseClass ="p-4 text-center border-l border-slate-700 transition";
  const emphasisClass = isBest
    ? "bg-emerald-500/10 text-emerald-300 font-semibold"
    : "text-slate-400";

  if (formatted.type === "availability") {
    return (
      <div className={`${baseClass} ${emphasisClass}`}>
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
    <div className={`${baseClass} ${emphasisClass}`}>
      {formatted.value}
    </div>
  );
};

export default CompareCell;
