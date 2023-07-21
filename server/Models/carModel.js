import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    rentPerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

// Check if the model is already defined before compiling it
const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);

export default Car;
