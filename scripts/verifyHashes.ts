#!/usr/bin/env tsx
/**
 * Verify that breed hash generation works correctly
 */

import { fileURLToPath } from 'url';
import * as path from 'path';
import { generateBreedHashes } from '../app/utils/generateBreedHash';

// ESM module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadBreeds() {
  // Load breeds similar to how the store does it
  const breedsModule = await import('../db/breeds/index.js');
  const breedsDB = breedsModule.default;
  const breeds = Object.values(breedsDB);
  
  // Load merging logic
  const utilsModule = await import('../app/pages/rasseportrait/utils.js');
  const { mergeGroupedBreeds } = utilsModule;
  
  const singleBreeds = breeds.filter((breed: any) => !breed.details.groupAs);
  const mergedBreeds = mergeGroupedBreeds(breeds);
  const allBreeds = [...singleBreeds, ...mergedBreeds];
  
  return allBreeds;
}

async function main() {
  console.log('Verifying breed hash generation...\n');
  
  const breeds = await loadBreeds();
  console.log(`Loaded ${breeds.length} breeds\n`);
  
  // Generate hashes
  const hashMap = generateBreedHashes(breeds);
  
  // Verify uniqueness
  const hashes = Array.from(hashMap.values());
  const uniqueHashes = new Set(hashes);
  
  console.log('Results:');
  console.log('========');
  console.log(`Total breeds: ${breeds.length}`);
  console.log(`Generated hashes: ${hashMap.size}`);
  console.log(`Unique hashes: ${uniqueHashes.size}`);
  console.log(`Collisions handled: ${hashes.length - uniqueHashes.size}`);
  
  // Show some example mappings
  console.log('\nExample mappings:');
  console.log('=================');
  const examples = Array.from(hashMap.entries()).slice(0, 20);
  for (const [id, hash] of examples) {
    console.log(`${String(id).padEnd(20)} → ${hash}`);
  }
  
  // Show special and grouped breeds
  console.log('\nSpecial & Grouped breeds:');
  console.log('=========================');
  for (const [id, hash] of hashMap.entries()) {
    const idStr = String(id);
    if (idStr.startsWith('special_') || idStr.startsWith('grouped_')) {
      console.log(`${idStr.padEnd(25)} → ${hash}`);
    }
  }
  
  // Verify all hashes are 4 characters
  const invalidHashes = hashes.filter(h => h.length !== 4 || !/^[a-z0-9]+$/.test(h));
  if (invalidHashes.length > 0) {
    console.error('\n❌ Invalid hashes found:', invalidHashes);
  } else {
    console.log('\n✅ All hashes are valid 4-character alphanumeric strings');
  }
  
  if (uniqueHashes.size === hashMap.size) {
    console.log('✅ All hashes are unique - no collisions!');
  } else {
    console.log('⚠️  Some duplicate hashes found');
  }
}

main().catch(console.error);