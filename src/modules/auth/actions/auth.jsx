import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../../../firebase/firebase-config';
import { types } from '../../../types/types';
import { authLogin } from '../authSlice';
import Swal from 'sweetalert2';
import { uiStartLoading } from '../../ui/uiSlice';

export const startRegisterNameEmailPass = (name, email, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, {
                    displayName: name,
                });
                const { uid, displayName } = user;
                console.log(uid, displayName);
                dispatch(authLogin({ uid, displayName }));
            })
            .catch((e) => {
                console.log(e);
                Swal.fire('Error', 'Error en el registro', 'error');
            });
    };
};

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading())

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(authLogin(user.uid, user.displayName));
                // dispatch(finishLoading())
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
                // dispatch(finishLoading())
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

export const logout = () => ({
    type: types.logout,
});

export const startLogout = () => {
    return async (dispatch) => {
        await signOut(auth);
        dispatch(logout());
    };
};
