// Validation
import * as Yup from 'yup';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */
export const userSchema = Yup.object({
    name: Yup.string().required('El Nombre del Usuario es obligatorio'),
    lastName: Yup.string().required('El Apellido del Usuario es obligatorio'),
    email: Yup.string()
        .email('El Email debe tener un formato válido')
        .required('El Email del Usuario es obligatorio'),
    roleId: Yup.number()
        .required('El nombre del Sku es obligatorio')
        .notOneOf([0], 'Debe elegir un Rol'),
    active: Yup.bool('Debe ser booleano'),
});
