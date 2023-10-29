import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { uiSetSkusNames } from '../slice/uiSlice';
import { getSkusNames } from '../../../modules/products/APIs/skusAPI';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectSkus = ({
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    setFieldTouched,
    setFieldValue,
    skuId,
}) => {
    const dispatch = useDispatch();

    // Redux State
    const { skusNames } = useSelector((state) => state.ui);

    // Local State
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

        setSelectedValue(selectedOption);
        handleInputChange({
            target: {
                name,
                value: selectedOption.value,
            },
        });
    };

    const options = skusNames.map((sku) => ({
        value: sku.id,
        label: sku.name,
    }));

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
                Seleccione Sku
            </div>
            <Select
                menuPlacement="auto"
                menuPortalTarget={document.body}
                className={isInvalid ? 'is-invalid' : ''}
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleChange}
                options={options}
                placeholder="Seleccione su Sku"
                styles={errorStyle}
                value={selectedValue}
            />
        </div>
    );
};

SelectSkus.propTypes = {
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
    skuId: PropTypes.number,
};
