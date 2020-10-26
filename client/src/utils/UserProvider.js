import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

function UserProvider(props) {
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // Run every render
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedToken = localStorage.getItem("token");

        setUsername(storedUsername);
        setToken(storedToken);
    }, []);


    return (
        <UserContext.Provider value={{username, token, 
                                        setUsername: username => {
                                            setUsername(username);
                                            if (username) {
                                                localStorage.setItem("username", username);
                                            } else {
                                                localStorage.removeItem("username");
                                            }
                                        }, 
                                        setToken: token => {
                                            setToken(token);
                                            if (token) {
                                                localStorage.setItem("token", token);
                                            } else {
                                                localStorage.removeItem("token", token);
                                            }
                                        }
        }}>
        
            {props.children}
        </UserContext.Provider>
    );
}


export default UserProvider;