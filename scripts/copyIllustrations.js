const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const createWebImage = async (inputPath, outputPath, width, height) => {
  try {
    await sharp(inputPath)
      .resize(width, height)
      .jpeg({ quality: 50 })
      .toFile(outputPath);
  } catch (error) {
    console.error("Error creating thumbnail:", error);
  }
};

const processImages = async (sourceDir, targetDir) => {
  try {
    await fs.ensureDir(targetDir);

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const fullPath = path.join(sourceDir, file);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await processImages(fullPath, path.join(targetDir, file));
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
        const originPath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        const toImagePath = path.join(
          targetDir,
          `${path.parse(file).name}.jpeg`,
        );
        const toThumbnailPath = path.join(
          targetDir,
          `${path.parse(file).name}_thumbnail.jpeg`,
        );

        console.log(`Processing "${fullPath}"...`);

        await createWebImage(originPath, toImagePath, 2000, 2000);

        console.log("Created full size image!");

        await createWebImage(originPath, toThumbnailPath, 300, 300);

        console.log("Created thumbnail!");
        console.log();
      }
    }
  } catch (error) {
    console.error("Error processing images:", error);
  }
};

const SOURCE_FOLDER = path.join(__dirname, "../db");
const DESTINATION_FOLDER = path.join(__dirname, "../dist/illustrations");

processImages(SOURCE_FOLDER, DESTINATION_FOLDER);
