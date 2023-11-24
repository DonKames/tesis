import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getWarehousesNames } from '../../../modules/locations/APIs/warehouseAPI';
import { uiSetWarehousesNames } from '../slice/uiSlice';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectWarehouses = ({
    branchId,
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    originalBranchId,
    setFieldTouched,
    setFieldValue,
    warehouseId,
}) => {
    const dispatch = useDispatch();

    // Local State
    const [selectedValue, setSelectedValue] = useState(0);
    const [options, setOptions] = useState([]);

    // Redux State
    const { warehousesNames } = useSelector((state) => state.ui);

    useEffect(() => {
        const fetchWarehousesNames = async () => {
            try {
                if (!warehousesNames.length) {
                    const fetchedWarehousesNames = await getWarehousesNames();
                    dispatch(uiSetWarehousesNames(fetchedWarehousesNames));
                }
            } catch (error) {}
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

    const handleChange = (selectedOption) => {
        if (setFieldValue && setFieldTouched) {
            setFieldValue(name, selectedOption.value, () => {
                setFieldTouched(name, true);
            });
        } else if (handleInputChange) {
            setSelectedValue(selectedOption);

            handleInputChange({
                target: {
                    name,
                    value: selectedOption.value,
                },
            });
        }
    };

    useEffect(() => {
        let updatedOptions;

        if (branchId === 0 || branchId === null || branchId === undefined) {
            updatedOptions = warehousesNames.map((warehouse) => ({
                label: warehouse.name,
                value: warehouse.id,
            }));
        } else {
            updatedOptions = warehousesNames
                .filter((warehouse) => warehouse.branchId === branchId)
                .map((warehouse) => ({
                    label: warehouse.name,
                    value: warehouse.id,
                }));
        }

        setOptions(updatedOptions);
    }, [branchId, warehousesNames]);

    // ! Revisar esta parte, comentado funciona.
    // FIXME
    // useEffect(() => {
    //     if (originalBranchId !== selectedBranch) {
    //
    //         setSelectedValue({
    //             value: options ? options[0]?.value : 0,
    //             label: options ? options[0]?.label : '',
    //         });
    //         handleInputChange({
    //             target: {
    //                 name,
    //                 value: options ? options[0]?.value : 0,
    //             },
    //         });
    //     }
    // }, [selectedBranch]);

    return (
        <>
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
                    Seleccione Bodega
                </div>
                <Select
                    menuPlacement="auto"
                    menuPortalTarget={document.body}
                    className={isInvalid ? 'is-invalid' : ''}
                    // components={}
                    isInvalid={isInvalid}
                    isSearchable
                    name={name}
                    onChange={handleChange}
                    options={options}
                    placeholder="Seleccione su Bodega"
                    styles={errorStyle}
                    value={selectedValue}
                />
                {isInvalid && (
                    <div className="invalid-feedback">{errorMessage}</div>
                )}
            </div>
        </>
    );
};

SelectWarehouses.propTypes = {
    branchId: PropTypes.number,
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    originalBranchId: PropTypes.number,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
    warehouseId: PropTypes.number,
};

SelectWarehouses.defaultProps = {
    warehouseId: 0,
    selectedBranch: 0,
};
