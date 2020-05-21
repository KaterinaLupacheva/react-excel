import React, { useState } from 'react';

import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import '@ramonak/react-excel/dist/index.css';

const App = () => {
  const [initialData, setInitialData] = useState(undefined);

  const handleUpload = async (e) => {
    const readedData = await readFile(e);
    setInitialData(readedData);
  };
  return (
    <>
      <input type='file' accept='.xlsx' onChange={handleUpload} />
      <ReactExcel initialData={initialData} />
    </>
  );
};

export default App;
