import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeScreen from '../../HomeScreen';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { authLogin } from '../auth/authSlice';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(
        () =>
            onAuthStateChanged(auth, async (user) => {
                if (user?.uid) {
                    const { uid, displayName } = user;
                    setIsLoggedIn(true);
                    dispatch(authLogin({ uid, displayName }));
                } else {
                    setIsLoggedIn(false);
                }
                setChecking(false);
            }),
        [auth, dispatch, setChecking, setIsLoggedIn],
    );

    if (checking) {
        return <h1>Wait...</h1>;
    }

    return (
        <Routes>
            {/* <Route path="/" element={<Layout />}> */}
            <Route
                exact
                index
                element={<HomeScreen />}
            />
            <Route
                path='pbl/*'
                element={<PublicRoutes isLoggedIn={isLoggedIn} />}
            />
            <Route
                path='pvt/*'
                element={<PrivateRoutes isLoggedIn={isLoggedIn} />}
            />
        </Routes>
    );
};
