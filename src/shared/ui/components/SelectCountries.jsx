import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { getCountries } from '../../../modules/locations/APIs/countriesAPI';
import { uiSetCountries } from '../slice/uiSlice';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectCountries = ({
    countryId,
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    setFieldTouched,
    setFieldValue,
}) => {
    const dispatch = useDispatch();
    const { countries } = useSelector((state) => state.ui);

    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                if (!countries.length) {
                    const fetchedCountries = await getCountries();
                    dispatch(uiSetCountries(fetchedCountries));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const defaultCountry = countries.find(
            (country) => country.id === countryId,
        );
        if (defaultCountry) {
            setSelectedValue({
                value: defaultCountry.id,
                label: defaultCountry.name,
            });
        }
    }, [countryId, countries]);

    const handleChange = (selectedOption) => {
        if (setFieldValue && setFieldTouched) {
            // Si estamos en un contexto de Formik
            setFieldValue(name, selectedOption.value);
            setFieldTouched(name, true);
        } else if (handleInputChange) {
            // Si estamos en un contexto independiente
            setSelectedValue(selectedOption);
            handleInputChange({
                target: {
                    name,
                    value: selectedOption.value,
                },
            });
        }
    };

    const options = countries.map((country) => ({
        label: country.name,
        value: country.id,
    }));

    console.log('countries' + isInvalid);

    return (
        <>
            <Select
                className={isInvalid ? 'is-invalid' : ''}
                isDisabled={true}
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleChange}
                options={options}
                placeholder="Seleccione su País"
                styles={errorStyle}
                value={selectedValue}
            />
            {isInvalid && (
                <div className="invalid-feedback">{errorMessage}</div>
            )}
        </>
    );
};

SelectCountries.propTypes = {
    countryId: PropTypes.number,
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
};
