import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import styles from './styles.module.css';

export const ReactExcel = ({ initialData }) => {
  const [parsedData, setParsedData] = useState([]);
  const [currentSheet, setCurrentSheet] = useState({});
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);

  const createTable = (sheet) => {
    const sheetValues = Object.values(sheet);
    return sheetValues.map((row) => {
      return row.map((r, i) =>
        i === 0 ? (
          <thead key={i}>
            <tr>
              {Object.values(r).map((cell, idx) => (
                <th
                  key={idx}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    updateSheet(e.currentTarget.textContent, i, idx);
                  }}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        ) : (
          <tbody key={i}>
            <tr>
              {Object.values(r).map((cell, idx) => (
                <td
                  key={idx}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    updateSheet(e.currentTarget.textContent, i, idx);
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        )
      );
    });
  };

  const updateSheet = (newValue, row, col) => {
    const sheetRow = Object.values(currentSheet)[0][row];
    sheetRow.splice(col, 1, newValue);
    Object.values(currentSheet)[0].splice(row, 1, sheetRow);
    setCurrentSheet({
      ...currentSheet,
      [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0]
    });
  };

  const handleClick = (e, id) => {
    const sheet = parsedData.find((o) =>
      Object.keys(o).includes(e.target.value)
    );
    setCurrentSheet(sheet);
    setActiveSheet(id);
  };

  useEffect(() => {
    const setData = () => {
      const sheetNames = initialData.SheetNames;
      setSheetNames(sheetNames);
      const result = sheetNames.map((name) => {
        const ws = initialData.Sheets[name];
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defval: ''
        });
        return {
          [name]: dataParse
        };
      });
      setParsedData(result);
      setCurrentSheet(result[0]);
    };

    initialData && setData();
  }, [initialData]);

  return (
    <React.Fragment>
      <React.Fragment>
        <div>
          {sheetNames.map((name, idx) => (
            <button
              key={idx}
              value={name}
              onClick={(e) => handleClick(e, idx)}
              className={activeSheet === idx ? `${styles.active}` : ''}
            >
              {name}
            </button>
          ))}
        </div>
        <table className={styles.tableStyles}>
          {createTable(currentSheet)}
        </table>
      </React.Fragment>
    </React.Fragment>
  );
};

export const readFile = (event) => {
  const file = event.target.files[0];
  var reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      var data = new Uint8Array(event.target.result);
      let readedData = XLSX.read(data, { type: 'array' });
      // sheetNames = readedData.SheetNames
      // result = sheetNames.map((name) => {
      //   const ws = readedData.Sheets[name]
      //   const dataParse = XLSX.utils.sheet_to_json(ws, {
      //     header: 1,
      //     defval: ''
      //   })
      //   return {
      //     [name]: dataParse
      //   }
      // })
      resolve(readedData);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const generateObjects = (currentSheet) => {
  const rows = Object.values(currentSheet)[0];
  const keys = rows[0];
  let result = [];
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])));
  }
  return result;
};
