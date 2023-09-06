import validator from 'validator';

export const useFormSkuValidation = (formValues) => {
    const { active, description, minimumStock, name, sku } = formValues;

    const isFormValid = () => {
        if (typeof active !== 'boolean') {
            console.log('error en active');
            return false;
        }

        if (!validator.matches(description, /^[a-zA-Z0-9 áéíóúÁÉÍÓÚ.,]+$/)) {
            console.log('error en description');
            return false;
        }

        if (!validator.isLength(description, { max: 255 })) {
            console.log('error en description');
            return false;
        }

        if (!validator.isInt(minimumStock.toString())) {
            console.log('error en minimumStock');
            return false;
        }

        if (!validator.isLength(name, { max: 100 })) {
            console.log('error en name');
            return false;
        }

        if (!validator.isLength(sku, { max: 100 })) {
            console.log('error en sku');
            return false;
        }

        return true;
    };

    return { isFormValid };
};
