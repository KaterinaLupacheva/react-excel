import React, { useState } from 'react';

import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import '@ramonak/react-excel/dist/index.css';
import './styles.css';

const App = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [generatedObjects, setGeneratedObjects] = useState(undefined);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  const handleClick = () => {
    const result = generateObjects(currentSheet);
    setGeneratedObjects(result);
  };

  return (
    <>
      <input type='file' accept='.xlsx' onChange={handleUpload} />
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName={'active-sheet'}
        reactExcelClassName={'react-excel'}
      />
      {initialData && <button onClick={handleClick}>CLICK</button>}
      {generatedObjects && (
        <textarea
          cols={50}
          rows={15}
          defaultValue={JSON.stringify(generatedObjects, null, 2)}
        />
      )}
    </>
  );
};

export default App;
