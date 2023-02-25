export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) return [];

  const foundDay = state.days.find(d => d.name === day);

  if (!foundDay) return [];
  
  return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
  // let appointmentsDayList = [];
  // for (const currDay of state.days) {
  //   if (currDay.name === day) {
  //     appointmentsDayList = currDay.appointments;
  //     break;
  //   }
  // }
  // const keys = Object.keys(state.appointments)
  // let appointmentsList = [];
  // for (const appointment of appointmentsDayList) {
  //   for (const key of keys) {
  //     if (appointment === Number(key)) {
  //       appointmentsList.push(state.appointments[key])
  //     }
  //   }
  // }

  // return appointmentsList;
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null
  }
  return {"student": interview.student, "interviewer": state.interviewers[interview.interviewer]}
}