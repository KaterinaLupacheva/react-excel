# @ramonak/react-excel

> React component to upload, edit and transform data of excel sheet into an array of objects

[![NPM](https://img.shields.io/npm/v/@ramonak/react-excel.svg)](https://www.npmjs.com/package/@ramonak/react-excel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)![npm bundle size](https://img.shields.io/bundlephobia/min/@ramonak/react-excel)![GitHub](https://img.shields.io/github/license/katerinalupacheva/react-excel)![npm](https://img.shields.io/npm/dw/@ramonak/react-excel)

## Demo

![demo](https://i.ibb.co/Qm3QPhb/react-excel-demo.gif)

## Install

```bash
npm install --save @ramonak/react-excel
```

## Usage

```jsx
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';

const App = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  const save = () => {
    const result = generateObjects(currentSheet);
    //save array of objects to backend
  };

  return (
    <>
      <input
        type='file'
        accept='.xlsx'
        onChange={handleUpload}
      />
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName='active-sheet'
        reactExcelClassName='react-excel'
      />
      <button onClick={save}>
          Save to API
      </button>
    </>
  );
}
```

## Description

The library consists of 3 parts:

1. readFile function - reads excel file with the use of [SheetJS](https://github.com/sheetjs/sheetjs) library.
2. ReactExcel component - a custom React.js component for rendering and editing an excel sheet on the screen.
3. generateObjects function - generates an array of objects from excel sheet data using the following template:

excel sheet data:

| id | name | age |
|---|---|---|
|1| John | 25|
|2| Mary | 31 |
|3| Ann | 23 |

will be transformed into:

```bash
[
  {
    id: 1,
    name: "John",
    age: 25
  },
  {
    id: 2,
    name: "Mary",
    age: 31
  },
  {
    id: 3,
    name: "Ann",
    age: 23
  }
]
```

## Props

### ReactExcel component

| Name | Type | Description |
| ---- | ---- | ----------- |
| initialData | object | readed from excel file data |
| onSheetUpdate | func | keeps track of current sheet and its updated data |
| activeSheetClassName | string | class name for an active sheet button styles |
| reactExcelClassName | string | class name for an ReactExcel component styles |

### readFile function

- takes uploaded excel file as a parameter (required) and returns object with readed excel file data. Uses [SheetJS](https://github.com/sheetjs/sheetjs) library.

### generateObjects function

- takes the current excel sheet object and generates [array of objects](#description).

## License

MIT © [KaterinaLupacheva](https://github.com/KaterinaLupacheva)
