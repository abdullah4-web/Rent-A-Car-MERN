import React, { createContext, useEffect, useReducer, useState } from 'react';

export const RentContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cars: [],
  totalCars: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_CARS':
      return {
        ...state,
        cars: action.payload,
        totalCars: action.payload,
      };
    case 'SET_TOTAL_CARS':
      return {
        ...state,
        totalCars: action.payload,
      };
    default:
      return state;
  }
};

const RentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cars/getallcars');
      const data = await response.json();
      dispatch({ type: 'SET_CARS', payload: data });
      setLoading(false);
    } catch (error) {
      console.log('Error fetching cars:', error);
      if (error.response && error.response.status === 401) {
        // "Invalid Token" error, logout the user
        logout();
      }
    }
  };

  const setTotalCars = (cars) => {
    dispatch({ type: 'SET_TOTAL_CARS', payload: cars });
  };

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user');
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <RentContext.Provider value={{ state, loading, setTotalCars, login, logout, updateUser }}>
      {children}
    </RentContext.Provider>
  );
};

export default RentProvider;
