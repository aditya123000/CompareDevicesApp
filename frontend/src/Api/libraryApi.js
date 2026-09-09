import { getApiUrl } from "./apiBase.js";
const request = async (path, token, options = {}) => {
  const response = await fetch(getApiUrl(`/api/library${path}`), { ...options, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers } });
  if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.message || "Library request failed"); }
  return response.status === 204 ? null : response.json();
};
export const getLibrary = async (token) => { const [favorites, comparisons] = await Promise.all([request("/favorites", token), request("/comparisons", token)]); return { favorites: favorites.data, comparisons: comparisons.data }; };
export const removeFavorite = (id, token) => request(`/favorites/${id}`, token, { method: "DELETE" });
export const addFavorite = (id, token) => request(`/favorites/${id}`, token, { method: "POST" });
export const removeComparison = (id, token) => request(`/comparisons/${id}`, token, { method: "DELETE" });
export const saveComparison = (payload, token) => request("/comparisons", token, { method: "POST", body: JSON.stringify(payload) });
