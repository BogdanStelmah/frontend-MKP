import React, { ReactNode, useState } from 'react';

export const AuthContext = React.createContext({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {}
});

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn: () => {
          setIsAuthenticated(true);
        },
        signOut: () => {
          setIsAuthenticated(false);
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
