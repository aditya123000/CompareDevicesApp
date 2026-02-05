
export const SPEC_KEY_MAP = {
  Display: "display",
  RefreshRate: "refreshRate",
  Processor: "processor",
  RAM: "ram",
  Storage: "storage",
  Camera: "camera",
  Battery: "battery",
  Charging: "charging",
  OS: "os",
  Price: "price",
  Availability: "available",
};

export const SPEC_ORDER = [
  "Brand",
  "Display",
  "Processor",
  "Storage",
  "Camera",
  "Battery",
  "Charging",
  "Price",
  "Availability"
];


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
