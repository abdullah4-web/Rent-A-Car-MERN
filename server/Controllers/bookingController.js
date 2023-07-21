import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import Booking from '../Models/bookingModel.js';
import Car from '../Models/carModel.js';

const stripe = new Stripe('sk_test_51NFsC8KTXQ5TRT44t84DGO6Mr1MQV83913ERz3iq6wecMsi6sa8ppzb0x07DuZvTHbdzMSz4vpoUBJKhkZca4Ut700ExqaziLu');

const bookCar = async (req, res) => {
  const { carId, startTime, endTime, driver, token, userId } = req.body;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    const calculateAmount = () => {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const timeDiff = end - start;
      const hours = Math.ceil(timeDiff / (1000 * 60 * 60));
      let amount = car.rentPerHour * hours;
      if (driver) {
        amount += 50; // Additional charge for driver
      }
      return amount;
    };

    // Verify the payment using the Stripe API
    const paymentResult = await stripe.charges.create({
      amount: calculateAmount() * 100, // Amount in cents
      currency: 'USD',
      source: token.stripeToken,
      metadata: {
        carName: car.name,
        startTime,
        endTime,
        phoneNumber: token.phone, // Include the phone number in the metadata
      },
    });

    if (paymentResult.status !== 'succeeded') {
      throw new Error('Payment failed');
    }

    const newBooking = new Booking({
      car: carId,
      user: userId,
      bookedTimeSlots: {
        from: startTime,
        to: endTime,
      },
      totalMins: Math.ceil((new Date(endTime) - new Date(startTime)) / (1000 * 60)),
      totalAmount: calculateAmount(),
      transactionId: paymentResult.id,
      driverRequired: driver,
      address: '', // Set the address as per your requirements
    });

    await newBooking.save();

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      {
        $push: {
          bookedTimeSlots: {
            startTime: startTime,
            endTime: endTime,
            driver: driver,
          },
        },
      },
      { new: true }
    );

    res.json({ status: 'succeeded', car: updatedCar });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 'incomplete', error: 'Booking failed' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: 'car',
      select: 'name image',
    }).populate({
      path: 'user',
      select: 'name email',
    });
    res.json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Failed to fetch bookings' });
  }
};

const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the userId from the request params

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch bookings based on the user ID and populate car and user fields
    const bookings = await Booking.find({ user: userId }).populate({
      path: 'car',
      select: 'name image rentPerHour',
    }).populate({
      path: 'user',
      select: 'name email',
    });

    res.json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Failed to fetch user bookings' });
  }
};







export { bookCar, getAllBookings  , getBookingsByUser};
