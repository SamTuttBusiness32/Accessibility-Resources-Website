import React, { useState } from 'react';

const YourComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  function cleanString(str) {
    return str.replace(/[^\x20-\x7E]/g, '');
  }

  const handleFileChange = e => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target.result;
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(result, 'text/html');
      const table = htmlDocument.querySelector('table');

      if (table) {
        const rows = table.querySelectorAll('tr');
        const extractedData = [];
        const headerCounts = new Map();

        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].querySelectorAll('td');
          const rowData = {};

          for (let j = 0; j < cells.length; j++) {
            let key = rows[0].querySelectorAll('td')[j].textContent.trim();
            let value = cells[j].textContent;

            if (i === 0) {
              const count = headerCounts.get(key) || 0;
              headerCounts.set(key, count + 1);

              if (count > 0) {
                key = `${key}${count}`;
              }

              setTableHeaders(prevHeaders => [...prevHeaders, key]);
            } else {
              if (key === 'Nat') {
                // For debugging, log the 'Nat' column value before any modification
                console.log('Original Nat Value:', value);

                // Ensure the 'Nat' values remain as strings and clean any non-printing characters
                value = cleanString(value.trim());

                // For debugging, log the 'Nat' column value after modification
                console.log('Modified Nat Value:', value);
              }

              rowData[tableHeaders[j]] = value;
            }
          }

          if (i !== 0) {
            extractedData.push(rowData);
          }
        }

        setTableData(extractedData);
      } else {
        setTableData([]);
        setTableHeaders([]);
        console.error('No table found in the HTML file.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <form>
        <input type="file" accept=".html" onChange={handleFileChange} />
      </form>
      <div>
        <h3>Extracted Table Data:</h3>
        <table>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders.map((header, headerIndex) => (
                  <td key={headerIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourComponent;
