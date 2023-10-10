import React from 'react';
import { Chart } from 'react-google-charts';

export const PieChart = ({ data, title }) => {
    return (
        <Chart
            width={'100%'}
            height={'100%'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[['Task', 'Hours per Day'], ...data]}
            options={{
                title,
                is3D: true,
                backgroundColor: 'transparent',
            }}
        />
    );
};
