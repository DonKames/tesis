import React from 'react';
import { Chart } from 'react-google-charts';

export const PieChart = ({ data, title }) => {
    console.log('pie chart data: ', data);
    return (
        <Chart
            width={'300px'}
            height={'300px'}
            chartType='PieChart'
            loader={<div>Loading Chart</div>}
            data={[['Task', 'Hours per Day'], ...data]}
            options={{
                // title,
                is3D: true, // Habilitar el efecto 3D
            }}
        />
    );
};
