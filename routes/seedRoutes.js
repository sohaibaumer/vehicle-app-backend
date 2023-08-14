import express from "express";
import { getAllSeeds } from "../controllers/seedController.js"; // Import the seed controller
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for getting all seeds
router.route('/').get(protect, getAllSeeds);

export default router;
