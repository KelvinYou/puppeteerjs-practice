// app/utils/compressUtils.js
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const decompress = require("decompress");

function compressFolderToZip(folderPath, zipFilePath) {
  return new Promise((resolve, reject) => {
    // Create a write stream to the zip file
    const output = fs.createWriteStream(zipFilePath);

    // Create a new archiver instance
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set compression level (optional)
    });

    // Listen for errors during archiving
    archive.on('error', reject);

    // Pipe the output stream to the archive
    archive.pipe(output);

    // Add all files and subdirectories from the specified folder
    archive.directory(folderPath, false);

    // Finalize the archive
    archive.finalize();

    // Listen for the 'close' event to know when the archiving is complete
    output.on('close', () => resolve());

    // Listen for the 'end' event to know when the writing is complete
    output.on('end', () => resolve());
  });
}

function decompressZipToFolder(zipFilePath, folderPath) {
  return decompress(zipFilePath, folderPath);
}

function encodeZipToBase64(zipFilePath, jsonPath) {


  fs.readFile(zipFilePath, (err, data) => {
    if (err) throw err;

    const base64Data = Buffer.from(data).toString('base64');
    const jsonContent = { base64Data };

    fs.writeFile(jsonPath, JSON.stringify(jsonContent), (err) => {
      if (err) throw err;
      console.log('Zip file encoded and stored in JSON successfully.');
    });
  });
}

function decodeBase64ToZip(jsonPath, zipFilePath) {
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) throw err;

    const jsonContent = JSON.parse(data);
    const base64Data = jsonContent.base64Data;

    // Decode the Base64 data to a buffer
    const zipBuffer = Buffer.from(base64Data, 'base64');

    // Write the buffer data to a ZIP file
    fs.writeFile(zipFilePath, zipBuffer, (err) => {
      if (err) throw err;
      console.log('ZIP file decoded and stored successfully.');
    });
  });
}

const waitForFile = (filePath, timeout) => {
  return new Promise((resolve, reject) => {
    let elapsedTime = 0;
    const interval = 100;

    const checkFile = setInterval(() => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          clearInterval(checkFile);
          resolve();
        } else if (elapsedTime >= timeout) {
          clearInterval(checkFile);
          reject(new Error(`Timeout exceeded while waiting for file: ${filePath}`));
        } else {
          elapsedTime += interval;
        }
      });
    }, interval);
  });
};

module.exports = {
  compressFolderToZip,
  decompressZipToFolder,
  encodeZipToBase64,
  decodeBase64ToZip,
  waitForFile
};
