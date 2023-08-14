import asyncHandler from "express-async-handler";
import Seed from "../models/seedModel.js"; // Import the Seed model

// @desc    Get all seeds
// @route   GET /api/seeds
// @access  Public
const getAllSeeds = asyncHandler(async (req, res, next) => {
  const seeds = await Seed.find({});
  res.status(200).json(seeds);
});

export { getAllSeeds };
