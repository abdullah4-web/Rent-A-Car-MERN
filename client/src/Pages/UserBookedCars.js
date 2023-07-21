import React, { useEffect, useState , useContext} from 'react';
import './BookedCars.css';
import { RentContext } from './RentContext';
import { Spinner } from 'react-bootstrap';

const UserBookedCars = () => {
  const [bookedCars, setBookedCars] = useState([]);
  const { state } = useContext(RentContext);
  

  useEffect(() => {
    const fetchBookedCars = async () => {
      try {
        const response = await fetch('/api/bookings/bookedcars', {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch booked cars data');
        }
        const data = await response.json();
        setBookedCars(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookedCars();
  }, [state.user.token]);

  return (
    <>
      <Spinner />
      <div className="booked-cars-container">
        <h1 className="title">Your Booked Cars History</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Image</th>
                <th>Car Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Transaction ID</th>
                <th>Total Minutes</th>
                <th>Total Amount</th>
                <th>Driver Required</th>
                <th>User Name</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody>
              {bookedCars.map((car) => (
                <tr key={car._id}>
                  <td>
                    {car.car && car.car.image && (
                      <img className="car-image" src={car.car.image} alt={car.car.name} />
                    )}
                  </td>
                  <td>{car.car && car.car.name}</td>
                  <td>{car.bookedTimeSlots && car.bookedTimeSlots.from}</td>
                  <td>{car.bookedTimeSlots && car.bookedTimeSlots.to}</td>
                  <td>{car.transactionId}</td>
                  <td>{car.totalMins}</td>
                  <td>{car.totalAmount}</td>
                  <td>{car.driverRequired ? 'Yes' : 'No'}</td>
                  <td>{car.user && car.user.name}</td>
                  <td>{car.user && car.user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserBookedCars;
