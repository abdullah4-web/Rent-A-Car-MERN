import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import Car from '../models/carModel.js'; // Import the Car model

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    // Insert users data
    const createdUsers = await User.insertMany(data.users);

    // Insert cars data
    const createdCars = await Car.insertMany(data.cars);

    res.send({ createdUsers, createdCars });
  } catch (err) {
    res.status(500).send({ error: 'Error seeding the database' });
  }
});

export default seedRouter;
