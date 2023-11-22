import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
    x:{
      beginAtZero: true,
    },
  },
};

const DataAnalysisAndVisualizationComponent = ({ dataLoader }) => {
  const [fdata, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if dataLoader is a valid async function
    if (typeof dataLoader !== 'function' || !dataLoader.constructor.name === 'AsyncFunction') {
      console.error('dataLoader must be an asynchronous function');
      setData(null); // clear any existing data
      setError("Validation Failed 2"); //
      return;
    }

    // Define a function to validate and visualize data
    const validateAndVisualize = async (fdata) => {
      if (validateData(fdata)) {
        const result = analyzeAndVisualizeData(fdata);
        setData(result);
      } else {
        console.error('Data validation failed.');
        setData(null); // clear any existing data
        setError("Data validation failed")
      }
    };

    // Call the dataLoader function to fetch data
    dataLoader()
      .then((fdata) => validateAndVisualize(fdata))
      .catch((error) => {
        console.log('Error loading data.');
        setError("Error loading data");
        setData(null);
      });
  }, [dataLoader]);

  // Implement data validation logic
  const validateData = (fdata) => {
    if (!Array.isArray(fdata)) {
      return false;
    }
  
    for (const item of fdata) {
      if (typeof item !== 'object' || item.x === undefined || item.y === undefined) {
        return false;
      }
    }
  
    return true;
  };

  // Implement data analysis and visualization logic
  const analyzeAndVisualizeData = (fdata) => {
    // here we can perform the data analysis and visualization
    // like mean, deviation etc..
    return fdata;
  };

  const dataFinal = {
    datasets: [
      {
        label: 'A dataset',
        data:fdata,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return (
    <div>
      {error ? (
        <div>
          <p>{error}</p>
        </div>
      ):fdata ? (
        <div>
          <h2>Scatter Plot</h2>
          <div>
            {fdata.map((point, index) => (
              <div key={index}>
                X: {point.x}, Y: {point.y}
              </div>
            ))}
            <Scatter options={options} data={dataFinal} />
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataAnalysisAndVisualizationComponent;
