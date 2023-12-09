// Validation
import * as Yup from 'yup';

export const loginSchema = Yup.object({
    newPassword: Yup.string().required('Campo obligatorio'),
    reNewPassword: Yup.string().required('Campo obligatorio'),
});
