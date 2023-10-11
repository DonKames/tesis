import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchesNames } from '../../../modules/locations/APIs/branchesAPI';
import { uiSetBranchesNames } from '../slice/uiSlice';

export const SelectBranches = ({ onChange, name, branchId }) => {
    const dispatch = useDispatch();

    const { branchesNames } = useSelector((state) => state.ui);

    const [selectedValue, setSelectedValue] = useState(0);

    useEffect(() => {
        const fetchBranchesNames = async () => {
            try {
                if (!branchesNames.length) {
                    const fetchedBranchesNames = await getBranchesNames();
                    dispatch(uiSetBranchesNames(fetchedBranchesNames));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBranchesNames();
    }, []);

    useEffect(() => {
        const defaultBranch = branchesNames.find(
            (branch) => branch.id === branchId,
        );
        if (defaultBranch) {
            setSelectedValue({
                value: defaultBranch.id,
                label: defaultBranch.name,
            });
        }
    }, [branchId, branchesNames]);

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
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
            }}
            value={selectedValue}
            isSearchable
            name={name}
            onChange={handleChange}
            options={branchesNames.map((branch) => ({
                value: branch.id,
                label: branch.name,
            }))}
            placeholder="Selecciona una sucursal"
        />
    );
};

SelectBranches.propTypes = {
    branchId: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};
