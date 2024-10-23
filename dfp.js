const fs = require('fs');

function parseFile (inData, outData, delimiter = ';') {

  if (!fs.existsSync(inData)) {
    return -1; 
  }

  if (fs.existsSync(outData)) {
      fs.unlinkSync(outData);
  }

let totalRecordsExported = 0;
const transformedLines = [];

const data = fs.readFileSync(inData, "utf-8").split('\n').slice(1);

for (let i = 0; i < data.length; i++) {
  const line = data[i].trim();
  if (line) {
      const parts = line.split(delimiter);

      if (parts.length >= 2) {
        const sentiment = parts[1].trim();
        const review = parts[0].trim().slice(0, 20);

        transformedLines.push(`${sentiment};${review}`);
        totalRecordsExported++;
      };
    };
  };

fs.writeFileSync(outData, transformedLines.join('\n'));

return totalRecordsExported;
};

parseFile();

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}