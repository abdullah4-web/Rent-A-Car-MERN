import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container, Table, Button, Modal, Form, SplitButton } from 'react-bootstrap'; // Import React Bootstrap components
import Spinner from '../components/Spinner';
import { RentContext } from './RentContext';

const ShowCars = () => {
  const [cars, setCars] = useState([]);
  const [editCarId, setEditCarId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(RentContext);
  const { user } = state;


  // State to manage the modal visibility
  const [showEditModal, setShowEditModal] = useState(false);

  // State to manage car edit form fields
  const [carData, setCarData] = useState({
    name: '',
    image: '',
    capacity: '',
    fuelType: '',
    rentPerHour: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Include the token in the headers of the API request
      const response = await axios.get('/api/cars/getallcars', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCars(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleEditCar = (carId) => {
    setEditCarId(carId);
    // Fetch car data by carId and populate the form
    fetchCarData(carId);
    // Show the modal when "Edit" button is clicked
    setShowEditModal(true);
  };

  const fetchCarData = async (carId) => {
    try {
      const response = await fetch(`/api/cars/getcar/${carId}`);
      const data = await response.json();
      setCarData(data);
    } catch (error) {
      console.log('Error fetching car data:', error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      // Include the token in the headers of the API request
      await axios.delete(`/api/cars/deletecar/${carId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCars(cars.filter((car) => car._id !== carId));
    } catch (error) {
      console.log('Error deleting car:', error);
    }
  };

  // Function to hide the modal
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditCarId(null); // Reset the carId when the modal is closed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include the token in the headers of the API request
      await axios.put(`/api/cars/editcar/${editCarId}`, carData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Refresh the car data after update
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.log('Error updating car:', error);
    }
  };

  return (
    <>
    <SplitButton />
       <Container>
        <h1>Admin Dashboard</h1>
        {loading ? (
          <Spinner />
        ) : (
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Booked Time Slots</th>
                <th>Rent per Hour</th>
                <th>Actions</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={car.image}
                      alt={car.name}
                      className="img-fluid rounded"
                      style={{ maxWidth: '50px' }}
                    />
                  </td>
                  <td>{car.name}</td>
                  <td>
                    <ul>
                      {car.bookedTimeSlots.map((timeSlot) => (
                        <li key={timeSlot._id}>
                          {moment(timeSlot.from).format('LLL')} - {moment(timeSlot.to).format('LLL')}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{car.rentPerHour}</td>
                  <td>
                    <Button variant="primary" className="me-2" onClick={() => handleEditCar(car._id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteCar(car._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      {/* Show the EditCar form in a modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={carData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={carData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="capacity">
              <Form.Label>Capacity:</Form.Label>
              <Form.Control
                type="text"
                name="capacity"
                value={carData.capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="fuelType">
              <Form.Label>Fuel Type:</Form.Label>
              <Form.Control
                type="text"
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="rentPerHour">
              <Form.Label>Rent per Hour:</Form.Label>
              <Form.Control
                type="text"
                name="rentPerHour"
                value={carData.rentPerHour}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Car
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      
    </>
  );
};

export default ShowCars;
