# Density Estimation React Component

## Overview

This project provides a reusable React component for interactive data analysis and visualization. The component is designed to be highly modular and adaptable, allowing you to define a data processing pipeline using child components for validation, analysis, and visualization.

## Features

- **Modular Design**: Define your data processing pipeline using separate Validator, Analyzer, and Visualizer components.
- **Asynchronous Data Loading**: Load data asynchronously using a provided dataLoader function.
- **Error Handling**: Comprehensive error messages for end-users and informative error messages for developers.
- **D3.js Integration**: Use D3.js for creating interactive and visually appealing data visualizations.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/data-analysis-and-visualization-react-component.git
   cd data-analysis-and-visualization-react-component
   ```

   2. **Install dependencies**:
   ```bash
   npm install
   ```

### Project Structure

The project has the following structure:

```
./
├── src/
│   ├── index.jsx
│   ├── App.jsx
│   ├── DataAnalysisAndVisualization.jsx
│   ├── NumericValidator.jsx
│   ├── DensityAnalyzer.jsx
│   ├── D3DensityPlot.jsx
├── public/
│   ├── index.html
├── package.json
├── webpack.config.js
```

### Example Usage

Here's an example of how to use the `DataAnalysisAndVisualization` component with a `NumericValidator`, `ParableAnalyzer`, and `D3DensityPlot`:

```javascript
import React from 'react';
import DataAnalysisAndVisualization from './DataAnalysisAndVisualization';
import NumericValidator from './NumericValidator';
import ParableAnalyzer from './ParableAnalyzer';
import D3LinePlot from './D3DensityPlot';

const App = () => {
  const dataLoader = async () => {
    // Example data loading function
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  };

  return (
    <DataAnalysisAndVisualization dataLoader={dataLoader}>
      <NumericValidator />
      <ParableAnalyzer />
      <D3DensityPlot width={500} height={300} />
    </DataAnalysisAndVisualization>
  );
};

export default App;
```

### Components

#### UserInterface Component

Enables users to select different data loaders and visualize the results using the `DataAnalysisAndVisualization` component. See the implementation in [`UserInterface.jsx`](./src/UserInterface.jsx).

#### DataAnalysisAndVisualization

The main component that orchestrates the data processing pipeline. See the implementation in [`DataAnalysisAndVisualization.jsx`](./src/DataAnalysisAndVisualization.jsx).

#### NumericValidator

A sample validator component that checks if all data items are numeric. See the implementation in [`NumericValidator.jsx`](./src/NumericValidator.jsx).

#### ParableAnalyzer

A sample analyzer component calculates the density estimation data items. See the implementation in [`ParableAnalyzer.jsx`](./src/ParableAnalyzer.jsx).

Another approach could involve returning points for a  Kernel Density plot. But not in this simple example.

#### D3LinePlot

A D3.js component for visualizing data as a Kernel Density plot. See the implementation in [`D3LinePlot.jsx`](./src/D3LinePlot.jsx).

#### SvgDownloadButton Component

Allows user to download the plot in one of the formats SVG, PNG, JPG. See the implementation in [`SvgDownloadButton.jsx`](./src/SvgDownloadButton.jsx).

## Running the Project

To compile and run the project, follow these steps:

1. **Navigate to your project directory**:
   ```bash
   cd path/to/your/project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
