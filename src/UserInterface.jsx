
import React, { useState, useCallback } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Container, Paper } from '@mui/material';
import DataAnalysisAndVisualization from './DataAnalysisAndVisualization';
import NumericValidator from './NumericValidator';
import DensityAnalyzer from './DensityAnalyzer';
import D3DensityPlot from './D3DensityPlot'; 

/**
 * Example data loader functions.
 */
const exampleDataLoader1 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1.2, 2.5, 3.7, 4.1, 5.6, 6.3, 7.8, 8.2, 9.1, 10.5]);
    }, 5000); // 5 seconds delay to show loading
  });
};

const exampleDataLoader2 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]);
    }, 5000);
  });
};

const exampleDataLoader3 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    }, 5000);
  });
};

// Expose data loaders to the global scope
window.exampleDataLoader1 = exampleDataLoader1;
window.exampleDataLoader2 = exampleDataLoader2;
window.exampleDataLoader3 = exampleDataLoader3;

/**
 * UserInterface component for selecting different data loaders and displaying
 * the resulting data in the DataAnalysisAndVisualization component.
 *
 * @returns {JSX.Element} The rendered component.
 */
const UserInterface = () => {
  // Map of data loader keys to their respective data loader function names
  const dataLoaderMap = {
    '1': 'exampleDataLoader1',
    '2': 'exampleDataLoader2',
    '3': 'exampleDataLoader3',
  };

  // State for keeping track of the selected data loader key
  const [selectedDataLoaderKey, setSelectedDataLoaderKey] = useState('1');

  return (
    <Container component="main">
      <Paper component="section" elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <form>
          <FormControl component="fieldset" fullWidth variant="outlined">
            <InputLabel htmlFor="data-loader-select">Data Loader</InputLabel>
            <Select
              id="data-loader-select"
              value={selectedDataLoaderKey}
              onChange={(e) => setSelectedDataLoaderKey(e.target.value)}
              label="Data Loader"
            >
              <MenuItem value="1">Example Data Loader 1</MenuItem>
              <MenuItem value="2">Example Data Loader 2</MenuItem>
              <MenuItem value="3">Example Data Loader 3</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Paper>
      <DataAnalysisAndVisualization key={selectedDataLoaderKey} dataLoader={dataLoaderMap[selectedDataLoaderKey]}>
        <NumericValidator />
        <DensityAnalyzer />
        <D3DensityPlot width={1125} height={600} />
      </DataAnalysisAndVisualization>
    </Container>
  );
};

export default UserInterface;

                        




