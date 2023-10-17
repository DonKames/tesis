import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';

export const SelectProducts = ({ handleInputChange, name, productId }) => {
    const dispatch = useDispatch();

    // Redux States
    const { productsNames } = useSelector((state) => state.ui);

    // Local States
    const [selectedValue, setSelectedValue] = useState(0);

    useEffect(() => {
        const fetchProductsNames = async () => {
            try {
                if (!productsNames.length) {
                    const fetchedProductsNames = await getProductsNames();
                    dispatch(uiSetProductsNames(fetchedProductsNames));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProductsNames();
    }, []);

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
            options={productsNames.map((product) => ({
                value: product.id,
                label: product.name,
            }))}
            placeholder="Seleccione su Producto"
            value={selectedValue}
        />
    );
};

SelectProducts.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    productId: PropTypes.number,
};
