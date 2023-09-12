import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'react-select';
import { getBranches } from '../../../api/branches';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

const SelectBranches = ({ value, onChange, disabled }) => {
    const dispatch = useDispatch();

    const { branchesNames } = useSelector((state) => state.locations);

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            const data = await getBranches();
            setBranches(data);
        };
        fetchBranches();
    }, []);

    return (
        <Select
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder='Select a branch'
            loading={!branches.length}
        >
            {branches.map((branch) => (
                <Option
                    key={branch.id}
                    value={branch.id}
                >
                    {branch.name}
                </Option>
            ))}
        </Select>
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

export default SelectBranches;
