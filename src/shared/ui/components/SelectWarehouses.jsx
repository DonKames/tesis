import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesNames } from '../../../modules/locations/APIs/apiWarehouses';
import { uiSetWarehousesNames } from '../slice/uiSlice';

export const SelectWarehouses = ({ handleInputChange, name, warehouseId }) => {
    const dispatch = useDispatch();

    // Redux States
    const { warehousesNames } = useSelector((state) => state.ui);

    // Local States
    const [defaultValue, setDefaultValue] = useState({ value: '', label: '' });

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
        value: warehouse.id,
        label: warehouse.name,
    }));

    useEffect(() => {
        const defaultWarehouse = warehousesOptions.find(
            (warehouse) => warehouse.value === warehouseId,
        );

        const defaultValue = defaultWarehouse
            ? { value: defaultWarehouse.id, label: defaultWarehouse.name }
            : { value: '', label: '' };

        setDefaultValue(defaultValue);
    }, [warehousesNames, warehouseId]);

    const handleWarehouseChange = (warehouse) => {
        handleInputChange({
            target: {
                name,
                value: warehouse.value,
            },
        });
    };

    return (
        <Select
            defaultValue={defaultValue}
            isSearchable
            name={name}
            onChange={handleWarehouseChange}
            options={warehousesOptions}
            placeholder='Bodega'
        />
    );
};

SelectWarehouses.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    warehouseId: PropTypes.number,
};
