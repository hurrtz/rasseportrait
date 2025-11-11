const sharp = require("sharp");
const fs = require("fs-extra");
const path = require("path");

// Track statistics
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  startTime: Date.now(),
};

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
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`  ⚠ Missing source image: ${path.basename(inputPath)}`);
      stats.skipped++;
    } else {
      console.error(`  ✗ Error processing ${path.basename(inputPath)}:`, error.message);
      stats.errors++;
    }
    return false;
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

        const breedName = path.basename(sourceDir);
        console.log(`Processing ${breedName}/${file}...`);

        const thumbnailSuccess = await createWebImage(originPath, toThumbnailPath, 500, 500);
        const imageSuccess = await createWebImage(originPath, toImagePath);

        if (thumbnailSuccess && imageSuccess) {
          stats.processed++;
          console.log(`  ✓ Generated thumbnail + full image`);
        }
      } else if (/\.(mp4)$/i.test(file)) {
        const originPath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        console.log(`Copying video "${file}"...`);

        try {
          await fs.copy(originPath, targetPath);
          stats.processed++;
          console.log(`  ✓ Copied video`);
        } catch (error) {
          if (error.code === "ENOENT") {
            console.warn(`  ⚠ Missing source video: ${file}`);
            stats.skipped++;
          } else {
            console.error(`  ✗ Error copying video:`, error.message);
            stats.errors++;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error processing images:", error);
    stats.errors++;
  }
};

const BREEDS_SOURCE_FOLDER = path.join(__dirname, "../db/breeds");
const BREEDS_DESTINATION_FOLDER = path.join(
  __dirname,
  "../public/illustrations/breeds",
);

const GENERAL_PURPOSE_SOURCE_FOLDER = path.join(
  __dirname,
  "../db/general_purpose",
);
const GENERAL_PURPOSE_DESTINATION_FOLDER = path.join(
  __dirname,
  "../public/illustrations/general_purpose",
);

async function processAllImages() {
  console.log("🖼️  Processing images...\n");

  console.log("Processing breed illustrations...");
  await processImages(BREEDS_SOURCE_FOLDER, BREEDS_DESTINATION_FOLDER);

  console.log("\nProcessing general purpose illustrations...");
  await processImages(
    GENERAL_PURPOSE_SOURCE_FOLDER,
    GENERAL_PURPOSE_DESTINATION_FOLDER,
  );

  const duration = ((Date.now() - stats.startTime) / 1000).toFixed(2);

  console.log("\n" + "=".repeat(50));
  console.log("✅ Image processing complete!");
  console.log("=".repeat(50));
  console.log(`  Processed: ${stats.processed}`);
  console.log(`  Skipped: ${stats.skipped}`);
  console.log(`  Errors: ${stats.errors}`);
  console.log(`  Duration: ${duration}s`);
  console.log("=".repeat(50) + "\n");

  if (stats.errors > 0) {
    console.warn("⚠️  Some errors occurred during processing.");
    process.exit(1);
  }
}

processAllImages().catch((error) => {
  console.error("\n❌ Fatal error during image processing:", error);
  process.exit(1);
});
