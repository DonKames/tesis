import React from 'react';
import { Chart } from 'react-google-charts';

export const PieChart = ({ data }) => {
    return (
        <Chart
            width={'500px'}
            height={'300px'}
            chartType='PieChart'
            loader={<div>Loading Chart</div>}
            data={[['Task', 'Hours per Day'], ...data]}
            options={{
                title: 'My Daily Activities',
                is3D: true, // Habilitar el efecto 3D
            }}
        />
    );
};
