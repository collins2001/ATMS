import { useContext } from 'react';
import { TimetableContext } from '../contexts/TimetableContext';

export const useTimetable = () => {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
}; 