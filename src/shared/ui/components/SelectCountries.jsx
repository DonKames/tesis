import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { getCountries } from '../../../modules/locations/APIs/countriesAPI';
import { uiSetCountries } from '../slice/uiSlice';

export const SelectCountries = ({ handleInputChange, name, countryId }) => {
    const dispatch = useDispatch();

    const { countries } = useSelector((state) => state.ui);

    const [selectedValue, setSelectedValue] = useState(0);

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
        setSelectedValue(selectedOption);
        handleInputChange({
            target: {
                name,
                value: selectedOption.value,
            },
        });
    };

    return (
        <Select
            isSearchable
            name={name}
            onChange={handleChange}
            options={countries.map((country) => ({
                value: country.id,
                label: country.name,
            }))}
            placeholder="Seleccione su País"
            value={selectedValue}
        />
    );
};

SelectCountries.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    countryId: PropTypes.number.isRequired,
};
