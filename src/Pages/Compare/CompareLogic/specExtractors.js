import { SPEC_KEY_MAP } from "./specConfig";

export const extractSpecs = (devices) => {
  if (!devices || devices.length === 0) return [];

  return Object.keys(SPEC_KEY_MAP).filter((specLabel) => {
    const deviceKey = SPEC_KEY_MAP[specLabel];

    return devices.some(
      (device) => device[deviceKey] !== undefined
    );
  });
};

export const getSpecValue = (device, spec) => {
  const mappedKey = SPEC_KEY_MAP[spec];
  if (mappedKey && device[mappedKey] !== undefined) {
    return device[mappedKey];
  }

  const key = Object.keys(device).find(
    k => k.toLowerCase() === spec.toLowerCase()
  );

  return key ? device[key] : "—";
};