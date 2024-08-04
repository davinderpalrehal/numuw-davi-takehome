import { createContext, useContext, useState } from 'react';

interface LoginModalContextType {
  isLoginModalOpen: boolean;
  setLoginModalOpen: (isOpen: boolean) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined,
);

export const LoginModalProvider: React.FC = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <LoginModalContext.Provider value={{ isLoginModalOpen, setLoginModalOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
};
