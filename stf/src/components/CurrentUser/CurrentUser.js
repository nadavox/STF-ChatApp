import React, { useState } from 'react';

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        username: '',
        displayName: '',
        photoUrl: '',
        token: ''
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