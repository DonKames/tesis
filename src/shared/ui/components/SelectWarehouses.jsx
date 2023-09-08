import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesNames } from '../../../modules/locations/APIs/apiWarehouses';
import { uiSetWarehousesNames } from '../slice/uiSlice';

export const SelectWarehouses = ({ handleInputChange, name }) => {
    const dispatch = useDispatch();
    const { warehousesNames } = useSelector((state) => state.ui);

    useEffect(() => {
        const fetchWarehousesNames = async () => {
            try {
                if (!warehousesNames.length) {
                    const fetchedWarehousesNames = await getWarehousesNames();
                    dispatch(uiSetWarehousesNames(fetchedWarehousesNames));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchWarehousesNames();
    }, []);

    const warehousesOptions = warehousesNames.map((warehouse) => ({
        value: warehouse.warehouse_id,
        label: warehouse.name,
    }));

    return (
        <Select
            isSearchable
            name={name}
            onChange={handleInputChange}
            options={warehousesOptions}
            placeholder='Bodega'
        />
    );
};

SelectWarehouses.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
