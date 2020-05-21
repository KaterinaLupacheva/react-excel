import React, { useState } from 'react';

import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import '@ramonak/react-excel/dist/index.css';

const App = () => {
  const [initialData, setInitialData] = useState(undefined);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <input type='file' accept='.xlsx' onChange={handleUpload} />
      <ReactExcel initialData={initialData} />
    </>
  );
};

export default App;
