export const extractNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string"){
    const num = value.replace(/[^0-9.]/g, "");
    return num ? Number(num) : null;
  } return null;

  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
};