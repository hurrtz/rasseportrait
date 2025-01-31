const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

const createWebImage = async (
  inputPath,
  outputPath,
  width = 1000,
  height = 1000,
  quality = 75,
) => {
  try {
    await sharp(inputPath)
      .resize(width, height)
      .jpeg({ quality })
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

        await createWebImage(originPath, toThumbnailPath, 500, 500);
        await createWebImage(originPath, toImagePath);

        console.log();
      }
    }
  } catch (error) {
    console.error("Error processing images:", error);
  }
};

const BREEDS_SOURCE_FOLDER = path.join(__dirname, "../breeds");
const BREEDS_DESTINATION_FOLDER = path.join(
  __dirname,
  "../dist/illustrations/breeds",
);
const TOPICS_SOURCE_FOLDER = path.join(__dirname, "../topics");
const TOPICS_DESTINATION_FOLDER = path.join(
  __dirname,
  "../dist/illustrations/topics",
);

processImages(BREEDS_SOURCE_FOLDER, BREEDS_DESTINATION_FOLDER);
processImages(TOPICS_SOURCE_FOLDER, TOPICS_DESTINATION_FOLDER);
