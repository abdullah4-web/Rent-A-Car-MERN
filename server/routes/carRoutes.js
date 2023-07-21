import express from 'express';
import { getAllcars, addCar, editCar, deleteCar, getCarById } from '../Controllers/carController.js';
import { isAdmin, isAuth } from '../utils.js';

const carRouter = express.Router();

carRouter.get('/getallcars', getAllcars);
carRouter.post('/addcar',isAuth, isAdmin, addCar);
carRouter.get('/getcar/:carId', getCarById);
carRouter.put('/editcar/:carId', isAuth, isAdmin, editCar);
carRouter.delete('/deletecar/:carId', isAuth, isAdmin, deleteCar); // Use the DELETE method

export default carRouter;
