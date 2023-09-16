import { useState } from 'react';

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target }) => {
        let value;

        if (target.type === 'checkbox' || target.type === 'switch') {
            value = target.checked;
        } else {
            value = target.value;
        }
        setValues({
            ...values,
            [target.name]: value,
        });
        // console.log(values);
    };

    const setFormValues = (newValues) => {
        setValues(newValues);
    };

    return [values, handleInputChange, reset, setFormValues];
};
