import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { RentContext } from '../Pages/RentContext'

export default function AdminRoute({ children }) {
  const { state } = useContext(RentContext);
  const { user } = state;
  return user && user.isAdmin ? children : <Navigate to="/login" />;
}