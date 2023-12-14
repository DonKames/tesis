// Validation
import * as Yup from 'yup';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */
export const productSchema = Yup.object({
    skuId: Yup.number()
        .required('El nombre de la sucursal es obligatorio')
        .notOneOf([0], 'Debe elegir un SKU'),
    branchId: Yup.number()
        .required('La sucursal es obligatoria')
        .notOneOf([0], 'Debe elegir una Sucursal'),
    warehouseId: Yup.number()
        .required('La bodega es obligatoria')
        .notOneOf([0], 'Debe elegir una Bodega'),
    epc: Yup.string().required('El EPC es obligatoria'),
});
