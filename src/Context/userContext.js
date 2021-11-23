import { createContext, useContext, useState} from 'react';


export const UserContext = createContext();

export function UserContextProvider({children}) {
  const localStorageUsers = JSON.parse(localStorage.getItem("users"));
  const [users, setUsers] = useState(localStorageUsers === null ? [] : localStorageUsers);
  const [openModal, setOpenModal] = useState(false);


 function saveUsers(data) {
    setUsers([...new Set([...users, ...data])])
  }

  return ( 
    <UserContext.Provider
      value={{
        users,
        saveUsers,
        openModal,
        setOpenModal
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}