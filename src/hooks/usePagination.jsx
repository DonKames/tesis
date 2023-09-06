import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setPagesQty(Math.ceil(itemsQty / limit));
                const fetchedItems = await getItems(1, limit);
                console.log('setItems', fetchedItems);
                dispatch(setItems(fetchedItems));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [
        dispatch,
        getItems,
        getItemsQty,
        setItems,
        setItemsQty,
        itemsQty,
        limit,
    ]);

    const handlePageChange = async (pageNumber) => {
        setSelectedPage(pageNumber);
        const fetchedItems = await getItems(pageNumber, limit);
        dispatch(setItems(fetchedItems));
    };

    return {
        selectedPage,
        pagesQty,
        handlePageChange,
        setLimit,
        limit,
    };
};

export default usePagination;
