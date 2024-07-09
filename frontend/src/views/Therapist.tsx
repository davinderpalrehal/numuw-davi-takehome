import React from "react";
import PatientCard from "../components/PatientCard";

function Therapist() {
  const [patients, setPatients] = React.useState([
    {
      id: 1,
      avatar: "image-url",
      name: "Fatima Mohammed",
      therapy: "Speech",
      dob: "5 May 2020",
      parent: {
        avatar: "image-url",
        name: "Munira Ahmed",
      },
    },
  ]);
  return (
    <div>
      <h1>Therapist view</h1>

      {patients.map((p) => (
        <PatientCard patient={p} key={p.id} />
      ))}
    </div>
  );
}

export default Therapist;
