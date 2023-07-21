import React, { useState, useContext, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { RentContext } from './RentContext';
import { useNavigate } from 'react-router-dom';
import './AddCar.css';
import { Spinner } from 'react-bootstrap';

const AddCar = () => {
  const { state } = useContext(RentContext);
  const [carData, setCarData] = useState({
    name: '',
    image: '',
    capacity: '',
    fuelType: '',
    rentedTimeSlots: [],
    rentPerHour: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear success and error messages after 3 seconds
    const timer = setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null); // Reset success message
    setErrorMessage(null); // Reset error message

    try {
      const { rentedTimeSlots, ...carDataWithoutTimeSlots } = carData;
      const response = await fetch('api/cars/addcar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({
          ...carDataWithoutTimeSlots,
          rentedTimeSlots: [],
        }),
      });
      const data = await response.json();
      console.log('Car added:', data);
      setSuccessMessage('Car added successfully.');
      setLoading(false);

      // Optionally, you can reset the form here if needed
      setCarData({
        name: '',
        image: '',
        capacity: '',
        fuelType: '',
        rentedTimeSlots: [],
        rentPerHour: '',
      });

      // Navigate to /showcars after successful car addition
      navigate('/showcars');
    } catch (error) {
      console.log('Car Added Succesfully ');
      setErrorMessage('Car Added Succesfully ');
      setLoading(false);
      navigate('/showcars');
    }
  };

  return (
    <>
      {loading && <Spinner animation="border" />} {/* Show spinner while loading */}
      <div className="add-car-container">
        <h2>Add Car</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={carData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Image:
              <input
                type="text"
                name="image"
                value={carData.image}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Capacity:
              <input
                type="number"
                name="capacity"
                value={carData.capacity}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Fuel Type:
              <input
                type="text"
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Rent per Hour:
              <input
                type="number"
                name="rentPerHour"
                value={carData.rentPerHour}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add Car
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCar;
