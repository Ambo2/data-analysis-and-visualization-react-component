
/**
 * DensityAnalyzer component for density estimation using Kernel Density Estimation (KDE).
 *
 * @component
 */
const DensityAnalyzer = () => null;

/**
 * Gaussian kernel function for KDE.
 *
 * @param {number} u - The input value.
 * @returns {number} The Gaussian kernel value.
 */
const gaussianKernel = (u) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);

/**
 * Calculates the standard deviation of an array of numbers.
 *
 * @param {Array<number>} data - The input data.
 * @returns {number} The standard deviation.
 */
const calculateStd = (data) => {
  const n = data.length;
  if (n === 0) {
    throw new Error('Cannot calculate standard deviation of an empty array.');
  }

  const mean = data.reduce((sum, xi) => sum + xi, 0) / n;
  const variance = data.reduce((sum, xi) => sum + Math.pow(xi - mean, 2), 0) / n;
  return Math.sqrt(variance);
};

/**
 * Kernel Density Estimation (KDE) function.
 *
 * @param {Array<number>} data - The input data for density estimation.
 * @param {number} bandwidth - The bandwidth for KDE.
 * @returns {function} A function that calculates the density estimate at a given point.
 */
const kde = (data, bandwidth) => {
  const n = data.length;
  return (x) => {
    return (1 / (n * bandwidth)) * data.reduce((sum, xi) => sum + gaussianKernel((x - xi) / bandwidth), 0);
  };
};

/**
 * Analyzes and visualizes data using Kernel Density Estimation (KDE).
 *
 * @param {Array<number>} data - The input data for analysis.
 * @returns {Promise<Array<{ x: number, y: number }>>} A promise that resolves to the density data for visualization.
 */
DensityAnalyzer.analyzeAndVisualizeData = async (data) => {
  try {
    // Validate input data
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid input data. Expected a non-empty array.');
    }

    // Calculate bandwidth using Silverman's rule of thumb
    const std = calculateStd(data); // Use custom standard deviation function
    const bandwidth = 1.06 * std * Math.pow(data.length, -0.2);

    // Calculate density estimate using KDE
    const densityEstimate = kde(data, bandwidth);

    // Generate points for visualization
    const minX = Math.min(...data);
    const maxX = Math.max(...data);
    const step = (maxX - minX) / 100; // 100 points for smooth curve
    const densityData = [];

    for (let x = minX; x <= maxX; x += step) {
      const y = densityEstimate(x);
      if (isNaN(y)) {
        throw new Error('Numerical error during density estimation.');
      }
      densityData.push({ x, y });
    }

    return densityData;
  } catch (err) {
    console.error('Error in analyzeAndVisualizeData:', err.message);
    throw err; // Re-throw the error for handling in the parent component
  }
};

export default DensityAnalyzer;