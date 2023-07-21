import mongoose from 'mongoose';
import seedCars from './carSeedData.js';
import Car from './Models/carModel.js';

mongoose
  .connect('mongodb://localhost:27017/rentacar', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to the database');

    // Remove existing cars from the database
    await Car.deleteMany();

    // Insert the seed data
    await Car.insertMany(seedCars);

    console.log('Seed data inserted successfully');

    // Close the database connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
