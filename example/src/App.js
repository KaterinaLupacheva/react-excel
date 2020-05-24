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
      <input
        type='file'
        accept='.xlsx'
        onChange={handleUpload}
        id='upload'
        style={{ display: 'none' }}
      />
      <label htmlFor='upload'>
        <button
          className='custom-button'
          onClick={() => document.getElementById('upload').click()}
        >
          Upload
        </button>
      </label>
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName='active-sheet'
        reactExcelClassName='react-excel'
      />
      {initialData && (
        <button className='custom-button' onClick={handleClick}>
          Transform
        </button>
      )}
      {generatedObjects && (
        <textarea
          cols={70}
          rows={30}
          defaultValue={JSON.stringify(generatedObjects, null, 2)}
          className='text-area'
        />
      )}
    </>
  );
};

export default App;
