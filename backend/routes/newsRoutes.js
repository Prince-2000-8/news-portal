import express from "express";
import {
  getTopNews,
  getAllNews,
  getNewsById,
  getMyNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/top", getTopNews);
router.get("/mynews", protect, getMyNews);
router.get("/", getAllNews);
router.post("/", protect, createNews);
router.get("/:id", getNewsById);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

export default router;
