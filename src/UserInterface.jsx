
import React, { useState } from 'react';
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
    }, 5000);
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

const UserInterface = () => {
  const dataLoaders = {
    '1': exampleDataLoader1,
    '2': exampleDataLoader2,
    '3': exampleDataLoader3,
  };

  const [selectedDataLoader, setSelectedDataLoader] = useState('1');

  return (
    <Container component="main">
      <Paper component="section" elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <form>
          <FormControl fullWidth>
            <InputLabel htmlFor="data-loader-select">Data Loader</InputLabel>
            <Select
              id="data-loader-select"
              value={selectedDataLoader}
              onChange={(e) => setSelectedDataLoader(e.target.value)}
            >
              <MenuItem value="1">Example Data Loader 1</MenuItem>
              <MenuItem value="2">Example Data Loader 2</MenuItem>
              <MenuItem value="3">Example Data Loader 3</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Paper>
      <DataAnalysisAndVisualization dataLoader={dataLoaders[selectedDataLoader]}>
        <NumericValidator />
        <DensityAnalyzer />
        <D3DensityPlot width={1125} height={600} />
      </DataAnalysisAndVisualization>
    </Container>
  );
};

export default UserInterface;
