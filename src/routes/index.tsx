import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};