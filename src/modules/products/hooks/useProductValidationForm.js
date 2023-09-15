import validator from 'validator';

export const useProductValidationForm = (formValues) => {
    const { sku, branchId, warehouseId, epc, active } = formValues;

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

        return true;
    };

    return {
        isFormValid,
    };
};
