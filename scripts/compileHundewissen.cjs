const fs = require("fs-extra");
const path = require("path");
const { globSync } = require("glob");

// Use tsx to load TypeScript files at runtime
const { register } = require("tsx/cjs/api");
const unregister = register();

const { compileHundewissen } = require("./hundewissen/compile.ts");

const INDEX = "db/podcast/topic-index.json";
const BREEDS = "public/data/breeds.json";
const OUTPUT = "public/data/hundewissen.json";
const TOPICS_DIR = "public/data/hundewissen";
const AREA_IMAGES = "public/illustrations/hundewissen";

/**
 * Compiles the podcast topic index into the Hundewissen data
 * Output: public/data/hundewissen.json + public/data/hundewissen/<topic>.json
 */
async function run() {
  console.log("🔄 Compiling Hundewissen...\n");
  const startTime = Date.now();
  const warnings = [];

  const index = await fs.readJson(INDEX);
  const { breeds } = await fs.readJson(BREEDS);
  const editorial = globSync("db/knowledge/*/index.ts", { absolute: true })
    .sort()
    .map((file) => require(file).default);

  const output = compileHundewissen({
    index,
    rawBreeds: breeds,
    editorial,
    hasAreaImage: (slug) =>
      fs.existsSync(path.join(AREA_IMAGES, slug, "illustration.jpeg")),
    warn: (message) => warnings.push(message),
  });

  // topics can disappear after a re-build; never keep stale files
  await fs.emptyDir(TOPICS_DIR);
  await Promise.all(
    output.topics.map((topic) =>
      fs.writeFile(
        path.join(TOPICS_DIR, `${topic.id}.json`),
        JSON.stringify(topic),
      ),
    ),
  );
  await fs.writeFile(OUTPUT, JSON.stringify(output.index));

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log("=".repeat(50));
  console.log("✅ Hundewissen compilation complete!");
  console.log("=".repeat(50));
  console.log(
    `  Episodes: ${output.index.indexedEpisodes} of ${output.index.totalEpisodes}`,
  );
  console.log(`  Areas: ${output.index.areas.length}`);
  console.log(`  Topics: ${output.topics.length}`);
  console.log(`  Duration: ${duration}s`);
  console.log(`  Output: ${OUTPUT}, ${TOPICS_DIR}/`);
  console.log("=".repeat(50) + "\n");

  if (warnings.length) {
    console.warn("⚠️  Warnings:\n");
    warnings.forEach((warning) => console.warn(`  - ${warning}`));
    console.warn("");
  }
}

run()
  .catch((error) => {
    console.error("\n❌ Hundewissen compilation failed:");
    console.error(`  ${error.message}\n`);
    process.exitCode = 1;
  })
  .finally(unregister);
