import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const usePagination = (
    getItems, // Función para obtener los elementos
    getItemsQty, // Función para obtener la cantidad total de elementos
    setItems, // Acción de Redux para almacenar los elementos
    setItemsQty, // Acción de Redux para almacenar la cantidad total de elementos
    itemsQty, // Cantidad total de elementos desde Redux
    limit, // Límite de elementos por página
) => {
    const dispatch = useDispatch();

    const [selectedPage, setSelectedPage] = useState(1);
    const [pagesQty, setPagesQty] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (itemsQty === null) {
                const qty = await getItemsQty();
                setPagesQty(Math.ceil(qty / limit));
                dispatch(setItemsQty(qty)); // Aquí se almacena la cantidad en Redux
            } else {
                setPagesQty(Math.ceil(itemsQty / limit));
                const fetchedItems = await getItems(1, limit);
                console.log(fetchedItems);
                dispatch(setItems(fetchedItems));
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
    };
};

export default usePagination;
