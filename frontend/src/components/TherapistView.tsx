import { useEffect, useState } from 'react';
import Typography from './Typography.tsx';
import Button from './Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../state/patient/patientSlice.ts';

function TherapistView() {
  const [onlineStatus, setOnlineStatus] = useState('Online');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const patients = useSelector((state) => state.patient.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div className="flex gap-4">
      <div className="bg-slate-600 rounded-3xl p-4 flex flex-col items-center text-white w-1/4 min-w-[200px] h-fit">
        <img
          src={import.meta.env.VITE_API_URL + user.profile_picture}
          alt={user.first_name + ' ' + user.last_name + ' picture'}
          className={`rounded-full w-32 h-32 border-8 ${onlineStatus === 'Online' ? 'border-green-500' : onlineStatus === 'OnCall' ? 'border-orange-500' : 'border-gray-500'}`}
        />
        <Typography variant="title">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography>{user.email}</Typography>
        <Typography>
          Status:
          <span
            className={`inline-block mx-2 rounded-full w-2 h-2 ${onlineStatus === 'Online' ? 'bg-green-500' : onlineStatus === 'OnCall' ? 'bg-orange-500' : 'bg-gray-500'}`}
          ></span>
          {onlineStatus}
        </Typography>
      </div>
      <div className="flex flex-wrap w-3/4 gap-4">
        {patients.map((patient) => (
          <div
            className="bg-white rounded-lg shadow-md p-4 grid grid-cols-4 gap-4 min-w-[240px] max-w-80"
            key={patient.user.id}
          >
            <img
              src={import.meta.env.VITE_API_URL + patient.user.profile_picture}
              alt={
                patient.user.first_name +
                ' ' +
                patient.user.last_name +
                ' picture'
              }
              className="rounded-full w-16 h-16 border-2 border-gray-200 mb-2 row-span-3"
            />
            <Typography variant="subtitle" className="col-span-3">
              {patient.user.first_name} {patient.user.last_name}
            </Typography>
            <Typography className="col-span-3">{patient.user.email}</Typography>
            <Button
              onClick={() => navigate(`/chat/${user.id}/${patient.user.id}`)}
              className="col-span-3"
            >
              Chat with Parent
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TherapistView;
