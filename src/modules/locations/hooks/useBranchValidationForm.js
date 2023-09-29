import validator from 'validator';

export const useBranchValidationForm = (formValues) => {
    const { branchId, name, country, region, address, municipality, active } =
        formValues;

    const isFormValid = () => {
        // Active
        if (typeof active !== 'boolean') {
            console.log('error en active');
            return false;
        }

        // Name
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

        // Address
        if (
            !validator.isLength(address, {
                max: 100,
            }) ||
            !validator.isAlphanumeric(address)
        ) {
            console.log('error en address');
            return false;
        }

        // Municipality
        if (!validator.isNumeric(municipality)) {
            console.log('error en municipality');
            return false;
        }

        // Region
        if (!validator.isNumeric(region)) {
            console.log('error en region');
            return false;
        }

        // Country
        if (!validator.isNumeric(country)) {
            console.log('error en country');
            return false;
        }

        // BranchId
        if (!validator.isNumeric(branchId)) {
            console.log('error en branchId');
            return false;
        }

        return true;
    };

    return {
        isFormValid,
    };
};
