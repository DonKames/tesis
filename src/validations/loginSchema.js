// Validation
import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Debe ser un email valido')
        .required('Campo obligatorio'),
    password: Yup.string()
        .required('Campo obligatorio')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
