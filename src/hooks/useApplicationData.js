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

    return axios.put(`/api/appointments/${id}`, { interview })
    .then((response) => {
      if (!state.appointments[id].interview) {
        const objIndex = state.days.findIndex((d => d.name === state.day));

        const days = [...state.days];
    
        days[objIndex].spots--;
        setState({ ...state, appointments, days});
      } else {
        setState({ ...state, appointments});
      }
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

    const objIndex = state.days.findIndex((d => d.name === state.day));

    const days = [...state.days];

    days[objIndex].spots++;

    return axios.delete(`/api/appointments/${id}`, { id })
      .then((response) => {
        setState({ ...state, appointments, days });
        return response.status;
      })
      .catch((response) => {
        throw new Error(response.status);
      });
  }

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
    cancelInterview };
}