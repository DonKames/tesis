import React from 'react';
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
}) => {
    const pagesBeforeCurrentItem = Math.floor(maxPagesToShow / 2);
    const pagesAfterCurrentItem =
        selectedPage < maxPagesToShow / 2
            ? maxPagesToShow - selectedPage
            : Math.floor(maxPagesToShow / 2);

    const firstPageToShow = Math.max(selectedPage - pagesBeforeCurrentItem, 1);
    const lastPageToShow = Math.min(
        selectedPage + pagesAfterCurrentItem,
        pagesQty,
    );

    return (
        <>
            <Card>
                <Table
                    responsive
                    striped
                    hover
                    className='mb-0'
                >
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{items.map(itemRenderer)}</tbody>
                </Table>
                {footerText && (
                    <div className='text-muted small text-center mt-0'>
                        {footerText}
                    </div>
                )}
            </Card>
            <Row className='mt-2'>
                <Col className='d-flex justify-content-center'>
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev
                            onClick={() => handlePageChange(selectedPage - 1)}
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
                        <Pagination.Next
                            onClick={() => handlePageChange(selectedPage + 1)}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(pagesQty)}
                        />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
};
