import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    loading : true
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("access-token");
    if (userData && token) {
      setAuth({
        user: JSON.parse(userData),
        token,
        loading : false
      });
    }
    else {
      setAuth(
        {...auth, loading : false}
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
