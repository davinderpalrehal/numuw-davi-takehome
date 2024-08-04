import React, { useEffect, useState } from 'react';
import Typography from './Typography';
import Button from './Button';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { Message, User, UserType, Variant } from '../types';

const TherapistChat: React.FC = () => {
  const [patient, setPatient] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [onlineStatus] = useState<string>('Online');

  useEffect(() => {
    setUser({
      id: 1,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@me.com',
      user_type: UserType.Therapist,
      profile_picture: 'image-url',
    });

    setPatient({
      id: 5,
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@me.com',
      user_type: UserType.Parent,
      profile_picture: 'image-url',
    });

    setChatHistory([
      {
        sender_id: 1,
        content: 'Hello, how are you?',
        conversation_id: 1,
        timestamp: new Date(),
      },
      {
        sender_id: 5,
        content: 'I am good. How about you?',
        conversation_id: 1,
        timestamp: new Date(),
      },
      {
        sender_id: 1,
        content: 'How is Daniel doing?',
        conversation_id: 1,
        timestamp: new Date(),
      },
      {
        sender_id: 5,
        content: 'He is good. Coping well with the new medication',
        conversation_id: 1,
        timestamp: new Date(),
      },
      {
        sender_id: 1,
        content: 'Could you send me a copy of the blood test reports',
        conversation_id: 1,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // TODO: Send message to server
      if (user) {
        setChatHistory([
          ...chatHistory,
          {
            sender_id: user.id,
            content: message,
            conversation_id: 1,
            timestamp: new Date(),
          },
        ]);
        setMessage('');
      }
    }
  };

  return (
    <div className="flex gap-4 h-[75vh] h-min-[50vh]">
      <div className="border-2 border-slate-300 rounded-3xl p-4 flex flex-col w-1/3 h-full">
        <div className="grid grid-cols-3 gap-x-4">
          {user && (
            <>
              <img
                src={user.profile_picture}
                alt={`${user.first_name} ${user.last_name} picture`}
                className={`rounded-full w-28 h-28 border-8 row-span-3 ${
                  onlineStatus === 'Online'
                    ? 'border-green-500'
                    : onlineStatus === 'OnCall'
                      ? 'border-orange-500'
                      : 'border-gray-500'
                }`}
              />
              <Typography variant="title" className="col-span-2">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography className="col-span-2">{user.email}</Typography>
              <Typography className="col-span-2">
                Status:
                <span
                  className={`inline-block mx-2 rounded-full w-2 h-2 ${
                    onlineStatus === 'Online'
                      ? 'bg-green-500'
                      : onlineStatus === 'OnCall'
                        ? 'bg-orange-500'
                        : 'bg-gray-500'
                  }`}
                ></span>
                {onlineStatus}
              </Typography>
            </>
          )}
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
            {chatHistory.map((message, index) => (
              <div key={index}>
                {message.sender_id === user?.id ? (
                  <div className="flex justify-end">
                    <div className="flex bg-blue-300 py-2 px-4 rounded-lg">
                      {message.content}
                      <img
                        src={user.profile_picture}
                        alt={`${user.first_name} ${user.last_name} picture.}`}
                        className="w-10 h-10 rounded-full ml-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end flex-row-reverse">
                    <div className="flex bg-green-300 py-2 px-4 rounded-lg">
                      <img
                        src={patient?.profile_picture}
                        alt={`${patient?.first_name} ${patient?.last_name} picture.}`}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      {message.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-slate-300 p-4 flex gap-1">
          <textarea
            name=""
            id=""
            rows={2}
            className="flex-grow bg-slate-100 p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <Button variant={Variant.Outline}>
            <FaPaperclip />
          </Button>
          <Button variant={Variant.Outline}>
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistChat;
