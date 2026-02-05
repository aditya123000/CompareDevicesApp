import { COMPARE_RULES } from "./compareRules";
import { extractNumber } from "./compareUtils";

export const getBestIndices = (spec, values) => {
  const rule = COMPARE_RULES[spec];

  if (!rule) return [];

  if (rule.type === "status" || rule.type === "text") {
    return [];
  }

  if (rule.type === "number") {
    const numericValues = values.map(extractNumber);

    if (numericValues.every((v) => v === null)) {
      return [];
    }

    const bestValue =
      rule.better === "higher"
        ? Math.max(...numericValues)
        : Math.min(...numericValues);

    return numericValues
      .map((v, i) => (v === bestValue ? i : null))
      .filter((i) => i !== null);
  }

  return [];
};