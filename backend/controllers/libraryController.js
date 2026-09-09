import { getDeviceById } from "../repositories/deviceRepository.js";
import { addFavorite, getFavorites, getSavedComparisons, removeFavorite, removeSavedComparison, saveComparison } from "../repositories/libraryRepository.js";

const listFavorites = async (req, res, next) => { try { res.json({ data: await getFavorites(req.user.id) }); } catch (error) { next(error); } };
const createFavorite = async (req, res, next) => { try { if (!await getDeviceById(req.params.deviceId)) { const error = new Error("Device not found"); error.status = 404; throw error; } await addFavorite(req.user.id, req.params.deviceId); res.status(201).json({ message: "Saved to your library" }); } catch (error) { next(error); } };
const deleteFavorite = async (req, res, next) => { try { await removeFavorite(req.user.id, req.params.deviceId); res.status(204).end(); } catch (error) { next(error); } };
const listComparisons = async (req, res, next) => { try { res.json({ data: await getSavedComparisons(req.user.id) }); } catch (error) { next(error); } };
const createComparison = async (req, res, next) => { try { const name = String(req.body?.name ?? "Untitled comparison").trim().slice(0, 80) || "Untitled comparison"; const deviceIds = Array.isArray(req.body?.deviceIds) ? [...new Set(req.body.deviceIds.map(String))].slice(0, 3) : []; if (deviceIds.length < 2) { const error = new Error("Save at least two devices to a comparison"); error.status = 400; throw error; } res.status(201).json({ data: await saveComparison(req.user.id, name, deviceIds) }); } catch (error) { next(error); } };
const deleteComparison = async (req, res, next) => { try { await removeSavedComparison(req.user.id, req.params.comparisonId); res.status(204).end(); } catch (error) { next(error); } };
export { createComparison, createFavorite, deleteComparison, deleteFavorite, listComparisons, listFavorites };
