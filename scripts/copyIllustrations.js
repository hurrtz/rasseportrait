const fs = require("fs");
const path = require("path");

const sourceDir = "db/fci";
const destinationDir = "dist/illustrations/fci";

if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

const copyImages = (currentSourceDir) => {
  fs.readdir(currentSourceDir, (err, files) => {
    if (err) {
      return console.error("Unable to scan directory: " + err);
    }

    files.forEach((file) => {
      const sourceFilePath = path.join(currentSourceDir, file);

      fs.stat(sourceFilePath, (err, stats) => {
        if (err) {
          return console.error("Error reading file stats: " + err);
        }

        if (stats.isDirectory()) {
          // Recursively copy images from subdirectory
          copyImages(sourceFilePath);
        } else if (/\.(jpg|jpeg|png|gif|bmp)$/.test(file.toLowerCase())) {
          const relativePath = path.relative(sourceDir, sourceFilePath);
          const destinationFilePath = path.join(destinationDir, relativePath);

          // Ensure the destination subdirectory exists
          const destinationSubDir = path.dirname(destinationFilePath);

          if (!fs.existsSync(destinationSubDir)) {
            fs.mkdirSync(destinationSubDir, { recursive: true });
          }

          // Copy the file
          fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
            if (err) {
              console.error("Error copying file:", err);
            } else {
              console.log(`Copied: ${relativePath}`);
            }
          });
        }
      });
    });
  });
};

copyImages(sourceDir);
