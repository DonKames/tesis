import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { searchProducts } from '../../../modules/products/APIs/productsAPI';

import PropTypes from 'prop-types';
import { errorStyle } from '../../../styles/selectStyles';

export const ProductSearcher = ({
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    productId,
    setFieldTouched,
    setFieldValue,
}) => {
    const [selectedValue, setSelectedValue] = useState(0);

    // Function to fetch products asynchronously.
    const loadOptions = (inputValue, callback) => {
        searchProducts(inputValue)
            .then((data) => {
                console.log(data);
                const options = data.map((item) => ({
                    label: item.id.toString(),
                    value: item.id,
                }));
                callback(options);
                handleChange(options[0]);
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
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    color: 'rgba(107, 137, 148, 0.65)',
                    fontSize: '14px',
                    left: '10px',
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: '10px',
                    zIndex: 1,
                }}
            >
                Seleccione Producto
            </div>
            <AsyncSelect
                menuPlacement="auto"
                menuPortalTarget={document.body}
                className={isInvalid}
                name={name}
                onChange={handleChange}
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                loadingMessage={() => 'Cargando...'}
                placeholder="Escriba el nombre del Producto"
                styles={errorStyle}
                value={selectedValue}
            />
        </div>
    );
};

ProductSearcher.propTypes = {
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    productId: PropTypes.number,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
};
