import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import AxiosPublic from './Hook/AxosPublic';


export const Auth = createContext();

const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const axiospublic = AxiosPublic();

    const googleSign = () => {
        setloading(true)
        return signInWithPopup(auth, provider)
    }
    const userSignUp = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userSignIn = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const ProfileUpdate = (displayName, photoURL) => {
        console.log('displayName::', displayName, photoURL)
        return updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL
        })
    }
    const signout = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const Unsubcribe = onAuthStateChanged(auth, (currentuser) => {
            console.log('currentuser:', currentuser)
            if (currentuser?.email) {
                console.log('currentuser done:', currentuser)
                setuser(currentuser)
                const userinfo = { email:currentuser?.email}
                axiospublic.get(`/jwt`,userinfo)
                    .then(res => {
                        console.log('token', res.data?.token)
                        setloading(false)
                    })
                    .catch(err => {
                        console.error(err);
                        setloading(false);
                    });
            }
            else {
                console.log('else function')

                axiospublic.post('/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('jwt logout', res.data?.removeCookies)
                        setloading(false)
                    })
                    .catch(err => {
                        console.error(err);
                        setloading(false);
                    });
            }
        })
        return () => {
            Unsubcribe()
        }
    }, [])
    const info = {
        googleSign,
        user,
        loading,
        userSignUp,
        userSignIn,
        ProfileUpdate,
        signout
    }

    return (
        <Auth.Provider value={info}>
            {children}
        </Auth.Provider>
    );
};

export default AuthProvider;