import { useEffect, useState } from 'react';
import Typography from './Typography.tsx';
import Button from './Button.tsx';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

function TherapistChat() {
  const [patient, setPatient] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      id: 1,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@me.com',
      user_type: 'therapist',
      picture: 'image-url',
    });

    setPatient({
      id: 5,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@me.com',
      user_type: 'patient',
      picture: 'image-url',
    });
  }, []);

  const [onlineStatus, setOnlineStatus] = useState('Online');
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 h-[75vh] h-min-[50vh]">
      <div className="border-2 border-slate-300 rounded-3xl p-4 flex flex-col w-1/3 h-full">
        <div className="grid grid-cols-3 gap-x-4">
          <img
            src={user.picture}
            alt={user.first_name + ' ' + user.last_name + ' picture'}
            className={`rounded-full w-28 h-28 border-8 row-span-3 ${onlineStatus === 'Online' ? 'border-green-500' : onlineStatus === 'OnCall' ? 'border-orange-500' : 'border-gray-500'}`}
          />
          <Typography variant="title" className="col-span-2">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography className="col-span-2">{user.email}</Typography>
          <Typography className="col-span-2">
            Status:
            <span
              className={`inline-block mx-2 rounded-full w-2 h-2 ${onlineStatus === 'Online' ? 'bg-green-500' : onlineStatus === 'OnCall' ? 'bg-orange-500' : 'bg-gray-500'}`}
            ></span>
            {onlineStatus}
          </Typography>
        </div>
        <div className="flex">
          <div className="flex flex-row flex-grow justify-between">
            <Typography variant="subtitle">Notes</Typography>
            <Button>Add new note</Button>
          </div>
        </div>
        <div className="flex">
          <Typography variant="subtitle">Documents</Typography>
        </div>
      </div>

      <div className="flex flex-wrap flex-grow gap-4 flex-col">
        <div className="border-2 border-slate-300 rounded-3xl p-4 flex-grow h-[50vh]">
          <div className="p-4 overflow-auto h-[50vh]">
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
            <p>this is the chat display</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-slate-300 p-4 flex gap-1">
          <textarea
            name=""
            id=""
            rows="2"
            className="flex-grow bg-slate-100"
          ></textarea>
          <Button variant="outline">
            <FaPaperclip />
          </Button>
          <Button variant="outline">
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TherapistChat;
