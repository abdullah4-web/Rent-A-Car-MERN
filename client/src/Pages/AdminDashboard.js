import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RentContext } from './RentContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Spinner } from 'react-bootstrap';

const AdminDashboard = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [carIncomeData, setCarIncomeData] = useState([]);
  const [bookedCarCountData, setBookedCarCountData] = useState([]);

  const { state } = useContext(RentContext);
  const { user } = state;

  useEffect(() => {
    // Function to fetch data from API and calculate income per date and total income of each car
    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('/api/bookings/bookedcars', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // Assuming the API returns an array of bookings with a "totalAmount", "createdAt", and "car" property
        const bookings = response.data;

        // Group bookings by date and calculate income per date
        const incomeByDate = bookings.reduce((result, booking) => {
          const date = new Date(booking.createdAt).toLocaleDateString();
          if (!result[date]) {
            result[date] = [];
          }
          result[date].push(booking);
          return result;
        }, {});

        // Convert incomeByDate to an array of objects for easy mapping in the UI
        const incomeDataArray = Object.entries(incomeByDate).map(([date, bookings]) => ({
          date,
          income: bookings.reduce((totalIncome, booking) => totalIncome + booking.totalAmount, 0),
          bookedCarCount: bookings.length,
        }));

        // Calculate total income
        const totalIncome = bookings.reduce((total, booking) => total + booking.totalAmount, 0);

        // Group bookings by car and calculate total income for each car
        const carIncomeByCar = bookings.reduce((result, booking) => {
          const carName = booking.car.name;
          if (!result[carName]) {
            result[carName] = 0;
          }
          result[carName] += booking.totalAmount;
          return result;
        }, {});

        // Convert carIncomeByCar to an array of objects for easy mapping in the UI
        const carIncomeDataArray = Object.entries(carIncomeByCar).map(([carName, income]) => ({
          carName,
          income,
        }));

        // Calculate booked car count per date
        const bookedCarCountDataArray = Object.entries(incomeByDate).map(([date, bookings]) => ({
          date,
          bookedCarCount: bookings.length,
        }));

        setIncomeData(incomeDataArray);
        setTotalIncome(totalIncome);
        setCarIncomeData(carIncomeDataArray);
        setBookedCarCountData(bookedCarCountDataArray);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    fetchIncomeData();
  }, [user.token]);

  return (
    <>
    
  <Spinner />
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Admin Dashboard</h1>
      <div>
        <h2>Total Income: ${totalIncome}</h2>
        <h2>Income per Date</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" name="Income" />
          </BarChart>
        </ResponsiveContainer>

        <h2>Total Income per Car</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={carIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="carName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" name="Total Income" />
          </BarChart>
        </ResponsiveContainer>

        <h2>Booked Car Count per Date</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookedCarCountData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookedCarCount" fill="#ffc658" name="Booked Car Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
