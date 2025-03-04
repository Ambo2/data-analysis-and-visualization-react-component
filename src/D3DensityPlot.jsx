import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import SvgDownloadButton from './SvgDownloadButton';

/**
 * A reusable React component for visualizing Kernel Density Estimation (KDE) using D3.js.
 * This component creates a density plot (area chart).
 *
 * @component
 * @example
 * const data = [{ x: 1, y: 0.1 }, { x: 2, y: 0.4 }, { x: 3, y: 0.9 }];
 * return (
 *   <D3DensityPlot
 *     data={data}
 *     width={800}
 *     height={400}
 *     fillColor="steelblue"
 *     xAxisLabel="X Axis"
 *     yAxisLabel="Density"
 *   />
 * );
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - The KDE data to visualize, an array of objects with 'x' and 'y' properties.
 * @param {number} props.width - The width of the chart.
 * @param {number} props.height - The height of the chart.
 * @param {string} [props.fillColor="steelblue"] - The fill color of the density area.
 * @param {string} [props.xAxisLabel=""] - The label for the X axis.
 * @param {string} [props.yAxisLabel=""] - The label for the Y axis.
 */
const D3DensityPlot = ({ data, width, height,  xAxisLabel = '', yAxisLabel = '' }) => {
 

    const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, chartWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .nice()
      .range([chartHeight, 0]);

    const area = d3.area()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart.append('g')
      .call(d3.axisLeft(y));

    chart.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

 chart.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', area);

    // Add X axis label
    if (xAxisLabel) {
      chart.append('text')
        .attr('transform', `translate(${chartWidth / 2},${chartHeight + margin.bottom - 10})`)
        .style('text-anchor', 'middle')
        .text(xAxisLabel);
    }

    // Add Y axis label
    if (yAxisLabel) {
      chart.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -margin.left + 15)
        .attr('x', -chartHeight / 2)
        .style('text-anchor', 'middle')
        .text(yAxisLabel);
    }
  }, [data, width, height, xAxisLabel, yAxisLabel]);

  
  

  return (
    <>
      <svg ref={ref}></svg>
      <SvgDownloadButton svgRef={ref} />
    </>
  );
};

D3DensityPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
};

export default D3DensityPlot;

