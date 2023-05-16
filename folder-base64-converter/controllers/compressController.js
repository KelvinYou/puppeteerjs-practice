// app/controllers/compressController.js
const { 
  compressFolderToZip, 
  decompressZipToFolder,
  compressFolderToBase64,
  decompressBase64ToFolder,
   } = require('../utils/compressUtils');

const folderPath = 'src/images'; // Replace with your folder path
const zipFilePath = 'src/archive.zip'; // Replace with the desired zip file path

exports.compress = async (req, res) => {
  try {
    await compressFolderToZip(folderPath, zipFilePath);
    // res.download(zipFilePath, 'archive.zip'); // Download the zip file
    res.status(200).send('Zip file decompressed successfully.');
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).send('An error occurred while compressing the folder.');
  }
};

exports.decompress = async (req, res) => {
  try {
    await decompressZipToFolder(zipFilePath, folderPath);
    console.log('Zip file decompressed successfully.');
    res.status(200).send('Zip file decompressed successfully.');
    // Perform additional operations after decompression if needed
  } catch (error) {
    console.error('An error occurred while decompressing the zip file:', error);
    res.status(500).send('An error occurred while decompressing the zip file.');
  }
};

const jsonPath = "src/archieve.json";
const outputPath = "src";

exports.compress64 = async (req, res) => {
  try {
    await compressFolderToBase64(folderPath, jsonPath);
    // res.download(zipFilePath, 'archive.zip'); // Download the zip file
    res.status(200).send('Zip file decompressed successfully.');
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).send('An error occurred while compressing the folder.');
  }
};

exports.decompress64 = async (req, res) => {
  try {
    await decompressBase64ToFolder(jsonPath, outputPath);
    // res.download(zipFilePath, 'archive.zip'); // Download the zip file
    res.status(200).send('Zip file decompressed successfully.');
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).send('An error occurred while compressing the folder.');
  }
};