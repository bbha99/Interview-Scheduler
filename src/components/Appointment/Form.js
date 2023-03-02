import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState({
    studentMessage: "",
    interviewerMessage: ""
  });



  const reset = function () {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };

  function validate() {
    const studentMessage = !student ? "Student name cannot be blank" : "";
    const interviewerMessage = !interviewer ? "Please select an interviewer" : "";

    if (!student || !interviewer) {
      return (
        setError((prev) => ({
          ...prev,
          studentMessage,
          interviewerMessage
        }))
      );
    }
    setError("");
    props.onSave(student, interviewer);
    // return (!student || !interviewer ? setError((prev) => ({
    //   ...prev,
    //   studentMessage,
    //   interviewerMessage
    // })) : props.onSave(student, interviewer));

  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        {error.studentMessage && <section className="appointment__validation">{error.studentMessage}</section>}
        {error.interviewerMessage && <section className="appointment__validation">{error.interviewerMessage}</section>}
        <InterviewerList
          student={props.student}
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}