import express from "express";
import {
  getAllVehicles,
  addVehicle,
  deleteVehicle,
  updateVehicle,
} from "../controllers/vehicleController.js"; // Import the vehicle controllers
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for getting all vehicles // Route for adding a new vehicle

router.route("/").get(protect, getAllVehicles).post(protect, addVehicle);

// Route for deleting a vehicle by ID // Route for updating a vehicle by ID

router.route("/:id").delete(protect, deleteVehicle).put(protect, updateVehicle);

export default router;
