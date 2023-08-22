import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from '../../HomeScreen';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { authLogin } from '../auth/authSlice';
import { getUserByUid, updateUserUid } from '../users/apis/apiUsers';
import { getGlobalSettings } from '../settings/APIs/settingsApi';
import {
    settingsSetGlobalSettingsId,
    settingsSetMainWarehouse,
} from '../settings/slice/settingsSlice';
import { getWarehouseById } from '../locations/APIs/apiWarehouses';

export const AppRouter = () => {
    const dispatch = useDispatch();

    // Redux state
    const settings = useSelector((state) => state.settings);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // console.log(auth);
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                console.log(user.uid);
                const respUid = await getUserByUid(user.uid);

                if (!respUid) {
                    updateUserUid(user.email, user.uid);
                }

                const { uid, first_name, fk_role_id, email } = respUid;
                console.log(respUid);
                console.log(first_name, fk_role_id, email, uid);
                dispatch(
                    authLogin({
                        uid,
                        displayName: first_name,
                        role: fk_role_id,
                        email,
                        isRegistered: true,
                    }),
                );
            }
            setChecking(false);
        });
    }, [auth, dispatch]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [auth, setIsLoggedIn, setChecking]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                if (!settings.globalSettingsId) {
                    const settingsData = await getGlobalSettings();

                    console.log(settingsData);

                    if (settingsData) {
                        const mainWarehouse = await getWarehouseById(
                            settingsData.mainWarehouse,
                        );

                        console.log(mainWarehouse);

                        dispatch(
                            settingsSetMainWarehouse({
                                id: settingsData.mainWarehouse,
                                name: mainWarehouse.name,
                            }),
                        );
                    }

                    dispatch(settingsSetGlobalSettingsId(settingsData.id));
                }
            }
        });
    }, [dispatch]);

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
