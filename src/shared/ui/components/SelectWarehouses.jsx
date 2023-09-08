import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesNames } from '../../../modules/locations/APIs/apiWarehouses';
import { uiSetWarehousesNames } from '../slice/uiSlice';

export const SelectWarehouses = ({ handleInputChange, name, warehouseId }) => {
    console.log(warehouseId);
    const dispatch = useDispatch();
    const { warehousesNames } = useSelector((state) => state.ui);
    const [selectedValue, setSelectedValue] = useState(null);

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

    return (
        <Select
            value={selectedValue}
            isSearchable
            name={name}
            onChange={handleWarehouseChange}
            options={warehousesNames.map((warehouse) => ({
                value: warehouse.id,
                label: warehouse.name,
            }))}
            placeholder='Bodega'
        />
    );
};

// export const SelectWarehouses = ({ handleInputChange, name, warehouseId }) => {
//     const dispatch = useDispatch();

//     console.log('selectWarehouses ID: ', warehouseId);

//     // Redux States
//     const { warehousesNames } = useSelector((state) => state.ui);

//     // Local States
//     const [defaultValue, setDefaultValue] = useState({ value: '', label: '' });

//     useEffect(() => {
//         const fetchWarehousesNames = async () => {
//             try {
//                 if (!warehousesNames.length) {
//                     const fetchedWarehousesNames = await getWarehousesNames();
//                     dispatch(uiSetWarehousesNames(fetchedWarehousesNames));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchWarehousesNames();
//     }, []);

//     const warehousesOptions = warehousesNames.map((warehouse) => ({
//         value: warehouse.id,
//         label: warehouse.name,
//     }));

//     const defaultWarehouse = warehousesOptions.find(
//         (warehouse) => warehouse.value === warehouseId,
//     );

//     console.log(defaultWarehouse);

//     const newDefaultValue = defaultWarehouse
//         ? { value: defaultWarehouse.value, label: defaultWarehouse.label }
//         : { value: '', label: '' };

//     setDefaultValue(newDefaultValue);
//     console.log(defaultValue);

//     const handleWarehouseChange = (warehouse) => {
//         handleInputChange({
//             target: {
//                 name,
//                 value: warehouse.value,
//             },
//         });
//     };

//     return (
//         <Select
//             defaultValue={defaultValue}
//             isSearchable
//             name={name}
//             onChange={handleWarehouseChange}
//             options={warehousesOptions}
//             placeholder='Bodega'
//         />
//     );
// };

SelectWarehouses.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    warehouseId: PropTypes.number,
};
