import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalMins: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    driverRequired: { type: Boolean },
    address: { type: String },
  },
  { timestamps: true }
);

const Booking = model('Booking', bookingSchema);

export default Booking;
