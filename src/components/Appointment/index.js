import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log("mode", mode);
  // console.log("props.interview", props.interview);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(response => {
        console.log("response", response);
        if (response === 204) {
          transition(SHOW);
        }
      });
  }

  function deleteAppointment() {
    transition("DELETING");
    props.cancelInterview(props.id)
      .then(response => {
        if (response === 204) {
          transition(EMPTY);
        }
      });
  }

  function confirmDeleteAppointment() {
    transition("CONFIRM");

  }

  function cancelDeleteAppointment() {
    transition("SHOW");
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDeleteAppointment}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => { back(EMPTY); }}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => { back(EMPTY); }}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={cancelDeleteAppointment}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
    </article>
  );
}