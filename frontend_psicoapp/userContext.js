import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('users');
            if (storedUser) setUser(JSON.parse(storedUser));
            setIsLoading(false);
        };
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
