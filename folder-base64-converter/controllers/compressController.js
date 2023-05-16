// app/controllers/compressController.js
const fs = require('fs-extra');

const { 
  compressFolderToZip, 
  decompressZipToFolder,
  encodeZipToBase64,
  decodeBase64ToZip,
  waitForFile
} = require('../utils/compressUtils');

const folderPath = 'src/images';
const zipFilePath = 'src/archive.zip';
const jsonPath = "src/archieve.json";

exports.compress = async (req, res) => {
  try {
    await compressFolderToZip(folderPath, zipFilePath);

    fs.remove(folderPath, (err) => {
      if (err) {
        console.error('An error occurred while deleting the folder:', err);
        return res.status(500).json({ status: 500, message: 'An error occurred while deleting the folder.' });
      }

      console.log('Folder deleted successfully.');

      res.status(200).json({ status: 200, message: 'Zip file compressed and folder deleted successfully.' });
    });
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).json({ status: 500, message: 'An error occurred while compressing the folder.' });
  }
};

exports.decompress = async (req, res) => {
  try {
    await decompressZipToFolder(zipFilePath, folderPath);
    console.log('Zip file decompressed successfully.');

    fs.unlink(zipFilePath, (err) => {
      if (err) throw err;
      console.log('Folder deleted successfully.');
    });

    res.status(200).json({ status: 200, message: 'Zip file decompressed successfully.' });
    
  } catch (error) {
    console.error('An error occurred while decompressing the zip file:', error);
    res.status(500).json({ status: 500, message: 'An error occurred while decompressing the zip file.' });
  }
};


exports.encodeBase64 = async (req, res) => {
  try {
    await encodeZipToBase64(zipFilePath, jsonPath);

    fs.unlink(zipFilePath, (err) => {
      if (err) throw err;
      console.log('ZIP file deleted successfully.');
    });

    res.status(200).json({ status: 200, message: 'Zip file decompressed successfully.' });
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).json({ status: 500, message: 'An error occurred while compressing the folder.' });
  }
};


exports.decodeBase64 = async (req, res) => {
  try {
    await decodeBase64ToZip(jsonPath, zipFilePath);

    // Delete the JSON file
    fs.unlink(jsonPath, (err) => {
      if (err) throw err;
      console.log('JSON file deleted successfully.');
    });

    // res.download(zipFilePath, 'archive.zip'); // Download the zip file
    res.status(200).send('Zip file decompressed successfully.');
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).send('An error occurred while compressing the folder.');
  }
};

exports.folderToBase64 = async (req, res) => {
  try {
    await compressFolderToZip(folderPath, zipFilePath);

    fs.remove(folderPath, (err) => {
      if (err) {
        console.error('An error occurred while deleting the folder:', err);
        return res.status(500).json({ status: 500, message: 'An error occurred while deleting the folder.' });
      }

      console.log('Folder deleted successfully.');
    });

    await encodeZipToBase64(zipFilePath, jsonPath);

    fs.unlink(zipFilePath, (err) => {
      if (err) throw err;
      console.log('ZIP file deleted successfully.');
    });

    res.status(200).json({ status: 200, message: 'Zip file decompressed successfully.' });
  } catch (error) {
    console.error('An error occurred while compressing the folder:', error);
    res.status(500).json({ status: 500, message: 'An error occurred while compressing the folder.' });
  }
}



exports.base64ToFolder = async (req, res) => {
  try {
    await decodeBase64ToZip(jsonPath, zipFilePath);

    // Delete the JSON file
    fs.unlink(jsonPath, (err) => {
      if (err) throw err;
      console.log('JSON file deleted successfully.');
    });

    try {
      await waitForFile(zipFilePath, 5000); // Wait for 5 seconds (adjust as needed)

      await decompressZipToFolder(zipFilePath, folderPath);
      console.log('Zip file decompressed successfully.');

      fs.unlink(zipFilePath, (err) => {
        if (err) throw err;
        console.log('Folder deleted successfully.');
      });

      res.status(200).json({ status: 200, message: 'Zip file decompressed successfully.' });
    } catch (error) {
      console.error('An error occurred while decompressing the ZIP file:', error);
      res.status(500).json({ status: 500, message: 'An error occurred while decompressing the ZIP file.' });
    }
  } catch (error) {
    console.error('An error occurred while decoding the base64 data:', error);
    res.status(500).send('An error occurred while decoding the base64 data.');
  }
};
