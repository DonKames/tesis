import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import HomeScreen from '../../HomeScreen';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { authLogin } from '../auth/authSlice';
import { getUserByUid, updateUserUid } from '../users/apis/usersAPI';
import { getGlobalSettings } from '../settings/APIs/settingsApi';
import {
    settingsSetGlobalSettingsId,
    settingsSetMainBranch,
    settingsSetMainWarehouse,
} from '../settings/slice/settingsSlice';
import { getWarehouseById } from '../locations/APIs/warehouseAPI';
import { getBranchById } from '../locations/APIs/branchesAPI';

export const AppRouter = () => {
    const dispatch = useDispatch();

    // Redux state
    const settings = useSelector((state) => state.settings);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                const respUid = await getUserByUid(user.uid);

                if (!respUid) {
                    updateUserUid(user.email, user.uid);
                }

                const {
                    uid,
                    first_name: firstName,
                    fk_role_id: fkRoleId,
                    email,
                } = respUid;
                // console.log(respUid);
                // console.log(first_name, fk_role_id, email, uid);
                dispatch(
                    authLogin({
                        uid,
                        displayName: firstName,
                        role: fkRoleId,
                        email,
                        isRegistered: true,
                    }),
                );
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);

            if (!settings.globalSettingsId) {
                const settingsData = await getGlobalSettings();

                console.log(settingsData);

                if (settingsData) {
                    dispatch(settingsSetGlobalSettingsId(settingsData.id));

                    if (settingsData.mainBranch) {
                        const branch = await getBranchById(
                            settingsData.mainBranch,
                        );

                        console.log(branch);

                        dispatch(
                            settingsSetMainBranch({
                                id: settingsData.mainBranch,
                                name: branch.name,
                            }),
                        );
                    }

                    if (settingsData.mainWarehouse) {
                        const warehouse = await getWarehouseById(
                            settingsData.mainWarehouse,
                        );

                        console.log(warehouse);

                        dispatch(
                            settingsSetMainWarehouse({
                                id: settingsData.mainWarehouse,
                                name: warehouse.name,
                            }),
                        );
                    }
                }
            }
        });
    }, [auth, dispatch, setIsLoggedIn, setChecking]);

    if (checking) {
        return <h1>Wait...</h1>;
    }

    return (
        <Routes>
            {/* <Route path="/" element={<Layout />}> */}
            <Route exact index element={<HomeScreen />} />
            <Route
                path="pbl/*"
                element={<PublicRoutes isLoggedIn={isLoggedIn} />}
            />
            <Route
                path="pvt/*"
                element={<PrivateRoutes isLoggedIn={isLoggedIn} />}
            />
        </Routes>
    );
};
