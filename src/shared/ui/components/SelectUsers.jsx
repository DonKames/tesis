import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Select from 'react-select';
import { getUsersNames } from '../../../modules/users/apis/usersAPI';
import { uiSetUsersNames } from '../slice/uiSlice';
import { capitalizeFirstLetter } from '../../utils/stringUtils';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectUsers = ({
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    setFieldTouched,
    setFieldValue,
    userId,
}) => {
    const dispatch = useDispatch();

    // Redux State
    const { usersNames } = useSelector((state) => state.ui);

    // Local State
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
                label:
                    capitalizeFirstLetter(defaultUser.name) +
                    ' ' +
                    capitalizeFirstLetter(defaultUser.lastName),
            });
        }
    }, [userId, usersNames]);

    const handleChange = (selectedOption) => {
        if (setFieldValue && setFieldTouched) {
            setFieldValue(name, selectedOption.value, () => {
                setFieldTouched(name, true);
            });
        } else if (handleInputChange) {
            console.log(selectedOption);
            setSelectedValue(selectedOption);
            handleInputChange({
                target: {
                    name,
                    value: selectedOption.value,
                },
            });
        }
    };

    const options = usersNames.map((user) => ({
        value: user.id,
        label:
            capitalizeFirstLetter(user.name) +
            ' ' +
            capitalizeFirstLetter(user.lastName),
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
                Seleccione Usuario
            </div>
            <Select
                menuPlacement="auto"
                menuPortalTarget={document.body}
                className={
                    isInvalid ? 'is-invalid text-truncate' : 'text-truncate'
                }
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleChange}
                options={options}
                placeholder="Seleccione un usuario"
                styles={errorStyle}
                value={selectedValue}
            />
        </div>
    );
};

SelectUsers.propTypes = {
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
    userId: PropTypes.number,
};
