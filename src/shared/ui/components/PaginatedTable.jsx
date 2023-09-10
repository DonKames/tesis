import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Table, Pagination, Card, Row, Col, Form } from 'react-bootstrap';

export const PaginatedTable = ({
    columns, // columns: Los nombres de las columnas de la tabla.
    footerText, // footerText: Un texto opcional para mostrar en el pie de página de la tabla.
    handleLimitChange, // La función para manejar el cambio de límite.
    handlePageChange, // handlePageChange: La función para manejar el cambio de página.
    items, // items: Los elementos que se van a renderizar en la tabla.
    itemRenderer, // itemRenderer: Una función que toma un elemento y devuelve una fila de tabla JSX.
    limit, // El límite actual.
    maxPagesToShow = 19, // maxPagesToShow: La cantidad máxima de páginas que se mostrarán en la paginación.
    pagesQty, // pagesQty: La cantidad total de páginas.
    selectedPage, // selectedPage: La página seleccionada actualmente.
    setShowInactive, // setShowInactive: La función para manejar el cambio de mostrar elementos inactivos.
    showInactive, // showInactive: Un booleano que indica si se deben mostrar elementos inactivos.
    title, // title: El título de la tabla.
}) => {
    // console.log('limit', limit);
    const pagesBeforeCurrentItem = React.useMemo(
        () => Math.floor(maxPagesToShow / 2),
        [maxPagesToShow],
    );
    const pagesAfterCurrentItem = React.useMemo(
        () =>
            selectedPage < maxPagesToShow / 2
                ? maxPagesToShow - selectedPage
                : Math.floor(maxPagesToShow / 2),
        [maxPagesToShow, selectedPage],
    );

    const firstPageToShow = React.useMemo(
        () => Math.max(selectedPage - pagesBeforeCurrentItem, 1),
        [pagesBeforeCurrentItem, selectedPage],
    );
    const lastPageToShow = React.useMemo(
        () => Math.min(selectedPage + pagesAfterCurrentItem, pagesQty),
        [pagesAfterCurrentItem, selectedPage, pagesQty],
    );

    useEffect(() => {
        handlePageChange(selectedPage);
    }, [showInactive]);

    return (
        <>
            <Card className='shadow rounded animate__animated animate__fadeIn animate__fast'>
                <Card.Header>
                    <Row className='align-items-center'>
                        <Col className='fs-2'>{title}</Col>
                        <Col>
                            <Form.Check
                                reverse
                                label='Mostrar elementos inactivos: '
                                type='checkbox'
                                checked={showInactive}
                                onChange={() => setShowInactive(!showInactive)}
                            />
                        </Col>
                    </Row>
                </Card.Header>
                <Table
                    hover
                    responsive
                    className='m-0 rounded'
                >
                    <thead className='rounded'>
                        <tr>
                            {columns.map((column) => (
                                <th key={column}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{items.map(itemRenderer)}</tbody>
                </Table>
                {footerText && (
                    <Row className='align-items-center'>
                        <Col>
                            <div className='text-muted small mt-0 ms-3'>
                                {footerText}
                            </div>
                        </Col>
                        <Col>
                            <div className='text-muted text-end me-3'>
                                <label className='me-2'>
                                    Elementos por página:
                                    <select
                                        value={limit}
                                        onChange={(e) =>
                                            handleLimitChange(
                                                Number(e.target.value),
                                            )
                                        }
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </label>
                                <span
                                    className='text-primary text-center'
                                    onClick={() => handleLimitChange(10)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    10
                                </span>
                                {' | '}
                                <span
                                    className='text-primary text-center'
                                    onClick={() => handleLimitChange(20)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    20
                                </span>
                                {' | '}
                                <span
                                    className='text-primary text-center'
                                    onClick={() => handleLimitChange(50)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    50
                                </span>
                            </div>
                        </Col>
                    </Row>
                )}
            </Card>
            <Row className='mt-2 mb-3'>
                <Col className='d-flex justify-content-center'>
                    <Pagination className='shadow rounded'>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={selectedPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(selectedPage - 1)}
                            disabled={selectedPage === 1}
                        />
                        {firstPageToShow > 1 && <Pagination.Ellipsis />}
                        {Array.from(
                            {
                                length: lastPageToShow - firstPageToShow + 1,
                            },
                            (_, i) => firstPageToShow + i,
                        ).map((page) => (
                            <Pagination.Item
                                key={page}
                                active={page === selectedPage}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))}
                        {lastPageToShow < pagesQty && <Pagination.Ellipsis />}
                        <Pagination.Next
                            onClick={() => handlePageChange(selectedPage + 1)}
                            disabled={selectedPage === pagesQty}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(pagesQty)}
                            disabled={selectedPage === pagesQty}
                        />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
};

PaginatedTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    footerText: PropTypes.string,
    handleLimitChange: PropTypes.func,
    handlePageChange: PropTypes.func.isRequired,
    itemRenderer: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    limit: PropTypes.number,
    maxPagesToShow: PropTypes.number,
    pagesQty: PropTypes.number.isRequired,
    selectedPage: PropTypes.number.isRequired,
    setShowInactive: PropTypes.func,
    showInactive: PropTypes.bool,
    title: PropTypes.string.isRequired,
};
