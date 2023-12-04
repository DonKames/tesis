import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const usePagination = (
    getItems, // Función para obtener los elementos
    getItemsQty, // Función para obtener la cantidad total de elementos
    setItems, // Acción de Redux para almacenar los elementos
    setItemsQty, // Acción de Redux para almacenar la cantidad total de elementos
    itemsQty, // Cantidad total de elementos desde Redux
    initialLimit, // Límite de elementos por página
) => {
    const dispatch = useDispatch();

    const [selectedPage, setSelectedPage] = useState(1);
    const [pagesQty, setPagesQty] = useState(0);
    const [limit, setLimit] = useState(initialLimit);
    const [showInactive, setShowInactive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     // Obtener la nueva cantidad de elementos

    //     if (showInactive !== undefined) {
    //         getItemsQty({ showInactive, searchTerm }).then(
    //             (newItemsQtyInfo) => {
    //                 console.log(newItemsQtyInfo);
    //                 const { data } = newItemsQtyInfo;

    //                 // console.log(data);

    //                 // console.log(data, message);

    //                 dispatch(setItemsQty(data));
    //             },
    //         );
    //     }
    // }, [showInactive, searchTerm]);

    useEffect(() => {
        // console.log(pagesQty);

        const fetchData = async () => {
            try {
                const { data } = await getItems(
                    1,
                    limit,
                    showInactive,
                    searchTerm,
                );

                dispatch(setItemsQty(data.qty));

                setPagesQty(Math.ceil(itemsQty / limit));
                console.log('setItems');

                console.log(data);
                if (data) {
                    dispatch(setItems(data.data));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [itemsQty, limit, searchTerm]);

    const handlePageChange = async (pageNumber) => {
        setSelectedPage(pageNumber);
        const { data } = await getItems(
            pageNumber,
            limit,
            showInactive,
            searchTerm,
        );
        dispatch(setItems(data.data));
    };

    useEffect(() => {
        const socket = io('http://localhost:3000/api'); // Asegúrate de usar la URL correcta

        socket.on('dataUpdated', (updatedData) => {
            console.log('Datos actualizados recibidos:', updatedData);
            // Recargar los datos de la tabla
            handlePageChange(selectedPage);
        });

        return () => {
            socket.off('dataUpdated');
        };
    }, [selectedPage]);

    return {
        handlePageChange,
        limit,
        pagesQty,
        setPagesQty,
        selectedPage,
        setLimit,
        setShowInactive,
        showInactive,
        setSearchTerm,
        searchTerm,
    };
};

export default usePagination;
