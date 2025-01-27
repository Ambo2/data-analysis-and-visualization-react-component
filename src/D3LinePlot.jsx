import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import SvgDownloadButton from "./SvgDownloadButton"

/**
 * A reusable React component for data visualization using D3.js.
 * This component creates a line plot.
 *
 * @component
 * @example
 * const data = [{ x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }];
 * return (
 *   <D3LinePlot data={data} width={500} height={300} />
 * );
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - The data to visualize, an array of objects with 'x' and 'y' properties.
 * @param {number} props.width - The width of the chart.
 * @param {number} props.height - The height of the chart.
 */
const D3LinePlot = ({ data, width, height }) => {
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

    const line = d3.line()
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
      .attr('d', line);

  }, [data, width, height]);

  return (
    <>
      <svg ref={ref}></svg>
      <SvgDownloadButton svgRef={ref} />
    </>
  );
};

D3LinePlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default D3LinePlot;
