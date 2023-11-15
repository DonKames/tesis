import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CustomBarChart } from '../../../../shared/ui/components/charts/CustomBarChart';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProductsCountByWarehouse,
    getProductsQty,
} from '../../../products/APIs/productsAPI';
import { productsSetProductQty } from '../../../products/slice/productsSlice';

export const InventoryOverview = () => {
    const dispatch = useDispatch();

    const [warehouseData, setWarehouseData] = useState(null);

    const { productsQty } = useSelector((state) => state.products);

    const getChartData = async () => {
        const data = await getProductsCountByWarehouse();
        // console.log(data);

        const formattedData = data.map((element) => {
            return {
                name: element.warehouseName,
                Cantidad: parseInt(element.qty),
            };
        });

        setWarehouseData(formattedData);
    };

    // useEffects
    useEffect(() => {
        getChartData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getProductsQty({
                    showInactive: true,
                });

                dispatch(productsSetProductQty(data));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Row>
                <Col className="mt-3">
                    <h6>Visión General del Inventario</h6>
                    <div>Total de Ítems: {productsQty}</div>
                    {/* <div>Estado del Stock: {inventoryOverview.stockStatus}</div> */}
                </Col>
                <Col>
                    <CustomBarChart
                        data={warehouseData}
                        xKey="name"
                        yKey="Cantidad"
                        barFill="#8884d8"
                    />
                </Col>
            </Row>
        </>
    );
};
