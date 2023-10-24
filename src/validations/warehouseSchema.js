// Validation
import * as Yup from 'yup';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */
export const warehouseSchema = Yup.object({
    warehouseName: Yup.string().required('Campo obligatorio'),
    branchId: Yup.number()
        .required('La sucursal es obligatoria')
        .notOneOf([0], 'Debe elegir una sucursal'),
    capacity: Yup.number('Debe ser un numero').integer(
        'El numero debe ser un entero',
    ),
});
