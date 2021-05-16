import React ,{useState,createContext} from 'react'
import 'firebase/auth';
import firebase from 'firebase/app';



/*
const AuthContext =createContext();
function AuthContextProvider(props) {
   
    return (
        <AuthContext.Provider value={{auth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthContextProvider};
*/