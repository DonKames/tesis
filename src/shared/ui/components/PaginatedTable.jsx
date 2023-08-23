import React from 'react';
import PropTypes from 'prop-types';

import { Table, Pagination, Card, Row, Col } from 'react-bootstrap';

export const PaginatedTable = ({
    items, // items: Los elementos que se van a renderizar en la tabla.
    columns, // columns: Los nombres de las columnas de la tabla.
    selectedPage, // selectedPage: La página seleccionada actualmente.
    pagesQty, // pagesQty: La cantidad total de páginas.
    handlePageChange, // handlePageChange: La función para manejar el cambio de página.
    itemRenderer, // itemRenderer: Una función que toma un elemento y devuelve una fila de tabla JSX.
    footerText, // footerText: Un texto opcional para mostrar en el pie de página de la tabla.
    maxPagesToShow = 19, // maxPagesToShow: La cantidad máxima de páginas que se mostrarán en la paginación.
    handleLimitChange, // La función para manejar el cambio de límite.
    limit, // El límite actual.
}) => {
    console.log('limit', limit);
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

    return (
        <>
            <Card className='shadow h-100 animate__animated animate__fadeIn animate__fast'>
                <Table
                    hover
                    responsive
                    striped
                    className='m-0 '
                >
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{items.map(itemRenderer)}</tbody>
                </Table>
                {footerText && (
                    <Row>
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
                    <Pagination className='shadow'>
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
    items: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedPage: PropTypes.number.isRequired,
    pagesQty: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    itemRenderer: PropTypes.func.isRequired,
    footerText: PropTypes.string,
    maxPagesToShow: PropTypes.number,
    handleLimitChange: PropTypes.func,
    limit: PropTypes.number,
};
