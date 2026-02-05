import { COMPARE_RULES } from "./compareRules";
import { extractNumber } from "./compareUtils";

export const getBestIndices = (spec, values) => {
  const rule = COMPARE_RULES[spec];
  if (!rule || rule.type === "text") return [];

  if (rule.type === "boolean") {
    return values
      .map((v, i) => (v === true ? i : null))
      .filter((i) => i !== null);
  }

  const numericValues = values.map(extractNumber).filter(v => v !== null);
  if (numericValues.length === 0) return [];

  const bestValue =
    rule.better === "higher"
      ? Math.max(...numericValues)
      : Math.min(...numericValues);

  return numericValues
    .map((v, i) => (v === bestValue ? i : null))
    .filter((i) => i !== null);
};
