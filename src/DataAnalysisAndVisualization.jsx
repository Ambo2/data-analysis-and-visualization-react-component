
import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Main data analysis and visualization component.
 *
 * @component
 * @example
 * return (
 *   <DataAnalysisAndVisualization dataLoader={dataLoader}>
 *     <NumericValidator />
 *     <DensityAnalyzer />
 *     <D3DensityPlot width={500} height={300} />
 *   </DataAnalysisAndVisualization>
 * );
 *
 * @param {Object} props - React props.
 * @param {Function} props.dataLoader - An asynchronous function that fetches data.
 * @param {ReactNode} props.children - The child components defining the pipeline.
 */
const DataAnalysisAndVisualization = ({ dataLoader, children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    /**
     * Function to display errors to the user and log them to the console.
     *
     * @param {string} userErrorMessage - The error message to display to the end-user.
     * @param {string} developerErrorMessage - The error message to log to the console for the developer.
     */
    const displayError = (userErrorMessage, developerErrorMessage) => {
      console.error(developerErrorMessage);
      setError(userErrorMessage);
      setLoading(false);
    };

    /**
     * Function to check if a function is truly asynchronous.
     *
     * @param {Function} fn - The function to check.
     * @returns {boolean} - `true` if the function is async, otherwise `false`.
     */
    const isAsyncFunction = (fn) => fn && fn.constructor.name === "AsyncFunction";

    /**
     * Function to load data, validate it, and analyze/visualize it.
     */
    const loadData = async () => {
      try {
        // Ensure dataLoader is a function and asynchronous
        if (typeof dataLoader !== 'function' || !isAsyncFunction(dataLoader)) {
          throw new Error('The dataLoader must be an asynchronous function.');
        }

        // Ensure exactly three child components exist
        if (React.Children.count(children) !== 3) {
          throw new Error('DataAnalysisAndVisualization expects exactly three child components: Validator, Analyzer, and Visualizer.');
        }

        const [Validator, Analyzer, Visualizer] = React.Children.toArray(children);

        // Ensure Validator has an async validateData function
        if (!isAsyncFunction(Validator.type.validateData)) {
          throw new Error('Validator must provide an asynchronous validateData function.');
        }

        // Ensure Analyzer has an async analyzeAndVisualizeData function
        if (!isAsyncFunction(Analyzer.type.analyzeAndVisualizeData)) {
          throw new Error('Analyzer must provide an asynchronous analyzeAndVisualizeData function.');
        }

        // Fetch data
        const rawData = await dataLoader();

        // Validate data
        const validatedData = await Validator.type.validateData(rawData);

        // Analyze data
        const analyzedData = await Analyzer.type.analyzeAndVisualizeData(validatedData);

        // Set analyzed data for visualization
        setData(analyzedData);
      } catch (err) {
        displayError('An error occurred during the data processing pipeline.', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataLoader, children]);

  if (loading) {
    return (
      <section>
        <center>
          <CircularProgress />
        </center>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </section>
    );
  }

  return (
    <section>
      {React.Children.count(children) === 3 ? (
        React.cloneElement(children[2], { data })
      ) : (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Incorrect number of child components.
        </Alert>
      )}
    </section>
  );
};

DataAnalysisAndVisualization.propTypes = {
  dataLoader: PropTypes.func.isRequired, // Changed from string to function
  children: PropTypes.node.isRequired,
};

export default DataAnalysisAndVisualization;
