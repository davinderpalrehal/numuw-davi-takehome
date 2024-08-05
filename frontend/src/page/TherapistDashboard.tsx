import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { FaComments, FaEnvelope } from 'react-icons/fa';

const TherapistDashboard: React.FC = () => {
  const [onlineStatus, setOnlineStatus] = useState('Online');
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };

    fetchData();
  }, []);

  const sendEmail = (email: string) => {
    alert('Sending email to ' + email);
  };

  const openChat = (parent: any) => {
    navigate(`/chat/${user.id}/${parent.id}`);
  };

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
      <div className="w-3/4">
        {patients.map((patient: any) => (
          <div
            className="grid grid-cols-10 border-2 border-slate-300 rounded-3xl p-4 mb-4 gap-4"
            key={patient.user.id}
          >
            <div className="col-span-3">
              <img
                src={
                  import.meta.env.VITE_API_URL + patient.user.profile_picture
                }
                alt={
                  patient.user.first_name +
                  ' ' +
                  patient.user.last_name +
                  ' image'
                }
                className="w-16 h-16 rounded-full"
              />
              <Typography>
                {patient.user.first_name} {patient.user.last_name}
              </Typography>
            </div>
            <div className="col-span-3">
              <img
                src={
                  import.meta.env.VITE_API_URL +
                  patient.parents[0].user.profile_picture
                }
                alt={
                  patient.parents[0].user.first_name +
                  ' ' +
                  patient.parents[0].user.last_name +
                  ' image'
                }
                className="w-16 h-16 rounded-full"
              />
              {patient.parents[0].user.first_name}{' '}
              {patient.parents[0].user.last_name}
            </div>
            <div className="col-span-2">Notes</div>
            <div className="flex flex-col gap-4 col-span-2">
              <Button
                variant="outline"
                onClick={() => sendEmail(patient.parents[0].user.email)}
              >
                <FaEnvelope className="m-auto" />
              </Button>
              <Button
                variant="outline"
                onClick={() => openChat(patient.parents[0].user)}
              >
                <FaComments className="m-auto" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistDashboard;
