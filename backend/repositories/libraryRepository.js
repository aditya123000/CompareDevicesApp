import crypto from "crypto";
import { query } from "../config/db.js";
import { normalizeDevice } from "../utils/normalizeDevice.js";

const getFavorites = async (userId) => {
  const { rows } = await query("SELECT d.*, f.created_at AS saved_at FROM user_favorites f JOIN devices d ON d.id = f.device_id WHERE f.user_id = $1 ORDER BY f.created_at DESC", [userId]);
  return rows.map(({ payload, saved_at, ...row }) => ({ ...normalizeDevice({ ...row, ...payload }), savedAt: saved_at }));
};
const addFavorite = (userId, deviceId) => query("INSERT INTO user_favorites (user_id, device_id) VALUES ($1, $2) ON CONFLICT (user_id, device_id) DO NOTHING", [userId, String(deviceId)]);
const removeFavorite = (userId, deviceId) => query("DELETE FROM user_favorites WHERE user_id = $1 AND device_id = $2", [userId, String(deviceId)]);
const getSavedComparisons = async (userId) => {
  const { rows } = await query("SELECT id, name, device_ids, created_at FROM saved_comparisons WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
  return rows.map((row) => ({ id: row.id, name: row.name, deviceIds: row.device_ids, createdAt: row.created_at }));
};
const saveComparison = async (userId, name, deviceIds) => {
  const { rows } = await query("INSERT INTO saved_comparisons (id, user_id, name, device_ids) VALUES ($1, $2, $3, $4::jsonb) RETURNING id, name, device_ids, created_at", [crypto.randomUUID(), userId, name, JSON.stringify(deviceIds)]);
  const row = rows[0]; return { id: row.id, name: row.name, deviceIds: row.device_ids, createdAt: row.created_at };
};
const removeSavedComparison = (userId, comparisonId) => query("DELETE FROM saved_comparisons WHERE user_id = $1 AND id = $2", [userId, comparisonId]);
export { addFavorite, getFavorites, getSavedComparisons, removeFavorite, removeSavedComparison, saveComparison };
