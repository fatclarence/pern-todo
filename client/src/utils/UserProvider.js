import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

// Wrapper for simple authentication 
function UserProvider(props) {
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedToken = localStorage.getItem("token");

        console.log("Current username: "+ storedUsername);
        console.log("Current token: "+ storedToken);
        setUsername(storedUsername);
        setToken(storedToken);
    }, []);


    return (
        <UserContext.Provider value={{username, 
                                      token, 
                                        setUsername: username => {
                                            setUsername(username);
                                            if (username) {
                                                console.log("USERCONTEXT: " + username);
                                                localStorage.setItem("username", username);
                                            } else {
                                                localStorage.removeItem("username");
                                            }
                                        }, 
                                        setToken: token => {
                                            setToken(token);
                                            if (token) {
                                                console.log("USERCONTEXT: " + token);
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