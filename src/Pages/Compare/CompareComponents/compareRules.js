export const COMPARE_RULES = {
  Price: { type: "number", better: "lower" },
  Battery: { type: "number", better: "higher" },
  RefreshRate: { type: "number", better: "higher" },
  Storage: { type: "number", better: "higher" },
  RAM: { type: "number", better: "higher" },

  Processor: { type: "text" },
  Camera: { type: "text" },
  Display: { type: "text" },
  Charging: { type: "text" },
  OS: { type: "text" },

  Availability: { type: "status" }
};
