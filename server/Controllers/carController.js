import Car from '../Models/carModel.js';

export const getAllcars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const addCar = async (req, res) => {
  try {
    const newcar = new Car(req.body);
    await newcar.save();
    res.send('Car added successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const editCar = async (req, res) => {
  try {
    const carId = req.params.carId; // Access carId from URL parameter
    const car = await Car.findOne({ _id: carId });
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;

    await car.save();

    res.send('Car details updated successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
};


export const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params;

    await Car.findByIdAndRemove(carId);

    res.send('Car deleted successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getCarById = async (req, res) => {
  try {
    const carId = req.params.carId; // Extract carId from URL parameter
    const car = await Car.findById(carId); // Fetch the car data using carId

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car); // Send the car data as JSON response
  } catch (error) {
    console.error('Error fetching car data:', error);
    res.status(500).json({ error: 'Failed to fetch car data' });
  }
};
