const express = require('express');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const app = express();

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

app.get('/compress', async (req, res) => {
  const folderPath = '/path/to/folder'; // Replace with your folder path
  const zipFilePath = '/path/to/archive.zip'; // Replace with the desired zip file path

  try {
    await compressFolderToZip(folderPath, zipFilePath);
    res.download(zipFilePath, 'archive.zip'); // Download the zip file
  } catch (error) {
    res.status(500).send('An error occurred while compressing the folder.');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
