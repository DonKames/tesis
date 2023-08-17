import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const PieChart = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value((d) => d.value);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);
        const labelArc = d3
            .arc()
            .innerRadius(radius)
            .outerRadius(radius - 40); // Define the label arc

        svg.attr('width', width).attr('height', height);

        const g = svg
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        g.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.data.name));

        g.selectAll('text')
            .data(pie(data))
            .enter()
            .append('text')
            .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text((d) => d.data.name);
    }, [data]);

    return <svg ref={ref} />;
};
