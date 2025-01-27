import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Main data analysis and visualization component.
 *
 * @component
 * @example
 * const dataLoader = async () => { return fetchData(); };
 * return (
 *   <DataAnalysisAndVisualization dataLoader={dataLoader}>
 *     <NumericValidator />
 *     <ParableAnalyzer />
 *     <D3BarChart width={500} height={300} />
 *   </DataAnalysisAndVisualization>
 * );
 *
 * @param {Object} props - React props.
 * @param {function} props.dataLoader - The asynchronous function that fetches data.
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
     * Function to load data, validate it, and analyze/visualize it.
     */
    const loadData = async () => {
      try {
        if (typeof dataLoader !== 'function') {
          throw new Error('The dataLoader prop must reference an existing asynchronous JavaScript function.');
        }

        const rawData = await dataLoader();

        if (React.Children.count(children) !== 3) {
          throw new Error('DataAnalysisAndVisualization component expects exactly three child components: Validator, Analyzer, and Visualizer.');
        }

        const [Validator, Analyzer, Visualizer] = React.Children.toArray(children);

        const validatedData = await Validator.type.validateData(rawData);
        const analyzedData = await Analyzer.type.analyzeData(validatedData);

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
        <CircularProgress />
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
  dataLoader: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DataAnalysisAndVisualization;
