const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const createThumbnail = async (
  inputPath,
  outputPath,
  width = 300,
  height = 300,
) => {
  try {
    await sharp(inputPath)
      .resize(width, height)
      .jpeg({ quality: 50 })
      .toFile(outputPath);
    console.log(`Thumbnail created!`);
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
        const targetPath = path.join(targetDir, file);
        const thumbnailPath = path.join(
          targetDir,
          path.parse(file).name + "_thumbnail" + path.extname(file),
        );

        console.log(`Processing "${fullPath}"...`);

        await fs.copy(fullPath, targetPath);
        console.log(`Copied!`);

        await createThumbnail(targetPath, thumbnailPath);

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
