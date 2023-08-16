import React from 'react';
import { useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import { getUsers, getUsersQty } from '../apis/apiUsers';
import { usersSetUsers, usersSetUsersQty } from '../slice/usersSlice';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';

export const UsersSection = () => {
    // Redux states
    const { users, usersQty, roles } = useSelector((state) => state.users);

    // Max pagination buttons to show
    const maxPaginationButtons = 10;

    // Pagination hook
    const { selectedPage, pagesQty, handlePageChange, setLimit, limit } =
        usePagination(
            getUsers,
            getUsersQty,
            usersSetUsers,
            usersSetUsersQty,
            usersQty,
            maxPaginationButtons,
        );

    // Table columns
    const tableColumns = ['Nombre', 'Apellido', 'E-mail', 'Rol'];

    // Table item renderer
    const itemRenderer = (user) => {
        return (
            <tr key={user.user_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                    {
                        roles?.find((role) => role.role_id === user.fk_role_id)
                            ?.name
                    }
                </td>
            </tr>
        );
    };

    return (
        <>
            <PaginatedTable
                items={users}
                columns={tableColumns}
                handlePageChange={handlePageChange}
                itemRenderer={itemRenderer}
                pagesQty={pagesQty}
                selectedPage={selectedPage}
                footerText={`Total de usuarios: ${usersQty} | Páginas Totales: ${pagesQty}`}
                handleLimitChange={setLimit}
                limit={limit}
            />
        </>
    );
};
