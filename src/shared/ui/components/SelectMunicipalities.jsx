import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getMunicipalities } from '../../../modules/locations/APIs/municipalityAPI';
import { uiSetMunicipalities } from '../slice/uiSlice';
import { errorStyle } from '../../../styles/selectStyles';

export const SelectMunicipalities = ({
    errorMessage,
    handleInputChange,
    isInvalid,
    name,
    municipalityId,
    selectedRegion,
    setFieldTouched,
    setFieldValue,
}) => {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(null);

    const { municipalities } = useSelector((state) => state.ui);

    useEffect(() => {
        const fetchMunicipalities = async () => {
            try {
                if (!municipalities.length) {
                    const fetchedMunicipalities = await getMunicipalities();
                    dispatch(uiSetMunicipalities(fetchedMunicipalities));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchMunicipalities();
    }, []);

    useEffect(() => {
        const defaultMunicipality = municipalities.find(
            (municipality) => municipality.id === municipalityId,
        );
        if (defaultMunicipality) {
            setSelectedValue({
                value: defaultMunicipality.id,
                label: defaultMunicipality.name,
            });
        }
    }, [municipalityId, municipalities]);

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

    const options = municipalities
        .filter((municipality) => municipality.regionId === selectedRegion)
        .map((municipality) => ({
            value: municipality.id,
            label: municipality.name,
        }));

    return (
        <>
            <Select
                className={isInvalid ? 'is-invalid' : ''}
                isInvalid={isInvalid}
                isSearchable
                name={name}
                onChange={handleChange}
                options={options}
                placeholder="Comuna"
                styles={errorStyle}
                value={selectedValue}
            />
            {isInvalid && (
                <div className="invalid-feedback">{errorMessage}</div>
            )}
        </>
    );
};

SelectMunicipalities.propTypes = {
    errorMessage: PropTypes.string,
    handleInputChange: PropTypes.func,
    isInvalid: PropTypes.bool,
    name: PropTypes.string.isRequired,
    municipalityId: PropTypes.number,
    selectedRegion: PropTypes.number,
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
};

// import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
// import Select from 'react-select';
// import { useDispatch, useSelector } from 'react-redux';
// import { uiSetMunicipalities } from '../slice/uiSlice';
// import { getMunicipalities } from '../../../modules/locations/APIs/municipalityAPI';

// export const SelectMunicipalities = ({
//     handleInputChange,
//     name,
//     municipalityId,
//     selectedRegion,
// }) => {
//     const dispatch = useDispatch();

//     const [selectedValue, setSelectedValue] = useState(0);

//     const { municipalities } = useSelector((state) => state.ui);

//     useEffect(() => {
//         const fetchMunicipalities = async () => {
//             try {
//                 if (!municipalities.length) {
//                     const fetchedMunicipalities = await getMunicipalities();
//                     dispatch(uiSetMunicipalities(fetchedMunicipalities));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchMunicipalities();
//     }, []);

//     useEffect(() => {
//         const defaultMunicipality = municipalities.find(
//             (municipality) => municipality.id === municipalityId,
//         );

//         console.log(defaultMunicipality);

//         if (defaultMunicipality) {
//             setSelectedValue({
//                 value: defaultMunicipality.id,
//                 label: defaultMunicipality.name,
//             });
//         }
//     }, [municipalityId, municipalities]);

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
//         selectedRegion === 0
//             ? municipalities.map((municipality) => ({
//                   value: municipality.id,
//                   label: municipality.name,
//               }))
//             : municipalities
//                   .filter(
//                       (municipality) =>
//                           municipality.regionId === selectedRegion,
//                   )
//                   .map((municipality) => ({
//                       value: municipality.id,
//                       label: municipality.name,
//                   }));

//     /* eslint-enable indent */

//     return (
//         <Select
//             isSearchable
//             name={name}
//             onChange={handleChange}
//             options={options}
//             placeholder="Comuna"
//             value={selectedValue}
//         />
//     );
// };

// SelectMunicipalities.propTypes = {
//     handleInputChange: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired,
//     municipalityId: PropTypes.number.isRequired,
//     selectedRegion: PropTypes.number.isRequired,
// };
