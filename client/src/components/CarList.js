import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RentContext } from '../Pages/RentContext';
import { Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './CarList.css';

import Spinner from './Spinner';
import SearchSection from './SearchSection';

const CarList = () => {
  const { state, setTotalCars } = useContext(RentContext);
  const { cars, totalCars } = state;
  const [selectedTimeRange, setSelectedTimeRange] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const [from, to] = selectedTimeRange;
  const [bookingDates, setBookingDates] = useState({ from: null, to: null }); // Move this to the top

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      setTotalCars(cars);
    }
  }, [cars]);

  useEffect(() => {
    console.log("Cars data from RentContext:", cars);
  }, [cars]);

  const setFilter = (values) => {
    setSelectedTimeRange(values);
    filterCars(values);

    // Store the selected from and to dates in the state
    setBookingDates({
      from: values[0],
      to: values[1],
    });
  };

  const filterCars = async (values) => {
    if (values && values[0] && values[1]) {
      const selectedFrom = moment(values[0]);
      const selectedTo = moment(values[1]);
  
      // Fetch all bookings from the server
      const response = await fetch('/api/bookings/bookedcars');
      const bookings = await response.json();
  
      // Filter out cars that have bookings overlapping with the selected time range
      const availableCars = cars.filter((car) => {
        const carBookings = bookings.filter((booking) => booking.car._id === car._id);
  
        if (carBookings.length === 0) {
          return true; // Car has no bookings, it's available for the entire time range
        }
  
        // Check if the selected time range overlaps with any car bookings
        const isAvailable = carBookings.every((booking) => {
          const bookingStart = moment(booking.bookedTimeSlots.from);
          const bookingEnd = moment(booking.bookedTimeSlots.to);
  
          return (
            selectedTo.isSameOrBefore(bookingStart, 'minute') || // No overlap before the booking start
            selectedFrom.isSameOrAfter(bookingEnd, 'minute')    // No overlap after the booking end
          );
        });
  
        return isAvailable;
      });
  
      setTotalCars(availableCars);
    } else {
      setTotalCars(cars);
    }
  };
  
  if (loading) {
    return <Spinner />;
  }
  const currentDate = new Date();

  // Set the current time as the minimum time for the "From" DatePicker
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const minTimeForFrom = moment(currentDate).set({ hour: currentHour, minute: currentMinute });

  // Set the current time as the maximum time for the "To" DatePicker
  const maxTimeForTo = moment(currentDate).set({ hour: 23, minute: 59 });

  return (
    <>
    <SearchSection />
    <div className="gallery_section layout_padding">
      <div className="container">
        <h2 className="Main-heading-home">
          Please Select a<span className="ml-2 mr-2"> Time Range</span> For Booking 🚗
        </h2>
        <Col lg={20} sm={24} className="d-flex justify-content-center ">
        <DatePicker
              selected={from}
              onChange={(date) => setFilter([date, to])}
              showTimeSelect
              dateFormat="MMM dd yyyy h:mm aa"
              placeholderText="From"
              className="form-control"
              minDate={currentDate} // Set minDate to the current date
              minTime={minTimeForFrom} // Set minTime to the current time
              maxTime={maxTimeForTo} // Set maxTime to the maximum time for the "From" DatePicker
            />
            <DatePicker
              selected={to}
              onChange={(date) => setFilter([from, date])}
              showTimeSelect
              dateFormat="MMM dd yyyy h:mm aa"
              placeholderText="To"
              className="form-control ml-2"
              minDate={from} // Set minDate to the selected "From" date
              minTime={from} // Set minTime to the selected "From" date
              maxTime={maxTimeForTo} // Set maxTime to the maximum time for the "To" DatePicker
            />
        </Col>

        {from &&
          to &&
          Array.isArray(totalCars) &&
          totalCars.length > 0 ? (
          <div className="gallery_section layout_padding">
            <div className="container">
              <h3 className="gallery_taital">Available Cars For You </h3>
              <div className="row gallery_section_2">
                {totalCars.map((car) => (
                  <div className="col-md-4" key={car._id}>
                    <div className="gallery_box">
                      <div className="gallery_img">
                        <img src={car.image} alt={car.name} />
                      </div>
                      <div className="car_details">
                        <h3 className="types_text">{car.name}</h3>
                        <p className="looking_text">Capacity: {car.capacity}</p>
                        <p className="looking_text">Fuel Type: {car.fuelType}</p>
                        <p className="looking_text">Rent per Hour: ${car.rentPerHour}</p>
                      </div>
                      <div className="read_bt">
                      <Link
                            to={`/booking/${car._id}?from=${bookingDates.from}&to=${bookingDates.to}`}
                          >
                            Book Now
                          </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="nocar">
           Sorry No  Cars available At <span className="ml-2 mr-2 mt-30"> Time Range</span> For Booking 
        </h2>
        )}
      </div>
    </div>
    </>
  );
};

export default CarList;
