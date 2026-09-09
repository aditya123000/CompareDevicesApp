import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createComparison, createFavorite, deleteComparison, deleteFavorite, listComparisons, listFavorites } from "../controllers/libraryController.js";
const router = express.Router();
router.use(protect);
router.get("/favorites", listFavorites); router.post("/favorites/:deviceId", createFavorite); router.delete("/favorites/:deviceId", deleteFavorite);
router.get("/comparisons", listComparisons); router.post("/comparisons", createComparison); router.delete("/comparisons/:comparisonId", deleteComparison);
export default router;
