import validator from 'validator';

export const useProductValidationForm = (formValues) => {
    const { sku, warehouseId, epc, active } = formValues;

    const isFormValid = () => {
        if (typeof active !== 'boolean') {
            console.log('error en active');
            return false;
        }

        if (
            !validator.isLength(sku, {
                max: 100,
            })
        ) {
            console.log('error en sku');
            return false;
        }

        if (!validator.isNumeric(warehouseId)) {
            console.log('error en warehouseId');
            return false;
        }

        if (
            !validator.isLength(epc, {
                max: 16,
            })
        ) {
            console.log('error en epc');
            return false;
        }

        return true;
    };

    return {
        isFormValid,
    };
};
