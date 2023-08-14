import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    picture: {
      type: String, // You can store a link to the picture here
    },
    carCategory: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
    },
    engineCC: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: 'registeredAt', updatedAt: 'updatedAt' } }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
