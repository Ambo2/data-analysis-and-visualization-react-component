import React, { useState, useCallback } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Container, Paper } from '@mui/material';
import DataAnalysisAndVisualization from './DataAnalysisAndVisualization';
import NumericValidator from './NumericValidator';
import ParableAnalyzer from './ParableAnalyzer';
import D3LinePlot from './D3LinePlot';

/**
 * Generates a data loader function that returns the provided data after a delay.
 *
 * @param {Array<number>} data - The data to be returned by the loader.
 * @returns {Function} An asynchronous function that resolves to the provided data after 5 seconds.
 */
const dataLoader = (data) => {
  return async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 5000); // 5 seconds delay to show loading
    });
  };
};

/**
 * UserInterface component for selecting different data loaders and displaying
 * the resulting data in the DataAnalysisAndVisualization component.
 *
 * @returns {JSX.Element} The rendered component.
 */
const UserInterface = () => {
  // Map of data loader keys to their respective data loader functions.
  const dataLoaderMap = {
    '1': dataLoader([-3, -2, -1, 0, 1, 2, 3]),
    '2': dataLoader([-2, 2, 3]),
    '3': dataLoader([1, 2, 3, 4, 5]),
  };

  // State for keeping track of the selected data loader key.
  const [selectedDataLoaderKey, setSelectedDataLoaderKey] = useState('1');
  // State for keeping track of the selected data loader function.
  const [selectedDataLoader, setSelectedDataLoader] = useState(() => dataLoaderMap['1']);

  /**
   * Handles the change event for the data loader selection dropdown.
   *
   * @param {React.ChangeEvent<{ value: unknown }>} event - The change event.
   */
  const handleChange = useCallback((event) => {
    const key = event.target.value;
    setSelectedDataLoaderKey(key);
    setSelectedDataLoader(() => dataLoaderMap[key]);
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Data Loader</InputLabel>
          <Select
            value={selectedDataLoaderKey}
            onChange={handleChange}
            label="Data Loader"
          >
            <MenuItem value="1">Example Data Loader 1</MenuItem>
            <MenuItem value="2">Example Data Loader 2</MenuItem>
            <MenuItem value="3">Example Data Loader 3</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <DataAnalysisAndVisualization key={selectedDataLoaderKey} dataLoader={selectedDataLoader}>
        <NumericValidator />
        <ParableAnalyzer />
        <D3LinePlot width={1125} height={600} />
      </DataAnalysisAndVisualization>
    </Container>
  );
};

export default UserInterface;
