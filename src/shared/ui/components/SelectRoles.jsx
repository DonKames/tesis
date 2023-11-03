import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import { getRolesSelect } from '../../../modules/users/apis/rolesAPI';
import { uiSetRoles } from '../slice/uiSlice';

import PropTypes from 'prop-types';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectRoles = ({
    roleId,
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    setFieldTouched,
    setFieldValue,
}) => {
    const dispatch = useDispatch();

    const { roles } = useSelector((state) => state.ui);

    const [selectedValue, setSelectedValue] = useState(0);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                if (!roles.length) {
                    const fetchedRoles = await getRolesSelect();

                    console.log(fetchedRoles);
                    dispatch(uiSetRoles(fetchedRoles));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        const defaultRole = roles.find((role) => role.id === roleId);
        if (defaultRole) {
            setSelectedValue({
                value: defaultRole.id,
                label: defaultRole.name,
            });
        }
    }, [roleId, roles]);

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
                    Seleccione Rol
                </div>
                <Select
                    menuPlacement="auto"
                    menuPortalTarget={document.body}
                    className={isInvalid ? 'is-invalid' : ''}
                    isInvalid={isInvalid}
                    value={selectedValue}
                    isSearchable
                    name={name}
                    onChange={handleChange}
                    options={roles.map((role) => ({
                        value: role.id,
                        label: role.name,
                    }))}
                    placeholder="Seleccione un rol"
                    styles={errorStyle}
                />
                {isInvalid && (
                    <div className="invalid-feedback">{errorMessage}</div>
                )}
            </div>
        </>
    );
};

SelectRoles.propTypes = {
    roleId: PropTypes.number,
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
};
