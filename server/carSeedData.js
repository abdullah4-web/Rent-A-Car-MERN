import Car from '../Models/carModel.js';

const carSeedData = [
  {
    name: 'Toyota',
    image: 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1688811909/vb2irdt7oxv5pdbjeqt9.png',
    capacity: 4,
    fuelType: 'Petrol',
    bookedTimeSlots: [
      {
        from: '10:00 AM',
        to: '12:00 PM',
      },
      {
        from: '2:00 PM',
        to: '4:00 PM',
      },
    ],
    rentPerHour: 20,
  },
  {
    name: 'Honda Civic',
    image: 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1688811989/twmykvrutuntvbdi95ok.png',
    capacity: 2,
    fuelType: 'Diesel',
    bookedTimeSlots: [
      {
        from: '10:00 AM',
        to: '12:00 PM',
      },
      {
        from: '2:00 PM',
        to: '4:00 PM',
      },
    ],
    rentPerHour: 15,
  },
  {
    name: 'Range Rover',
    image: 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1688812062/joreot8pzwmjgd62at5p.png',
    capacity: 4,
    fuelType: 'Diesel',
    bookedTimeSlots: [
      {
        from: '10:00 AM',
        to: '12:00 PM',
      },
      {
        from: '2:00 PM',
        to: '4:00 PM',
      },
    ],
    rentPerHour: 15,
  },
];

const seedCars = async () => {
  try {
    // Remove existing cars from the database
    await Car.deleteMany();

    // Insert the seed data
    await Car.insertMany(carSeedData);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

export default seedCars;
