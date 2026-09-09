import { getDeviceById as getDeviceByIdFromDb, getDeviceCatalog } from "../repositories/deviceRepository.js";
import { sanitizeDeviceFilters } from "../repositories/deviceQuery.js";

//Get all devices
const getDevices = async (req, res, next) => {
  try {
    const filters = sanitizeDeviceFilters(req.query);
    const { devices, total } = await getDeviceCatalog(filters);
    return res.status(200).json({
      data: devices,
      meta: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};

//Get device by id
const getDeviceById = async (req, res, next) => {
  try {
    const device = await getDeviceByIdFromDb(req.params.id);

    if (!device) {
      const error = new Error(`Device with id ${req.params.id} not found`);
      error.status = 404;
      return next(error);
    }

    return res.status(200).json(device);
  } catch (error) {
    return next(error);
  }
};

export { getDevices, getDeviceById };
