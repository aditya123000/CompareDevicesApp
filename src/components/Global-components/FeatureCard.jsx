import React from "react";

const FeatureCard = ({ title, description }) => {
  return (
    <div className="p-6 rounded-lg bg-slate-800 border border-slate-700 text-center">
      <h3 className="font-semibold text-sky-400">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-300">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
