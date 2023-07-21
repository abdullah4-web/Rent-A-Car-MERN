// addDataToMongo.js

const { MongoClient } = require('mongodb');

const addDataToMongo = async () => {
  const data = [
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

  const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
  const options = { useNewUrlParser: true, useUnifiedTopology: true };

  try {
    const client = await MongoClient.connect(url, options);
    const db = client.db('rentacar'); // Replace with your database name
    const collection = db.collection('cars'); // Replace with your collection name

    const result = await collection.insertMany(data);
    console.log('Data added to the database successfully!');
    client.close();
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
};

addDataToMongo();
