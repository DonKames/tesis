// Validation
import * as Yup from 'yup';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */
export const branchSchema = Yup.object({
    branchName: Yup.string().required(
        'El nombre de la sucursal es obligatorio',
    ),
    country: Yup.number()
        .required('El país es obligatorio')
        .notOneOf([0], 'Debe elegir un País'),
    region: Yup.number()
        .required('La región es obligatoria')
        .notOneOf([0], 'Debe elegir una Región'),
    municipality: Yup.number()
        .required('La comuna es obligatoria')
        .notOneOf([0], 'Debe elegir una Comuna'),
    address: Yup.string().required('La dirección es obligatoria'),
});
