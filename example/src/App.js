import React, { useState } from 'react';

import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import '@ramonak/react-excel/dist/index.css';

const App = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});

  const handleUpload = (event) => {
    const file = event.target.files[0];
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  const handleClick = () => {
    const result = generateObjects(currentSheet);
    console.log(result);
  };

  return (
    <>
      <input type='file' accept='.xlsx' onChange={handleUpload} />
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
      />
      <button onClick={handleClick}>CLICK</button>
    </>
  );
};

export default App;
