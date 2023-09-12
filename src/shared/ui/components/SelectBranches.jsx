import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchesNames } from '../../../modules/locations/APIs/branchesAPI';
import { uiSetBranchesNames } from '../slice/uiSlice';

export const SelectBranches = ({ onChange, name, branchId }) => {
    const dispatch = useDispatch();

    const { branchesNames } = useSelector((state) => state.locations);

    const [selectedValue, setSelectedValue] = useState(null);

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

    return (
        <Select
            value={selectedValue}
            onChange={onChange}
            placeholder='Selecciona una sucursal'
        />
    );
};

SelectBranches.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

SelectBranches.defaultProps = {
    value: undefined,
    disabled: false,
};
