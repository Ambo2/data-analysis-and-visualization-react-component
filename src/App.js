import DataAnalysisAndVisualizationComponent from "./DataAnalysisAndVisualizationComponent";


function App() {

  const dataLoader = async () => {
    // Simulate loading data asynchronously (e.g., fetching from an API)
    const dummyData = [
      { x: 1, y: 5 },
      { x: 2, y: 8 },
      { x: 3, y: 3 },
      {x: 4, z: 5 },
      
    ];

    await new Promise((resolve) => setTimeout(resolve, 5000));

    return dummyData;
  };

  const dataLoader2= async() =>{
    const dummyData = [
    { x: 5, y: 95 },
    { x: 7, y: 86 },
    { x: 8, y: 35 },
    { x: 20, y: 87 },
    { x: 18, y: 83 },
    { x: 19, y: 105 },
    { x: 9, y: 100 },
    { x: 4, y: 94 },
    { x: 11, y: 63 },
    { x: 15, y: 69 },
    { x: 12, y: 77 },
    { x: 9, y: 13 },
    { x: 6, y: 31 },

    ];

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dummyData;
  };

  return (
    <div className="App">
      <header>
        Gaurav Chauhan
      </header>
      <DataAnalysisAndVisualizationComponent dataLoader={dataLoader} />
      <DataAnalysisAndVisualizationComponent dataLoader={dataLoader2} />

      
    </div>
  );
}

export default App;

