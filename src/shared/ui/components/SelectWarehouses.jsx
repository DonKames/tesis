import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesNames } from '../../../modules/locations/APIs/warehouseAPI';
import { uiSetWarehousesNames } from '../slice/uiSlice';

export const SelectWarehouses = ({
    handleInputChange,
    name,
    warehouseId,
    selectedBranch,
}) => {
    const dispatch = useDispatch();
    const { warehousesNames } = useSelector((state) => state.ui);
    const [selectedValue, setSelectedValue] = useState(0);

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

    useEffect(() => {
        const defaultWarehouse = warehousesNames.find(
            (warehouse) => warehouse.id === warehouseId,
        );
        if (defaultWarehouse) {
            setSelectedValue({
                value: defaultWarehouse.id,
                label: defaultWarehouse.name,
            });
        }
    }, [warehouseId, warehousesNames]);

    const handleWarehouseChange = (selectedOption) => {
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
        selectedBranch === 0
            ? warehousesNames.map((warehouse) => ({
                  value: warehouse.id,
                  label: warehouse.name,
              }))
            : warehousesNames
                  .filter((warehouse) => warehouse.branchId === selectedBranch)
                  .map((warehouse) => ({
                      value: warehouse.id,
                      label: warehouse.name,
                  }));
    /* eslint-enable indent */

    return (
        <Select
            value={selectedValue}
            isSearchable
            name={name}
            onChange={handleWarehouseChange}
            options={options}
            placeholder="Seleccione su Bodega"
        />
    );
};

SelectWarehouses.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    warehouseId: PropTypes.number,
    selectedBranch: PropTypes.number,
};
