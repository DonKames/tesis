import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { searchProducts } from '../../../modules/products/APIs/productsAPI';

import PropTypes from 'prop-types';

export const ProductSearcher = ({ handleInputChange, name, productId }) => {
    const [selectedValue, setSelectedValue] = useState(0);

    // Function to fetch products asynchronously.
    const loadOptions = (inputValue, callback) => {
        searchProducts(inputValue)
            .then((data) => {
                const options = data.map((item) => ({
                    label: item.id.toString(),
                    value: item.id,
                }));
                callback(options);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

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
        <AsyncSelect
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
            }}
            name={name}
            onChange={handleChange}
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            placeholder="Escriba el nombre del Producto"
            loadingMessage={() => 'Cargando...'}
            value={selectedValue}
        />
    );
};

ProductSearcher.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    productId: PropTypes.number,
};
