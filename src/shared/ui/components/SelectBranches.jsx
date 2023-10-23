import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchesNames } from '../../../modules/locations/APIs/branchesAPI';
import { uiSetBranchesNames } from '../slice/uiSlice';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectBranches = ({
    branchId,
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    setFieldTouched,
    setFieldValue,
}) => {
    const dispatch = useDispatch();

    // Redux State
    const { branches } = useSelector((state) => state.locations);

    // Local State
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                if (!branches.length) {
                    const fetchedBranches = await getBranchesNames();
                    dispatch(uiSetBranchesNames(fetchedBranches));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBranches();
    }, []);

    const options = branches.map((branch) => ({
        label: branch.name,
        value: branch.id,
    }));

    const handleChange = (selectedOption) => {
        if (setFieldValue && setFieldTouched) {
            setFieldValue(name, selectedOption.value, () => {
                setFieldTouched(name, true);
            });
        } else {
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
            <Select
                className={isInvalid ? 'is-invalid' : ''}
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleChange}
                options={options}
                placeholder="Selecciona una sucursal"
                styles={errorStyle}
                value={selectedValue}
            />
        </>
    );
};

// export const SelectBranches = ({ onChange, name, branchId }) => {
//     const dispatch = useDispatch();

//     const { branchesNames } = useSelector((state) => state.ui);

//     const [selectedValue, setSelectedValue] = useState(0);

//     useEffect(() => {
//         const fetchBranchesNames = async () => {
//             try {
//                 if (!branchesNames.length) {
//                     const fetchedBranchesNames = await getBranchesNames();
//                     dispatch(uiSetBranchesNames(fetchedBranchesNames));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchBranchesNames();
//     }, []);

//     useEffect(() => {
//         const defaultBranch = branchesNames.find(
//             (branch) => branch.id === branchId,
//         );
//         if (defaultBranch) {
//             setSelectedValue({
//                 value: defaultBranch.id,
//                 label: defaultBranch.name,
//             });
//         }
//     }, [branchId, branchesNames]);

//     const handleChange = (selectedOption) => {
//         console.log(selectedOption);
//         setSelectedValue(selectedOption);
//         onChange({
//             target: {
//                 name,
//                 value: selectedOption.value,
//             },
//         });
//     };

//     return (
//         <Select
//             menuPortalTarget={document.body}
//             styles={{
//                 menuPortal: (base) => ({ ...base, zIndex: 99999 }),
//             }}
//             value={selectedValue}
//             isSearchable
//             name={name}
//             onChange={handleChange}
//             options={branchesNames.map((branch) => ({
//                 value: branch.id,
//                 label: branch.name,
//             }))}
//             placeholder="Selecciona una sucursal"
//         />
//     );
// };

SelectBranches.propTypes = {
    branchId: PropTypes.number,
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
};
