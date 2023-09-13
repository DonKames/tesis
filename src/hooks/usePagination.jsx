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
    const [showInactive, setShowInactive] = useState(false);

    useEffect(() => {
        console.log(pagesQty);

        const fetchData = async () => {
            try {
                setPagesQty(Math.ceil(itemsQty / limit));
                const fetchedItems = await getItems(1, limit, showInactive);
                console.log(showInactive);
                // console.log('setItems', fetchedItems);
                dispatch(setItems(fetchedItems));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [itemsQty, limit]);

    useEffect(() => {
        // Obtener la nueva cantidad de elementos

        if (showInactive !== undefined) {
            getItemsQty(showInactive).then((newItemsQty) => {
                dispatch(setItemsQty(newItemsQty));
            });
        }
    }, [showInactive]);

    const handlePageChange = async (pageNumber) => {
        setSelectedPage(pageNumber);
        const fetchedItems = await getItems(pageNumber, limit, showInactive);
        dispatch(setItems(fetchedItems));
    };

    return {
        handlePageChange,
        limit,
        pagesQty,
        setPagesQty,
        selectedPage,
        setLimit,
        setShowInactive,
        showInactive,
    };
};

export default usePagination;
