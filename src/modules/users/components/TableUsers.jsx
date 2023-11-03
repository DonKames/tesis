import React from 'react';
import { PaginatedTable } from '../../../shared/ui/components/PaginatedTable';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../../hooks/usePagination';
import { changeUserState, getUsers, getUsersQty } from '../apis/usersAPI';
import { usersSetUsers, usersSetUsersQty } from '../slice/usersSlice';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ModalEditUser } from './ModalEditUser';

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
                    <ModalEditUser userId={user.id} />

                    {user.active ? (
                        <Button
                            className="me-1 text-white"
                            variant="danger"
                            onClick={() => handleDeactivateUser(user.id)}
                        >
                            <i className="bi bi-trash" />
                        </Button>
                    ) : (
                        <Button
                            className="me-1"
                            variant="success"
                            onClick={() => handleActivateUser(user.id)}
                        >
                            <i className="bi bi-arrow-clockwise" />
                        </Button>
                    )}
                </td>
            </tr>
        );
    };

    const handleDeactivateUser = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Estás seguro que deseas desactivar al usuario?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, desactivar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                const { status, data } = await changeUserState(id, false);

                if (status === 'success') {
                    Swal.fire({
                        title: 'Usuario desactivado',
                        text: 'El usuario ha sido desactivado exitosamente',
                        icon: 'success',
                    });

                    const updatedUsers = users.map((user) =>
                        user.id === id ? { ...user, active: false } : user,
                    );

                    dispatch(usersSetUsers(updatedUsers));
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                });
            }
        }
    };

    const handleActivateUser = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Estás seguro que deseas activar al usuario?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3084d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, activar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                const { status, data, message } = await changeUserState(
                    id,
                    true,
                );

                if (status === 'success') {
                    Swal.fire({
                        title: 'Usuario activado',
                        text: message || 'No Message',
                        icon: 'success',
                    });

                    const updatedUsers = users.map((user) =>
                        user.id === id ? { ...user, active: true } : user,
                    );

                    dispatch(usersSetUsers(updatedUsers));
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo activar el usuario - Error al conectar con la API',
                    icon: 'error',
                });
            }
        }
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
