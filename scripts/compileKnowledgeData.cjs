const fs = require("fs-extra");
const path = require("path");
const { globSync } = require("glob");

// Use tsx to load TypeScript files at runtime
const { register } = require("tsx/cjs/api");
const unregister = register();

/**
 * Compiles all knowledge topic TypeScript files into a single JSON file
 * Output: public/data/knowledge.json
 */
async function compileKnowledgeData() {
  console.log("🔄 Compiling knowledge data...\n");

  const stats = {
    processed: 0,
    errors: 0,
    startTime: Date.now(),
  };

  try {
    // Find all knowledge topic index.ts files
    const knowledgeFiles = globSync("db/knowledge/*/index.ts", {
      absolute: true,
    });

    if (knowledgeFiles.length === 0) {
      throw new Error("No knowledge files found in db/knowledge/*/index.ts");
    }

    console.log(`Found ${knowledgeFiles.length} knowledge topic files\n`);

    const topics = [];
    const errors = [];

    // Load each knowledge topic file
    for (const file of knowledgeFiles) {
      try {
        const topicModule = require(file);
        const topic = topicModule.default;

        if (!topic) {
          throw new Error(`No default export found in ${file}`);
        }

        // Basic validation
        if (!topic.id) {
          throw new Error(`Topic missing required 'id' field`);
        }

        if (!topic.title || !topic.title.internal || !topic.title.public) {
          throw new Error(
            `Topic ${topic.id} missing required 'title' fields (internal, public)`
          );
        }

        if (!topic.description) {
          throw new Error(
            `Topic ${topic.id} missing required 'description' field`
          );
        }

        if (!topic.content) {
          throw new Error(`Topic ${topic.id} missing required 'content' field`);
        }

        topics.push(topic);
        stats.processed++;
        console.log(`  ✓ ${topic.title.public} (${topic.id})`);
      } catch (error) {
        stats.errors++;
        const errorMsg = `${path.basename(path.dirname(file))}: ${error.message}`;
        errors.push(errorMsg);
        console.error(`  ✗ ${errorMsg}`);
      }
    }

    if (topics.length === 0) {
      throw new Error("No topics successfully loaded");
    }

    // Sort topics by ID for consistent output
    topics.sort((a, b) => a.id.localeCompare(b.id));

    // Create output structure
    const output = {
      topics,
      meta: {
        compiled: new Date().toISOString(),
        count: topics.length,
        version: "1.0.0",
      },
    };

    // Ensure output directory exists
    await fs.ensureDir("public/data");

    // Write to file (minified for production)
    await fs.writeFile(
      "public/data/knowledge.json",
      JSON.stringify(output, null, 0)
    );

    const duration = ((Date.now() - stats.startTime) / 1000).toFixed(2);

    console.log("\n" + "=".repeat(50));
    console.log("✅ Knowledge compilation complete!");
    console.log("=".repeat(50));
    console.log(`  Processed: ${stats.processed}`);
    console.log(`  Errors: ${stats.errors}`);
    console.log(`  Duration: ${duration}s`);
    console.log(`  Output: public/data/knowledge.json`);
    console.log("=".repeat(50) + "\n");

    if (errors.length > 0) {
      console.warn("\n⚠️  Errors encountered during compilation:\n");
      errors.forEach((err) => console.warn(`  - ${err}`));
      console.warn("");
      process.exit(1);
    }

    unregister();
  } catch (error) {
    console.error("\n❌ Fatal error during knowledge compilation:");
    console.error(`  ${error.message}\n`);
    unregister();
    process.exit(1);
  }
}

// Run compilation
compileKnowledgeData().catch((error) => {
  console.error("\n❌ Unexpected error:", error);
  process.exit(1);
});
