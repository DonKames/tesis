import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Select from 'react-select';
import { getUsersNames } from '../../../modules/users/apis/usersAPI';
import { uiSetUsersNames } from '../slice/uiSlice';

export const SelectUsers = ({ onChange, name, userId }) => {
    const dispatch = useDispatch();

    const { usersNames } = useSelector((state) => state.ui);

    const [selectedValue, setSelectedValue] = useState(0);

    useEffect(() => {
        const fetchUsersNames = async () => {
            try {
                if (!usersNames.length) {
                    const fetchedUsersNames = await getUsersNames();
                    dispatch(uiSetUsersNames(fetchedUsersNames));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsersNames();
    }, []);

    useEffect(() => {
        const defaultUser = usersNames.find((user) => user.id === userId);
        if (defaultUser) {
            setSelectedValue({
                value: defaultUser.id,
                label: defaultUser.name,
            });
        }
    }, [userId, usersNames]);

    const options = usersNames.map((user) => ({
        value: user.id,
        label: user.name,
    }));

    const handleChange = (selectedOption) => {
        console.log(selectedOption);
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
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
            }}
            className="text-truncate"
            classNamePrefix="select"
            value={selectedValue}
            isSearchable
            name={name}
            options={options}
            placeholder="Seleccione un usuario"
            onChange={handleChange}
        />
    );
};

SelectUsers.propTypes = {
    userId: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
