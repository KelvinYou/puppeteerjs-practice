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

function compressFolderToBase64(folderPath, jsonPath) {
  return new Promise((resolve, reject) => {
    const zipFilePath = path.join(folderPath, 'archive.zip');
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set compression level (optional)
    });

    archive.on('error', reject);
    archive.on('end', () => {
      fs.readFile(zipFilePath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const base64String = data.toString('base64');
        const json = {
          filename: 'archive.zip',
          data: base64String
        };
        fs.writeFile(jsonPath, JSON.stringify(json), (error) => {
          if (error) {
            reject(error);
            return;
          }
          // Delete the temporary zip file
          fs.unlink(zipFilePath, (unlinkError) => {
            if (unlinkError) {
              console.warn('Failed to delete the temporary zip file:', unlinkError);
            }
            resolve(json);
          });
        });
      });
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

function decompressBase64ToFolder(jsonPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const json = JSON.parse(data);
        const zipData = Buffer.from(json.data, 'base64');
        const zipFilePath = path.join(outputFolderPath, json.filename);
        fs.writeFile(zipFilePath, zipData, (error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(zipFilePath);
        });
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

module.exports = {
  compressFolderToZip,
  decompressZipToFolder,
  compressFolderToBase64,
  decompressBase64ToFolder
};
