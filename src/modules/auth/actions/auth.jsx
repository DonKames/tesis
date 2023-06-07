import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../../../firebase/firebase-config';
import { authLogin, authLogout } from '../authSlice';
import Swal from 'sweetalert2';
import { uiFinishLoading, uiStartLoading } from '../../../shared/ui/uiSlice';
import { reset } from '../../../shared/resetSlice';

// Vamos de nuevo

export const startRegisterNewUserNameEmailPass = (name, email, password) => {
    return async (dispatch, getState) => {
        try {
            const auth = getAuth();

            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            // Actualizar el perfil del usuario con el nombre
            await updateProfile(user, {
                displayName: name,
            });

            const { uid, displayName } = user;
            console.log(uid, displayName);

            // No se realiza el inicio de sesión automático

            // dispatch(authLogin({ uid, displayName }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error en el registro', 'error');
        }
    };
};

// export const startRegisterNewUserNameEmailPass = (name, email, password) => {
//     return async (dispatch) => {
//         try {
//             const { user } = await createUserWithEmailAndPassword(
//                 auth,
//                 email,
//                 password,
//             );

//             // Actualizar el perfil del usuario con el nombre
//             await updateProfile(user, {
//                 displayName: name,
//             });

//             const { uid, displayName } = user;
//             console.log(uid, displayName);

//             // No se realiza el inicio de sesión automático

//             // dispatch(authLogin({ uid, displayName }));
//         } catch (error) {
//             console.log(error);
//             Swal.fire('Error', 'Error en el registro', 'error');
//         }
//     };
// };

export const startRegisterNameEmailPass = (name, email, password, role) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                console.log(name, password, role, email);
                await updateProfile(user, {
                    displayName: name,
                    role,
                });
                // const { uid, displayName, email } = user;
                console.log(user);
                dispatch(
                    authLogin({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        role: user.role,
                    }),
                );
                return user;
            })
            .catch((e) => {
                console.log(e);
                Swal.fire('Error', 'Error en el registro', 'error');
            });
    };
};

// Original
// export const startRegisterNameEmailPass = (name, email, password) => {
//     return (dispatch) => {
//         createUserWithEmailAndPassword(auth, email, password)
//             .then(async ({ user }) => {
//                 await updateProfile(user, {
//                     displayName: name,
//                 });
//                 const { uid, displayName } = user;
//                 console.log(uid, displayName);
//                 dispatch(authLogin({ uid, displayName }));
//             })
//             .catch((e) => {
//                 console.log(e);
//                 Swal.fire('Error', 'Error en el registro', 'error');
//             });
//     };
// };

export const startLoginEmailPassword = (email, password, name, role) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                const { uid, displayName, email } = user;
                dispatch(authLogin({ uid, displayName: name, email, role }));
                dispatch(uiFinishLoading());
            })
            .catch((e) => {
                console.log(e.code);
                switch (e.code) {
                    case 'auth/user-not-found':

                    // eslint-disable-next-line no-fallthrough
                    case 'auth/wrong-password':
                        Swal.fire(
                            'ERROR',
                            'Usuario o Contraseña Incorrecta',
                            'error',
                        );
                        break;

                    default:
                        Swal.fire('Error', 'Error Desconocido', 'error');
                        break;
                }
                dispatch(uiFinishLoading());
            });
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
            const { displayName, uid } = user;
            dispatch(authLogin(uid, displayName));
        });
    };
};

// export const setLoginData = (uid, displayName) => (
//   login({ uid, displayName })
// )

// export const logout = () => ({
//     type: types.logout,
// });

export const startLogout = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(reset());
        dispatch(authLogout());
    };
};
