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
        // Obtener la nueva cantidad de elementos

        if (showInactive !== undefined) {
            getItemsQty(showInactive).then((newItemsQty) => {
                dispatch(setItemsQty(newItemsQty));
            });
        }
    }, [showInactive]);

    useEffect(() => {
        console.log(pagesQty);

        const fetchData = async () => {
            try {
                setPagesQty(Math.ceil(itemsQty / limit));
                const { data } = await getItems(1, limit, showInactive);
                // console.log('setItems', fetchedItems);

                console.log(data);
                if (data) {
                    dispatch(setItems(data));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [itemsQty, limit]);

    const handlePageChange = async (pageNumber) => {
        setSelectedPage(pageNumber);
        const { status, data, message } = await getItems(
            pageNumber,
            limit,
            showInactive,
        );
        dispatch(setItems(data));
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
