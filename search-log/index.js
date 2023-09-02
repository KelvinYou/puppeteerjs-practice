const fs = require('fs');
const readline = require('readline');

function searchFilesByLine(filePaths, searchQuery, searchTime) {
  let totalCount = 0;
  let completedCount = 0;

  const processFile = (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let fileCount = 0;

    rl.on('line', (line) => {


      if (line.includes(searchQuery)) {

        const timestamp = extractTimestamp(line);
        if (timestamp && isAfterTime(timestamp, searchTime)) {
          // console.log(line); // or perform any desired action with the matching line
          totalCount++;
          fileCount++;

          console.log("COUNT (" + totalCount + "): " + line);
        } else {
          console.log(line);

        }
      }
    });

    rl.on('close', () => {
      console.log(`Search completed for file: ${filePath}`);
      console.log(`Count for file: ${filePath}`, fileCount);
      rl.removeAllListeners();
      checkCompletion();
    });
  };

  const checkCompletion = () => {
    completedCount++;
    if (completedCount === filePaths.length) {
      console.log('Total count:', totalCount);
    }
  };

  for (const filePath of filePaths) {
    processFile(filePath);
  }
}

function extractTimestamp(line) {
  const match = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  return match ? match[0] : null;
}

function isAfterTime(timestamp, searchTime) {
  const lineTime = new Date(timestamp);
  const searchDateTime = new Date(`${searchDate} ${searchTime}`);
  return lineTime > searchDateTime;
}

// Usage example
const searchDate = '2023-04-24';
const searchTime = '23:50:00';
const baseFilePath = 'C:/Users/User/Downloads/logs/logs/logs/MQPOSPAYMENT.';

const filePaths = [
  `${baseFilePath}${searchDate}.1`,
  `${baseFilePath}${searchDate}.0`
];

const searchQuery = 'Start settlement';

searchFilesByLine(filePaths, searchQuery, searchTime);
