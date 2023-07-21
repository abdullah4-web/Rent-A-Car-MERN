import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import './ProductDetails.css';
import { RentContext } from './RentContext';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import Spinner from '../components/Spinner';

const Booking = ({ from, to }) => {
  const { state } = useContext(RentContext);
  const [car, setCar] = useState(null);
  const [startTime, setStartTime] = useState(from || '');
  const [endTime, setEndTime] = useState(to || '');
  const [driver, setDriver] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { id } = useParams();
  const userId = state.user?._id;
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // Get the from and to dates from the URL parameters
  const params = new URLSearchParams(location.search);
  const fromParam = params.get('from');
  const toParam = params.get('to');

  // Set the from and to dates in the state
  useEffect(() => {
    if (fromParam && toParam) {
      setStartTime(fromParam);
      setEndTime(toParam);
    }
  }, [fromParam, toParam]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/getcar/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCar();
  }, [id]);

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleDriverChange = (e) => {
    setDriver(e.target.checked);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const calculateAmount = () => {
    if (!car || !startTime || !endTime) {
      return 0;
    }

    const start = moment(startTime);
    const end = moment(endTime);
    const timeDiff = end.diff(start, 'hours');
    let amount = car.rentPerHour * timeDiff;
    if (driver) {
      amount += 50; // Additional charge for driver
    }
    return amount;
  };
const handleBooking = async (token) => {
  try {
    setLoading(true);
    if (!token || !token.id) {
      throw new Error('Payment method not entered');
    }

    const amount = calculateAmount();

    if (calculateAmount() <= 0) {
      navigate('/vehicles'); // Navigate to '/vehicles' if amount is less than or equal to 0
      return;
    }

    // The rest of the booking process remains unchanged
    const bookingPayload = {
      totalAmount: amount,
      carId: id,
      userId,
      startTime,
      endTime,
      driver,
      token: {
        phone: phoneNumber,
        stripeToken: token.id,
      },
    };

    const response = await fetch('/api/bookings/bookcar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingPayload),
    });
    setLoading(false);
    if (!response.ok) {
      throw new Error('Payment failed');
    }

    const data = await response.json();

    if (data.status === 'succeeded') {
      setSuccess(true); // Set success state to true if booking is successful
      setLoading(false);
      navigate('/allbookings');

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      console.log('Booking status:', data.status);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};



  if (!car) {
    return <Spinner />;
  }

  const { name, image, capacity, fuelType, rentPerHour } = car;

  return (
    <>
     {loading ? ( // Show a loading message during booking process
        <div className="container py-4 my-4 mx-auto text-center">
          <h2>Booking in progress...</h2>
          <Spinner />
        </div>
      ) : (
        <div className="container py-4 my-4 mx-auto d-flex flex-column">
          {success && (
            // Show a Bootstrap alert with a success message after successful booking
            <div className="alert alert-success" role="alert">
              Booking successful! Your vehicle is reserved.
            </div>
          )}
<div className="container py-4 my-4 mx-auto d-flex flex-column">
  <div className="product-header">
    <div className="row r1">
      <h1 className="text-center">Book Your Vehicle</h1>
    </div>
  </div>
  <div className="product-info mt-4">
    <div className="row r3">
      <div className="col-md-7">
        <img src={image} alt={name} width="90%" height="95%" />
      </div>
      <div className="col-md-5 p-0 product-details">
        <ul>
          <h1 className="text-left">{name}</h1>
          <li>100% Ready To Drive</li>
          <li>Capacity: {capacity}</li>
          <li>Fuel Type: {fuelType}</li>
          <li>
            <label>From:</label>
            <span>{moment(startTime).format('MMM DD YYYY h:mm A')}</span>
          </li>
          <li>
            <label>To:</label>
            <span>{moment(endTime).format('MMM DD YYYY h:mm A')}</span>
          </li>
          <li>
          <label>Driver Required </label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={driver}
                onChange={handleDriverChange}
              />
             
            </div>
          </li>
          <li>
            <label htmlFor="phoneNumberInput">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumberInput"
              className="form-control"
              value={phoneNumber}
              placeholder='Enter Phone Number'
              onChange={handlePhoneNumberChange}
            />
          </li>
          <li>Amount: ${calculateAmount()}</li>
          <li>
            <StripeCheckout
              token={handleBooking}
              stripeKey="pk_test_51NFsC8KTXQ5TRT44AwVQKjEFqFoQCDswXmGQQXclOr9SVgXkCPAp9HRE4IaKMXIgg21aTv2tjdgDG0PqXp0KvOss00pQm6aiPm"
              amount={calculateAmount() * 100}
              currency="USD"
              billingAddressCollection="required"
              billingAddress
              name={name}
              description={`Booking from ${startTime} to ${endTime}`}
              metadata={{
                carName: name,
                startTime,
                endTime,
                phoneNumber,
              }}
            >
              <button
                type="button"
                className="btn btn-outline-warning book-button"
              >
                Book Now
              </button>
            </StripeCheckout>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

</div>
      )}
    </>
  );
};

export default Booking;