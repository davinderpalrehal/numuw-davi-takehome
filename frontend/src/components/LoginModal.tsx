import { useLoginModal } from '../contexts/LoginModalContext.tsx';
import { useEffect, useState } from 'react';
import Typography from './Typography.tsx';
import Button from './Button.tsx';
import { LoginModalProps } from '../types';
import { useAuth } from '../contexts/AuthContext.tsx';

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { setLoginModalOpen } = useLoginModal();
  const { token, setToken, setUser, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    console.log('closing the modal');
    setLoginModalOpen(false);
  };

  const handleLogin = async () => {
    const resultAction = await login(username, password);
    if (resultAction) {
      console.log('login successful');
      // setToken(resultAction);
      // TODO: recheck this
      // setUser(resultAction);
      handleClose();
    } else {
      // alert('Login seems to have failed');
      console.log('Login failed', resultAction);
    }
  };

  useEffect(() => {
    if (token) {
      // TODO: recheck this
      // fetchUserDetails();
    }
  }, [token]);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
      <div className="bg-white rounded shadow">
        <div className="px-6 pt-6 pb-3 border-b border-blue-300">
          <Typography variant="subtitle">Login</Typography>
        </div>

        <div className="p-6 min-w-[300px] max-w-[500px] w-screen">
          <input
            type="text"
            placeholder="username"
            className="block p-4 my-2 w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="block p-4 my-2 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between pt-10">
            <Button onClick={handleClose} variant="danger">
              Close
            </Button>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-900/70 backdrop-blur"
        onClick={handleClose}
      ></div>
    </div>
  );
};

export default LoginModal;
