const fs = require('fs');


function parseFile (inData, outData, delimiter = ';') {

  // checks if the inputfile exists, if it doesn't, returns -1
   if (!fs.existsSync(inData)) return -1;
   // if an outputfile already exists, it is deleted
   if (fs.existsSync(outData)) fs.unlinkSync(outData);
   // initialise record counter 
      let recordCount = 0; 
      try {
   // reads the input file, splits it into lines and filters out empty lines 
         const lines = fs.readFileSync(inData, 'utf-8').split(/\n/).filter(line => line.trim());
   // skips the first line (header) 
         for (const line of lines.slice(1)) {
   // splits each line into a sentiment and review, and trims any whitespace 
               const [review, sentiment] = line.split(delimiter).map(item=> item.trim());
   // appends the formatted data onto the output file
               fs.appendFileSync (outData, `${sentiment}${delimiter}${review.substring(0, 20)}\n`, 'utf-8');
   // increments the record count
               recordCount ++;
         }
   // logs any errors that occur during file parsing and returns -1 if an error occurs
      } catch (err) {
      console.error('Error parsing file:', err);
      return -1;
   }
   // returns the total number of records processed
    return recordCount;
}
   // call the parsefile function as the input file and output file as the parameters
parseFile('./datafile.csv','./outputfile.csv')

module.exports ={
   parseFile,
}
// Leave this code here for the automated tests
module.exports ={
  parseFile,
}