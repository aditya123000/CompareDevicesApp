export const getDevices = async () => {
  const response = await fetch("/api/devices");

  if (!response.ok) {
    throw new Error("Failed to fetch devices");
  }

  return response.json();
};
