import express from 'express';
import { bookCar, getAllBookings, getBookingsByUser } from '../Controllers/bookingController.js';
import { isAuth , isAdmin } from '../utils.js';

const router = express.Router();

router.post('/bookcar', bookCar);
router.get('/bookedcars', isAuth, isAdmin ,getAllBookings);
router.get('/bookedcarsbyuser/:userId', isAuth ,getBookingsByUser); // Updated route to include the user ID as a parameter

export default router;
