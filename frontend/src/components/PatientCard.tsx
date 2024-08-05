function PatientCard({ patient }) {
  return (
    <div>
      {patient.name}
      {JSON.stringify(patient)}
    </div>
  );
}

export default PatientCard;
