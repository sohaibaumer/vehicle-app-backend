import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModel.js"; // Import the Vehicle model

// @desc    Get all vehicles
// route    GET /api/vehicles
// @access  Public
const getAllVehicles = asyncHandler(async (req, res, next) => {
  const vehicles = await Vehicle.find({});
  res.status(200).json(vehicles);
});

// @desc    Add a new vehicle
// route    POST /api/vehicles
// @access  Private
const addVehicle = asyncHandler(async (req, res, next) => {
  
  const {
    picture,
    category,
    company,
    name,
    modelYear,
    color,
    licensePlate,
    cc,
    carCategory,
    carName,
    engineCC
  } = req.body.carData;


  const vehicle = await Vehicle.create({
    picture: picture??'',
    carCategory: category??carCategory,
    company: company,
    carName: name??carName,
    modelYear: modelYear,
    color: color,
    licensePlate: licensePlate??'',
    engineCC:cc??engineCC,
  });

  if (vehicle) {
    res.status(201).json(vehicle);
  } else {
    res.status(400);
    throw new Error("Invalid vehicle data");
  }
});

// @desc    Delete a vehicle by ID
// route    DELETE /api/vehicles/:id
// @access  Private
const deleteVehicle = asyncHandler(async (req, res, next) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
  
      if (vehicle) {
        await vehicle.deleteOne();
        res.status(200).json({ message: "Vehicle removed" });
      } else {
        res.status(404);
        throw new Error("Vehicle not found");
      }
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  });
// @desc    Update a vehicle by ID
// route    PUT /api/vehicles/:id
// @access  Private
const updateVehicle = asyncHandler(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (vehicle) {
    vehicle.picture = req.body.picture || vehicle.picture;
    vehicle.carCategory = req.body.carCategory || vehicle.carCategory;
    vehicle.company = req.body.company || vehicle.company;
    vehicle.carName = req.body.carName || vehicle.carName;
    vehicle.modelYear = req.body.modelYear || vehicle.modelYear;
    vehicle.color = req.body.color || vehicle.color;
    vehicle.licensePlate = req.body.licensePlate || vehicle.licensePlate;
    vehicle.engineCC = req.body.engineCC || vehicle.engineCC;

    const updatedVehicle = await vehicle.save();
    res.status(200).json(updatedVehicle);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

export { getAllVehicles, addVehicle, deleteVehicle, updateVehicle };
