import mongoose from "mongoose";

const seedSchema = mongoose.Schema(
  {
    carCategory: {
      type: [String],
      required: true,
    },
    company: {
      type: [String],
      required: true,
    },
    carName: {
      type: [String],
      required: true,
    },
    modelYear: {
      type: [Number],
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    engineCC: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: { createdAt: 'registeredAt', updatedAt: 'updatedAt' } }
);

const Seed = mongoose.model("Seed", seedSchema);

export default Seed;
