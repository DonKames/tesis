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
    originalBranchId,
}) => {
    const dispatch = useDispatch();
    const { warehousesNames } = useSelector((state) => state.ui);
    const [selectedValue, setSelectedValue] = useState(0);
    // const [options, setOptions] = useState([]);

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

    useEffect(() => {
        if (originalBranchId !== selectedBranch) {
            setSelectedValue({
                value: options ? options[0]?.value : 0,
                label: options ? options[0]?.label : '',
            });
            handleInputChange({
                target: {
                    name,
                    value: options ? options[0]?.value : 0,
                },
            });
        }
    }, [selectedBranch]);

    return (
        <Select
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
            }}
            isSearchable
            name={name}
            onChange={handleWarehouseChange}
            options={options}
            placeholder="Seleccione su Bodega"
            value={selectedValue}
        />
    );
};

SelectWarehouses.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    originalBranchId: PropTypes.number,
    selectedBranch: PropTypes.number,
    warehouseId: PropTypes.number,
};

SelectWarehouses.defaultProps = {
    warehouseId: 0,
    selectedBranch: 0,
};
