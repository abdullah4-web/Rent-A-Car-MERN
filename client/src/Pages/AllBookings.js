import React, { useContext, useEffect, useState } from 'react';
import { RentContext } from './RentContext';
import { Spinner, Table } from 'react-bootstrap';
import './AllBookings.css';

const AllBookings = () => {
  const { state } = useContext(RentContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API with user id
    const fetchBookings = async () => {
      try {
        const userId = state.user?._id;
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/bookings/bookedcarsbyuser/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [state.user]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
    <Spinner />
    <div className="container">
       <h1 className="my-4 text-center">Your Booking History</h1>
      {bookings.length > 0 ? (
        <Table striped responsive>
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Name</th>
              <th>User</th>
              <th>User Email</th>
              <th>Rent per Hour</th>
              <th>Total Amount</th>
              <th>Transaction ID</th>
              <th>Driver Required</th>
              <th>Booked Time Slots</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <img src={booking.car.image} alt={booking.car.name} width="100" height="100" />
                </td>
                <td>{booking.car.name}</td>
                <td>{booking.user.name}</td>
                <td>{booking.user.email}</td>
                <td>{booking.car.rentPerHour}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.transactionId}</td>
                <td>{booking.driverRequired ? 'Yes' : 'No'}</td>
                <td>
                  <ul>
                    <li>From: {new Date(booking.bookedTimeSlots.from).toLocaleString()}</li>
                    <li>To: {new Date(booking.bookedTimeSlots.to).toLocaleString()}</li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="no-bookings-msg">No bookings found.</p>
      )}
    </div>
    </>
  );
};

export default AllBookings;
