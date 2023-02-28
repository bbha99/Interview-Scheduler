import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const stateWithAppointments = { ...state, appointments };
    const stateWithDays = updateSpots(stateWithAppointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState(stateWithDays);
        return response.status;
      })
      .catch((response) => {
        throw new Error(response.status);
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const stateWithAppointments = { ...state, appointments };
    const stateWithDays = updateSpots(stateWithAppointments);

    return axios.delete(`/api/appointments/${id}`, { id })
      .then((response) => {
        setState(stateWithDays);
        return response.status;
      })
      .catch((response) => {
        throw new Error(response.status);
      });
  }

  const updateSpots = (state) => {
    // Find the current day object and index from the array of days
    const selectedDay = state.days.find((day) => day.name === state.day);
    const selectedDayIndex = state.days.findIndex((day => day.name === state.day));

    // Get the list of appointments for the selected day
    const appointmentsList = selectedDay.appointments.map((appointmentId) => state.appointments[appointmentId]);

    // Spots remaining where no appointment is booked (null)
    const availableSpots = appointmentsList.filter((appointment) => appointment.interview === null);
    const spotsAvailable = availableSpots.length;

    const newSelectedDay = {...selectedDay, spots: spotsAvailable}

    const days = [...state.days];
    days[selectedDayIndex] = newSelectedDay;
    return {...state, days};
  };

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}