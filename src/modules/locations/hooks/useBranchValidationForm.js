import validator from 'validator';

export const useBranchValidationForm = (formValues) => {
    const { branchId, name, country, region, address, municipality } =
        formValues;

    const isFormValid = () => {
        if (typeof active !== 'boolean') {
            console.log('error en active');
            return false;
        }

        // name
        if (
            !validator.isLength(name, {
                max: 100,
            }) ||
            validator.isEmpty(name) ||
            !validator.isAlphanumeric(name)
        ) {
            console.log('error en name');
            return false;
        }

        // address
        if (
            !validator.isLength(address, {
                max: 100,
            }) ||
            !validator.isAlphanumeric(address)
        ) {
            console.log('error en address');
            return false;
        }

        if (
            !validator.isLength(phone, {
                max: 100,
            }) ||
            !validator.is(phone)
        ) {
            console.log('error en phone');
            return false;
        }

        if (
            !validator.isLength(email, {
                max: 100,
            })
        ) {
            console.log('error en email');
            return false;
        }

        return true;
    };

    return {
        isFormValid,
    };
};
