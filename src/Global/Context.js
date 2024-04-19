import React, {createContext, useState} from 'react';

export const MyContext = createContext({
  userLogged: null,
  setUserLogged: () => {},
  userData: null,
  setUserData: () => {},
});

export const MyProvider = ({children}) => {
  const [userLogged, setUserLogged] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <MyContext.Provider
      value={{userLogged, setUserLogged, userData, setUserData}}>
      {children}
    </MyContext.Provider>
  );
};
