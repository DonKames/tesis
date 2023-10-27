// Validation
import * as Yup from 'yup';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */

/* The code is defining a validation schema for a form that is used in the `ModalEditWarehouse` and `AddWarehouseModal` component.
The schema is created using the `Yup` library, which provides a simple and powerful way to define
validation rules for JavaScript objects. */
export const branchLocationSchema = Yup.object({
    name: Yup.string().required('Campo obligatorio'),
    branchId: Yup.number()
        .required('La sucursal es obligatoria')
        .notOneOf([0], 'Debe elegir una sucursal'),
    description: Yup.string().required('Campo obligatorio'),
});
