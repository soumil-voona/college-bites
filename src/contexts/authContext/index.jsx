import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {onAuthStateChanged} from 'firebase/auth';


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentuser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    },[])

    async function initializeUser(user) {
        if (user) {
            setCurrentuser({...user});
            setUserLoggedIn(true);
        } else {
            setCurrentuser(null);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

};