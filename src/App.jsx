import React from 'react';
import DataAnalysisAndVisualization from './DataAnalysisAndVisualization';
import NumericValidator from './NumericValidator';
import ParableAnalyzer from './ParableAnalyzer';
import D3LinePlot from './D3LinePlot';

/**
 * Example usage of the DataAnalysisAndVisualization component with a D3LinePlot visualizer.
 *
 * @component
 */
const App = () => {
  const dataLoader = async () => {
    // Example data loading function
    return [-3, -2, -1, 0, 1, 2, 3];
  };

  return (
    <DataAnalysisAndVisualization dataLoader={dataLoader}>
      <NumericValidator />
      <ParableAnalyzer />
      <D3LinePlot width={500} height={300} />
    </DataAnalysisAndVisualization >
  );
};

export default App;
