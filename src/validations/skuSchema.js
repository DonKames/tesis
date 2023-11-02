// Validation
import * as Yup from 'yup';
import { getSkuBySku } from '../modules/products/APIs/skusAPI';

/* The `validationSchema` constant is defining the validation rules for the form fields in the
`ModalEditBranch` component. It is using the `Yup` library to create a validation schema object. */
export const skuSchema = Yup.object({
    name: Yup.string().required('El nombre del Sku es obligatorio'),
    description: Yup.string('La Descripción debe ser Alfanumérica'),
    minimumAmount: Yup.number('Debe ser un numero').required(
        'Si no quiere una cantidad minima, Poner 0',
    ),
    sku: Yup.string()
        .required('El EPC es obligatoria')
        .test(
            'is-unique',
            'Este SKU ya existe en la base de datos',
            async (value) => {
                if (!value) return true;
                try {
                    let lastValue = '';

                    if (lastValue !== value) {
                        lastValue = value;
                        console.log('valor sku: ', value);
                        const response = await getSkuBySku(value);
                        console.log('Chequeo sku', response);
                        return !response;
                    }

                    return true;
                } catch (error) {
                    console.log('Error al verificar el SKU: ', error);
                    return false;
                }
            },
        ),
});
