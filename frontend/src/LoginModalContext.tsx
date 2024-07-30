import React, { createContext, useContext, useState } from 'react';

// Create a context for the login modal
const LoginModalContext = createContext({
  showLoginModal: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

// Create a custom hook to use the login modal context
export function useLoginModal() {
  return useContext(LoginModalContext);
}

// Create a provider component for the login modal context
export function LoginModalProvider({ children }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <LoginModalContext.Provider
      value={{ showLoginModal, openLoginModal, closeLoginModal }}
    >
      {children}
    </LoginModalContext.Provider>
  );
}
