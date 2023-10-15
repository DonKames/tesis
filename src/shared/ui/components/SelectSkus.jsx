import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { uiSetSkusNames } from '../slice/uiSlice';
import { getSkusNames } from '../../../modules/products/APIs/skusAPI';

export const SelectSkus = ({ handleInputChange, name, skuId }) => {
    const dispatch = useDispatch();
    const { skusNames } = useSelector((state) => state.ui);
    const [selectedValue, setSelectedValue] = useState(0);

    useEffect(() => {
        const fetchSkusNames = async () => {
            try {
                if (!skusNames.length) {
                    const fetchedSkusNames = await getSkusNames();
                    dispatch(uiSetSkusNames(fetchedSkusNames));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSkusNames();
    }, []);

    useEffect(() => {
        const defaultSku = skusNames.find((sku) => sku.id === skuId);
        if (defaultSku) {
            setSelectedValue({
                value: defaultSku.id,
                label: defaultSku.name,
            });
        }
    }, [skuId, skusNames]);

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
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
            }}
            isSearchable
            name={name}
            onChange={handleChange}
            options={skusNames.map((sku) => ({
                value: sku.id,
                label: sku.name,
            }))}
            placeholder="Seleccione su Sku"
            value={selectedValue}
        />
    );
};

SelectSkus.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    skuId: PropTypes.number,
};
