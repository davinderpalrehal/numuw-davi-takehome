import Typography from './Typography.tsx';
import Button from './Button.tsx';
import { useLoginModal } from '../LoginModalContext.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, loginUser } from '../state/user/userSlice.ts';
import login from '../pages/Login.tsx';

function LoginModal({ onClose }) {
  const { closeLoginModal } = useLoginModal();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.user.token);

  const handleClose = () => {
    console.log('Closing the modal');
    closeLoginModal();
  };

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      console.log('Login successful');
      closeLoginModal();
    } else {
      alert('Login seems to have failed');
      console.log('Login failed', resultAction);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails());
    }
  }, [token, dispatch]);

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
            placeholder="password"
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
}

export default LoginModal;
