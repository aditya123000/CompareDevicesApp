export const getAllDevices = async () => {
  const res = await fetch("/api/devices");
  return res.json();
};

export const getDeviceById = async (id) => {
console.log("Fetching device with id:", id);
  const res = await fetch(`/api/devices/${id}`);
  console.log("Response status:", res.status);
  if (!res.ok) return null;
  const data = await res.json();
  console.log("Fetched device:", data);
  return data;
};
