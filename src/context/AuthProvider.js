import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={
        {auth, setAuth}
    }>
        {children}
        {console.log("auth in AuthContext", auth)}
    </AuthContext.Provider>
  )
}

export default AuthContext;
