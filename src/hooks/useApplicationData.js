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
    // console.log(id, interview);
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
        // console.log("successful", response);
        setState({ ...state, appointments });
        return response.status;
      })
      .catch((response) => {
        // console.log("catch", response);
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

    return axios.delete(`/api/appointments/${id}`, { id })
      .then((response) => {
        setState({ ...state, appointments });
        return response.status;
      })
      .catch((response) => {
        throw new Error(response.status);
      });
  }

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    const daysURL = `/api/days`;

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  // console.log(state.interviewers)

  return {     
    state,
    setDay,
    bookInterview,
    cancelInterview };
}