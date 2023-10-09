import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import { getRoles, getRolesSelect } from '../../../modules/users/apis/rolesAPI';
import { uiSetRoles } from '../slice/uiSlice';

import PropTypes from 'prop-types';

export const SelectRoles = ({ onChange, name, roleId }) => {
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
        setSelectedValue(selectedOption);
        onChange({
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
            onChange={handleChange}
            options={roles.map((role) => ({
                value: role.id,
                label: role.name,
            }))}
            placeholder="Seleccione un rol"
        />
    );
};

SelectRoles.propTypes = {
    roleId: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
