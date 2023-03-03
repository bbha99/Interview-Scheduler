// Helper functions

// Returns an array of appointments for a given day
export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) return [];

  const foundDay = state.days.find(d => d.name === day);

  if (!foundDay) return [];
  
  return foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
}

// Returns an object of relevant information for an interview
export function getInterview(state, interview) {
  
  if (!interview) {
    return null
  }
  return {"student": interview.student, "interviewer": state.interviewers[interview.interviewer]}
}

// Returns an array of interviewers for a given day
export function getInterviewersForDay(state, day) {

  if (state.days.length === 0) return [];

  const foundDay = state.days.find(d => d.name === day);

  if (!foundDay) return [];
  
  return foundDay.interviewers.map(interviewersId => state.interviewers[interviewersId])
}