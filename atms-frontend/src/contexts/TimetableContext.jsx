import React, { createContext, useState, useContext, useEffect } from 'react';
import timetableService from '../services/timetableService';
import { useAuth } from './AuthContext';

const TimetableContext = createContext(null);

export const TimetableProvider = ({ children }) => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTimetable();
    } else {
      setTimetable([]);
    }
  }, [isAuthenticated]);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const response = await timetableService.getTimetable();
      setTimetable(response.timetable || []);
    } catch (err) {
      console.error('Error fetching timetable:', err);
      setError(err.message);
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    try {
      const response = await timetableService.addEvent(eventData);
      setTimetable([...timetable, response.event]);
      return response.event;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      const response = await timetableService.updateEvent(eventId, eventData);
      setTimetable(timetable.map(event =>
        event.id === eventId ? response.event : event
      ));
      return response.event;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await timetableService.deleteEvent(eventId);
      setTimetable(timetable.filter(event => event.id !== eventId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    timetable,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    refresh: fetchTimetable
  };

  return (
    <TimetableContext.Provider value={value}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetable = () => {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
}; 