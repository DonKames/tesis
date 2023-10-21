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
    // Redux State
    const { brances: branches } = useSelector((state) => state.locations);

    // Local State
    const [selectedValue, setSelectedValue] = useState(null);

    const options = branches.map((branch) => ({
        label: branch.name,
        value: branch.id,
    }));
    return (
        <>
            <Select
                className={isInvalid ? 'is-invalid' : ''}
                isDisabled={true}
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleInputChange}
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
