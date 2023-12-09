import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getRegions } from '../../../modules/locations/APIs/apiRegions';
import { uiSetRegions } from '../slice/uiSlice';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectRegions = ({
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    regionId,
    selectedCountry,
    setFieldTouched,
    setFieldValue,
}) => {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(null);

    const { regions } = useSelector((state) => state.ui);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                if (!regions.length) {
                    const fetchedRegions = await getRegions();
                    dispatch(uiSetRegions(fetchedRegions));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRegions();
    }, []);

    useEffect(() => {
        const defaultRegion = regions.find((region) => region.id === regionId);
        if (defaultRegion) {
            setSelectedValue({
                value: defaultRegion.id,
                label: defaultRegion.name,
            });
        }
    }, [regionId, regions]);

    const handleChange = (selectedOption) => {
        if (setFieldValue && setFieldTouched) {
            setFieldValue(name, selectedOption.value, () => {
                setFieldTouched(name, true);
            });
            console.log('el primero ', selectedOption);
            console.log('el primero value: ', selectedValue);
        } else if (handleInputChange) {
            console.log('el segundo ', selectedOption);
            console.log('el segundo ', selectedValue);
            setSelectedValue(selectedOption);
            handleInputChange({
                target: {
                    name,
                    value: selectedOption.value,
                },
            });
        }
    };

    const options = regions
        .filter((region) => region.countryId === selectedCountry)
        .map((region) => ({
            label: region.name,
            value: region.id,
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
                Seleccione Región
            </div>
            <Select
                className={isInvalid ? 'is-invalid' : ''}
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleChange}
                options={options}
                placeholder="Región"
                styles={errorStyle}
                value={selectedValue}
            />
            {isInvalid && (
                <div className="invalid-feedback">{errorMessage}</div>
            )}
        </div>
    );
};

SelectRegions.propTypes = {
    errorMessage: PropTypes.string,
    regionId: PropTypes.number,
    handleInputChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    selectedCountry: PropTypes.number,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
};

// ! Lo anterior
// import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
// import Select from 'react-select';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRegions } from '../../../modules/locations/APIs/apiRegions';
// import { uiSetRegions } from '../slice/uiSlice';

// export const SelectRegions = ({
//     handleInputChange,
//     name,
//     regionId,
//     selectedCountry,
// }) => {
//     const dispatch = useDispatch();

//     const [selectedValue, setSelectedValue] = useState(0);

//     const { regions } = useSelector((state) => state.ui);

//     useEffect(() => {
//         const fetchRegions = async () => {
//             try {
//                 if (!regions.length) {
//                     const fetchedRegions = await getRegions();
//                     dispatch(uiSetRegions(fetchedRegions));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchRegions();
//     }, []);

//     useEffect(() => {
//         const defaultRegion = regions.find((region) => region.id === regionId);
//         if (defaultRegion) {
//             setSelectedValue({
//                 value: defaultRegion.id,
//                 label: defaultRegion.name,
//             });
//         }
//     }, [regionId, regions]);

//     const handleChange = (selectedOption) => {
//         setSelectedValue(selectedOption);
//         handleInputChange({
//             target: {
//                 name,
//                 value: selectedOption.value,
//             },
//         });
//     };

//     /* eslint-disable indent */
//     const options =
//         selectedCountry === 0
//             ? []
//             : regions
//                   .filter((region) => region.countryId === selectedCountry)
//                   .map((region) => ({
//                       value: region.id,
//                       label: region.name,
//                   }));

//     /* eslint-enable indent */

//     return (
//         <Select
//             isSearchable
//             name={name}
//             onChange={handleChange}
//             options={options}
//             placeholder="Región"
//             value={selectedValue}
//         />
//     );
// };

// SelectRegions.propTypes = {
//     handleInputChange: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired,
//     regionId: PropTypes.number.isRequired,
//     selectedCountry: PropTypes.number.isRequired,
// };
