export const normalizeSpecValue = (spec, value) => {
  if (value === "—") return { type: "text", value };

  if (
    spec.toLowerCase() === "availability" ||
    spec.toLowerCase() === "available"
  ) {
    return {
      type: "availability",
      value: Boolean(value),
    };
  }

  if (spec.toLowerCase() === "price") {
    return {
      type: "price",
      value: Number(value),
    };
  }

  return { type: "text", value };
};