import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../../../firebase/firebase-config';
import { authLogin, authLogout } from '../authSlice';
import Swal from 'sweetalert2';
import {
    uiFinishLoading,
    uiStartLoading,
} from '../../../shared/ui/slice/uiSlice';
import { getUserByEmail } from '../../users/apis/apiUsers';

// Vamos de nuevo

export const startRegisterNewUserNameEmailPass = (name, email, password) => {
    return async (dispatch) => {
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password,
            );

            // Actualizar el perfil del usuario con el nombre
            await user.updateProfile({
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

export const startRegisterNameEmailPass = (name, email, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                // TODO: actualizar el perfil del usuario con el nombre
                const userData = await getUserByEmail(email);

                const role = userData.fk_role_id;

                await updateProfile(user, {
                    displayName: name,
                });

                const { uid, displayName } = user;

                console.log(uid, displayName);

                dispatch(authLogin({ uid, displayName, email, role }));
            })
            .catch((e) => {
                console.log(e);
                Swal.fire('Error', 'Error en el registro', 'error');
            });
    };
};

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        dispatch(uiStartLoading());

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                const { uid, displayName } = user;
                dispatch(authLogin({ uid, displayName }));
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
        dispatch(authLogout());
    };
};
