const fs = require("fs-extra");
const path = require("path");
const { globSync } = require("glob");

// Use tsx to load TypeScript files at runtime
const { register } = require("tsx/cjs/api");
const unregister = register();

/**
 * Compiles all breed TypeScript files into a single JSON file
 * Output: public/data/breeds.json
 */
async function compileBreedData() {
  console.log("🔄 Compiling breed data...\n");

  const stats = {
    processed: 0,
    errors: 0,
    startTime: Date.now(),
  };

  try {
    // Find all breed index.ts files
    const breedFiles = globSync("db/breeds/*/index.ts", {
      absolute: true,
    });

    if (breedFiles.length === 0) {
      throw new Error("No breed files found in db/breeds/*/index.ts");
    }

    console.log(`Found ${breedFiles.length} breed files\n`);

    const breeds = [];
    const errors = [];

    // Load each breed file
    for (const file of breedFiles) {
      try {
        const breedModule = require(file);
        const breed = breedModule.default;

        if (!breed) {
          throw new Error(`No default export found in ${file}`);
        }

        // Basic validation
        if (!breed.id) {
          throw new Error(`Breed missing required 'id' field`);
        }

        if (!breed.details || !breed.details.internal) {
          throw new Error(`Breed ${breed.id} missing required 'details.internal' field`);
        }

        breeds.push(breed);
        stats.processed++;
        console.log(`  ✓ ${breed.details.internal} (${breed.id})`);
      } catch (error) {
        stats.errors++;
        const errorMsg = `${path.basename(path.dirname(file))}: ${error.message}`;
        errors.push(errorMsg);
        console.error(`  ✗ ${errorMsg}`);
      }
    }

    if (breeds.length === 0) {
      throw new Error("No breeds successfully loaded");
    }

    // Sort breeds by ID for consistent output
    breeds.sort((a, b) => {
      const idA = typeof a.id === "number" ? a.id : a.id.toString();
      const idB = typeof b.id === "number" ? b.id : b.id.toString();
      return idA < idB ? -1 : idA > idB ? 1 : 0;
    });

    // Create output structure
    const output = {
      breeds,
      meta: {
        compiled: new Date().toISOString(),
        count: breeds.length,
        version: "1.0.0",
      },
    };

    // Ensure output directory exists
    await fs.ensureDir("public/data");

    // Write to file (minified for production)
    await fs.writeFile(
      "public/data/breeds.json",
      JSON.stringify(output, null, 0)
    );

    const duration = ((Date.now() - stats.startTime) / 1000).toFixed(2);

    console.log("\n" + "=".repeat(50));
    console.log("✅ Breed compilation complete!");
    console.log("=".repeat(50));
    console.log(`  Processed: ${stats.processed}`);
    console.log(`  Errors: ${stats.errors}`);
    console.log(`  Duration: ${duration}s`);
    console.log(`  Output: public/data/breeds.json`);
    console.log("=".repeat(50) + "\n");

    if (errors.length > 0) {
      console.warn("\n⚠️  Errors encountered during compilation:\n");
      errors.forEach((err) => console.warn(`  - ${err}`));
      console.warn("");
      process.exit(1);
    }

    unregister();
  } catch (error) {
    console.error("\n❌ Fatal error during breed compilation:");
    console.error(`  ${error.message}\n`);
    unregister();
    process.exit(1);
  }
}

// Run compilation
compileBreedData().catch((error) => {
  console.error("\n❌ Unexpected error:", error);
  process.exit(1);
});
