import React, { useState } from 'react';

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        username: '',
        password: '',
        displayName: '',
        photoUrl: '',
        contactsList: [],
    });

    const updateUser = (newUser) => {
        setCurrentUser(newUser);
    };

    return (
        <CurrentUserContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
