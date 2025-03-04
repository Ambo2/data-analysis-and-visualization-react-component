
import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Main data analysis and visualization component.
 *
 * @component
 * @example
 * const dataLoader = "exampleDataLoader";
 * return (
 *   <DataAnalysisAndVisualization dataLoader={dataLoader}>
 *     <NumericValidator />
 *     <DensityAnalyzer />
 *     <D3BarChart width={500} height={300} />
 *   </DataAnalysisAndVisualization>
 * );
 *
 * @param {Object} props - React props.
 * @param {string} props.dataLoader - The name of the asynchronous function that fetches data.
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
        // Check if dataLoader is a string and references an existing function
        if (typeof dataLoader !== 'string' || !window[dataLoader]) {
          throw new Error('The dataLoader prop must reference an existing asynchronous JavaScript function.');
        }

        const resolvedDataLoader = window[dataLoader];
        /**
         * This section is commented out because using `constructor.name` to check for async functions
         * is not reliable for transpiled code (e.g., code processed by Babel). Transpiled async functions
         * may not retain the `AsyncFunction` constructor name, making this check unreliable.
         *
         * If you need to check if a function is asynchronous, use the custom `isAsyncFunction` utility
         * provided below. However, be aware of the following:
         *
         * 1. **Side Effects**: The `isAsyncFunction` utility executes the input function to check if it
         *    returns a Promise. This may cause unintended side effects if the function is not designed
         *    to be called without arguments or in the current context.
         *
         * 2. **Transpiled Code Detection**: The utility checks for common transpilation patterns like
         *    `_asyncToGenerator` or `regeneratorRuntime`, but these patterns may vary depending on the
         *    transpiler or its configuration.
         *
         * Example Usage:
         * ```
         * if (typeof resolvedDataLoader !== 'function' || !isAsyncFunction(resolvedDataLoader)) {
         *   throw new Error('The dataLoader function must be asynchronous.');
         * }
         * ```
         */
        // if (typeof resolvedDataLoader !== 'function' || resolvedDataLoader.constructor.name !== 'AsyncFunction') {
        //   throw new Error('The dataLoader function must be asynchronous.');
        // }

        // Fetch data
        const rawData = await resolvedDataLoader();

        // Check for exactly three child components
        if (React.Children.count(children) !== 3) {
          throw new Error('DataAnalysisAndVisualization component expects exactly three child components: Validator, Analyzer, and Visualizer.');
        }

        const [Validator, Analyzer, Visualizer] = React.Children.toArray(children);

        // Use custom isAsyncFunction utility to check if Validator and Analyzer are asynchronous
        // if (!Validator.type.validateData || Validator.type.validateData.constructor.name !== 'AsyncFunction') {
        //   throw new Error('Validator component must provide an asynchronous validateData function.');
        // }
        const validatedData = await Validator.type.validateData(rawData);

        // Validate Analyzer component
        // Use custom isAsyncFunction utility to check if Analyzer is asynchronous
        // if (!Analyzer.type.analyzeAndVisualizeData || Analyzer.type.analyzeAndVisualizeData.constructor.name !== 'AsyncFunction') {
        //   throw new Error('Analyzer component must provide an asynchronous analyzeAndVisualizeData function.');
        // }
        const analyzedData = await Analyzer.type.analyzeAndVisualizeData(validatedData);

        // Set data for visualization
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
  dataLoader: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * Determines if a given function is asynchronous.
 *
 * Note: This function is designed to handle both native async functions and transpiled
 * async functions (e.g., those processed by Babel). However, there are some caveats:
 *
 * 1. **Constructor Name Check**: The `AsyncFunction` constructor check (`fn.constructor.name === 'AsyncFunction'`)
 *    is not reliable for transpiled functions, as the constructor name may change during transpilation.
 *
 * 2. **Function Execution**: To check if a function returns a Promise, this function executes
 *    the input function (`fn()`). This may cause unintended side effects or errors if the function
 *    is not designed to be called without arguments or in the current context.
 *
 * 3. **Transpiled Code Detection**: The function checks for common transpilation patterns like
 *    `_asyncToGenerator`, `regeneratorRuntime`, or `function*`. However, these patterns may vary
 *    depending on the transpiler or its configuration.
 *
 * Usage Example:
 * ```
 * if (!isAsyncFunction(myFunction)) {
 *   throw new Error('The function must be asynchronous.');
 * }
 * ```
 *
 * @param {Function} fn - The function to check.
 * @returns {boolean} - `true` if the function is asynchronous, `false` otherwise.
 */
function isAsyncFunction(fn) {
  // Check if the function is declared with `async`
  if (fn.constructor.name === 'AsyncFunction') {
    return true;
  }

  // Check if the function returns a Promise
  try {
    const result = fn();
    if (result instanceof Promise) {
      return true;
    }
  } catch (e) {
    // If calling the function throws an error, it's not necessarily async
  }

  // Check for transpiled async functions (e.g., Babel's _asyncToGenerator)
  const functionString = fn.toString();
  if (
    functionString.includes('_asyncToGenerator') || // Babel helper
    functionString.includes('regeneratorRuntime') || // Babel runtime
    functionString.includes('function*') // Generator functions (used by Babel for async/await)
  ) {
    return true;
  }

  return false;
}

export default DataAnalysisAndVisualization;




