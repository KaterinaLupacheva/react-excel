import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import styles from './styles.module.css';

export const ReactExcel = (props) => {
  const { initialData, onSheetUpdate, activeSheetClassName } = props;
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
    onSheetUpdate &&
      onSheetUpdate({
        [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0]
      });
  };

  const handleClick = (e, id) => {
    const sheet = parsedData.find((o) =>
      Object.keys(o).includes(e.target.value)
    );
    setCurrentSheet(sheet);
    onSheetUpdate && onSheetUpdate(sheet);
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
      onSheetUpdate && onSheetUpdate(result[0]);
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
              className={activeSheet === idx ? `${activeSheetClassName}` : ''}
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

ReactExcel.propTypes = {
  initialData: PropTypes.object,
  onSheetUpdate: PropTypes.func,
  activeSheetClassName: PropTypes.string
};

export const readFile = (file) => {
  var reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = function (event) {
      var data = new Uint8Array(event.target.result);
      let readedData = XLSX.read(data, { type: 'array' });
      resolve(readedData);
    };
    reader.readAsArrayBuffer(file);
  });
};

readFile.propTypes = {
  file: PropTypes.object
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

generateObjects.propTypes = {
  currentSheet: PropTypes.object
};
