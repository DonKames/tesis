import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getRegions } from '../../../modules/locations/APIs/apiRegions';
import { uiSetRegions } from '../slice/uiSlice';

export const SelectRegions = ({
    handleInputChange,
    name,
    regionId,
    selectedCountry,
}) => {
    const dispatch = useDispatch();

    const [selectedValue, setSelectedValue] = useState(0);

    const { regions } = useSelector((state) => state.ui);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                if (!regions.length) {
                    const fetchedRegions = await getRegions();
                    dispatch(uiSetRegions(fetchedRegions));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRegions();
    }, []);

    useEffect(() => {
        const defaultRegion = regions.find((region) => region.id === regionId);
        if (defaultRegion) {
            setSelectedValue({
                value: defaultRegion.id,
                label: defaultRegion.name,
            });
        }
    }, [regionId, regions]);

    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption);
        handleInputChange({
            target: {
                name,
                value: selectedOption.value,
            },
        });
    };

    /* eslint-disable indent */
    const options =
        selectedCountry === 0
            ? []
            : regions
                  .filter((region) => region.countryId === selectedCountry)
                  .map((region) => ({
                      value: region.id,
                      label: region.name,
                  }));

    /* eslint-enable indent */

    return (
        <Select
            isSearchable
            name={name}
            onChange={handleChange}
            options={options}
            placeholder="Región"
            value={selectedValue}
        />
    );
};

SelectRegions.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    regionId: PropTypes.number.isRequired,
    selectedCountry: PropTypes.number.isRequired,
};
