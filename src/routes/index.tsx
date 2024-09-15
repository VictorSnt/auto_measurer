import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { MeasureListage } from '../pages/MeasureListage';

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path='/home' element={<HomePage />} />
      <Route path='/listagem' element={<MeasureListage />} />
      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};