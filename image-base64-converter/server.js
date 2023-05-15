const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const folderPath = "src/images";
const jsonPath = "src/images.json";

// Define a route to handle the request
app.get('/encode-images', (req, res) => {

  // Read the images in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      res.sendStatus(500);
      return;
    }

    const imagesData = [];

    // Process each image
    files.forEach((file) => {
      const imagePath = path.join(folderPath, file);

      // Read the image file
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          console.error('Error reading image:', err);
          return;
        }

        // Encode the image data to base64
        const base64Image = Buffer.from(data).toString('base64');

        // Store the image data in an object
        const imageData = {
          fileName: file,
          base64: base64Image,
        };

        // Push the image data to the array
        imagesData.push(imageData);

        // Check if all images have been processed
        if (imagesData.length === files.length) {
          // Create a JSON object with the image data
          const jsonData = {
            images: imagesData,
          };

          // Save the JSON object to a file
          fs.writeFile(jsonPath, JSON.stringify(jsonData), (err) => {
            if (err) {
              console.error('Error writing JSON file:', err);
              res.sendStatus(500);
              return;
            }

            console.log('Images encoded and JSON file created.');

            // Delete the folder
            fs.rmdir(folderPath, { recursive: true }, (err) => {
              if (err) {
                console.error('Error deleting folder:', err);
                return;
              }

              console.log('Folder deleted.');
              res.sendStatus(200);
            });
          });
        }
      });
    });
  });
});


// Define a route to handle the request
app.get('/decode-images', (req, res) => {
  // Read the JSON file containing the image data
  fs.readFile(jsonPath, (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.sendStatus(500);
      return;
    }

    const jsonData = JSON.parse(data);
    const imagesData = jsonData.images;

    fs.mkdirSync(folderPath, { recursive: true });

    // Process each image data
    imagesData.forEach((imageData) => {
      const { fileName, base64 } = imageData;
      const imagePath = path.join(folderPath, fileName);

      // Decode the base64 image data
      const decodedImage = Buffer.from(base64, 'base64');

      // Save the decoded image to the file system
      fs.writeFile(imagePath, decodedImage, (err) => {
        if (err) {
          console.error('Error saving image:', err);
          return;
        }

        console.log(`Image ${fileName} saved.`);
      });
    });

    console.log('Images decoded and saved to the folder.');

    // Delete the JSON file
    fs.unlink(jsonPath, (err) => {
      if (err) {
        console.error('Error deleting JSON file:', err);
        res.sendStatus(500);
        return;
      }

      console.log('JSON file deleted.');
      res.sendStatus(200);
    });
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
