import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { SelectCountries } from '../../../shared/ui/components/SelectCountries';
import { SelectRegions } from '../../../shared/ui/components/SelectRegions';

// Validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SelectMunicipalities } from '../../../shared/ui/components/SelectMunicipalities';

const validationSchema = Yup.object({
    branchName: Yup.string().required(
        'El nombre de la sucursal es obligatorio',
    ),
    country: Yup.number()
        .required('El país es obligatorio')
        .notOneOf([0], 'Debe elegir un País'),
    region: Yup.number()
        .required('La región es obligatoria')
        .notOneOf([0], 'Debe elegir una Región'),
    municipality: Yup.number()
        .required('La comuna es obligatoria')
        .notOneOf([0], 'Debe elegir una Comuna'),
    address: Yup.string().required('La dirección es obligatoria'),
});

export const AddBranchModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleFormSubmit = (values, { errors }) => {
        console.log('Form errors:', errors);
        console.log('click formSubmit');
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            branchName: '',
            country: 35,
            region: 0,
            municipality: 0,
            address: '',
        },
        validationSchema,
        onSubmit: handleFormSubmit,
    });

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        formik.resetForm();
        // reset();
    };

    return (
        <>
            <Button variant="primary shadow" onClick={handleOpenModal}>
                Agregar Sucursal
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Agregar Sucursal</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Nombre Sucursal
                                    </Form.Label>
                                    <Form.Control
                                        className={
                                            formik.touched.branchName &&
                                            formik.errors.branchName
                                                ? 'is-invalid'
                                                : ''
                                        }
                                        type="text"
                                        placeholder="Ingrese el nombre de la Sucursal"
                                        name="branchName"
                                        value={formik.values.branchName}
                                        onChange={formik.handleChange}
                                        isInvalid={
                                            formik.touched.branchName &&
                                            formik.errors.branchName
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.branchName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        País
                                    </Form.Label>
                                    <SelectCountries
                                        setFieldValue={formik.setFieldValue}
                                        setFieldTouched={formik.setFieldTouched}
                                        name="country"
                                        countryId={formik.values.country}
                                        isInvalid={
                                            formik.touched.country &&
                                            !!formik.errors.country
                                        }
                                        errorMessage={formik.errors.country}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Región
                                    </Form.Label>
                                    <SelectRegions
                                        setFieldValue={formik.setFieldValue}
                                        setFieldTouched={formik.setFieldTouched}
                                        name="region"
                                        regionId={formik.values.region}
                                        selectedCountry={formik.values.country}
                                        isInvalid={
                                            formik.touched.region &&
                                            !!formik.errors.region
                                        }
                                        errorMessage={formik.errors.region}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Comuna
                                    </Form.Label>
                                    <SelectMunicipalities
                                        setFieldValue={formik.setFieldValue}
                                        setFieldTouched={formik.setFieldTouched}
                                        name="municipality"
                                        municipalityId={
                                            formik.values.municipality
                                        }
                                        selectedRegion={formik.values.region}
                                        isInvalid={
                                            formik.touched.municipality &&
                                            !!formik.errors.municipality
                                        }
                                        errorMessage={
                                            formik.errors.municipality
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="mb-0 ms-1">
                                        Dirección
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la Dirección"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        isInvalid={
                                            formik.touched.address &&
                                            formik.errors.address
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Agregar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

// import React, { useState } from 'react';

// import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import Swal from 'sweetalert2';

// import { createBranch, getBranches } from '../APIs/branchesAPI';
// import { useForm } from '../../../hooks/useForm';
// import { getWarehouses } from '../APIs/warehouseAPI';
// import {
//     locationsSetBranches,
//     locationsSetWarehouses,
// } from '../slice/locationsSlice';
// import { SelectCountries } from '../../../shared/ui/components/SelectCountries';
// import { SelectRegions } from '../../../shared/ui/components/SelectRegions';
// import { SelectMunicipalities } from '../../../shared/ui/components/SelectMunicipalities';

// // Validation
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// export const AddBranchModal = () => {
//     const dispatch = useDispatch();

//     // Local State
//     const [showModal, setShowModal] = useState(false);

//     // *Antes del cambio
//     // const [formValues, handleInputChange, reset] = useForm({
//     //     address: '',
//     //     branchName: '',
//     //     country: 35,
//     //     municipality: 0,
//     //     region: 0,
//     // });

//     const { branchName, country, address, municipality, region } = formValues;

//     const handleCloseModal = () => {
//         setShowModal(false);
//         reset();
//     };

//     const handleOpenModal = () => {
//         setShowModal(true);
//     };

//     const handleFormSubmit = async (e) => {
//         // console.log('form submit');
//         // console.log(JSON.stringify(formValues));
//         e.preventDefault();
//         const response = await createBranch(formValues);

//         if (response) {
//             Swal.fire({
//                 icon: 'success',
//                 showConfirmButton: false,
//                 timer: 1500,
//                 title: 'Sucursal creada con éxito',
//             });

//             handleCloseModal();

//             console.log('entro al AddBranchModal');
//             const branches = await getBranches();
//             dispatch(locationsSetBranches(branches));

//             const warehouses = await getWarehouses();
//             dispatch(locationsSetWarehouses(warehouses));
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al agregar la sucursal',
//                 text: 'Ha ocurrido un error al intentar agregar la sucursal. Por favor, inténtalo nuevamente.',
//             });
//         }
//     };

//     return (
//         <>
//             <Button variant="primary" onClick={handleOpenModal}>
//                 Agregar Sucursal
//             </Button>
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Agregar Sucursal</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleFormSubmit}>
//                         <Row>
//                             <Col>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Nombre Sucursal</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Ingrese el nombre de la Sucursal"
//                                         name="branchName"
//                                         value={branchName}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>País</Form.Label>
//                                     <SelectCountries
//                                         handleInputChange={handleInputChange}
//                                         name="country"
//                                         countryId={country}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Región</Form.Label>
//                                     <SelectRegions
//                                         handleInputChange={handleInputChange}
//                                         name="region"
//                                         regionId={region}
//                                         selectedCountry={country}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Form.Group>
//                             <Form.Label>Comuna</Form.Label>
//                             <SelectMunicipalities
//                                 handleInputChange={handleInputChange}
//                                 name="municipality"
//                                 municipalityId={municipality}
//                                 selectedRegion={region}
//                             />
//                         </Form.Group>
//                         <Form.Group>
//                             <Form.Label>Dirección</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Ingrese la Dirección"
//                                 name="address"
//                                 value={address}
//                                 onChange={handleInputChange}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button
//                         type="button"
//                         variant="primary"
//                         onClick={handleFormSubmit}
//                     >
//                         Guardar Sucursal
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };
