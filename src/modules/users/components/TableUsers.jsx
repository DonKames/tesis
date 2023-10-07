import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import { getUsers, getUsersQty } from '../apis/usersAPI';
import { usersSetUsers, usersSetUsersQty } from '../slice/usersSlice';
import { Button } from 'react-bootstrap';

export const TableUsers = () => {
    const dispatch = useDispatch();

    // Redux State
    const { users, usersQty } = useSelector((state) => state.users);

    const maxPaginationButtons = 10;

    const tableColumns = [
        { name: 'Nombre', className: '' },
        { name: 'Apellido', className: '' },
        { name: 'Email', className: '' },
        { name: 'Rol', className: '' },
        { name: '', className: '' },
    ];

    const {
        handlePageChange,
        limit,
        pagesQty,
        selectedPage,
        setLimit,
        setPagesQty,
        setShowInactive,
        showInactive,
    } = usePagination(
        getUsers,
        getUsersQty,
        usersSetUsers,
        usersSetUsersQty,
        usersQty,
        maxPaginationButtons,
    );

    const itemRenderer = (user) => {
        return (
            <tr key={user.id} className={user.active ? '' : 'table-danger'}>
                <td className="align-middle">{user.name}</td>
                <td className="align-middle">{user.lastName}</td>
                <td className="align-middle">{user.email}</td>
                <td className="align-middle">{user.roleName}</td>
                <td className="align-middle text-end">
                    <Button className="me-1">
                        <i className="bi bi-pencil-square" />
                    </Button>
                    {user.active ? (
                        <Button className="me-1 text-white" variant="danger">
                            <i className="bi bi-trash" />
                        </Button>
                    ) : (
                        <Button className="me-1" variant="success">
                            <i className="bi bi-arrow-clockwise" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <>
            <PaginatedTable
                columns={tableColumns}
                footerText={`Total de usuarios: ${usersQty} | Páginas Totales: ${pagesQty}`}
                handleLimitChange={setLimit}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                items={users}
                limit={limit}
                maxPagesToShow={maxPaginationButtons}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                setPagesQty={setPagesQty}
                setShowInactive={setShowInactive}
                showInactive={showInactive}
                title="Usuarios"
            />
        </>
    );
};
