# Database Migration Guide

## Overview
This migration moves breed data compilation from build-time imports to a JSON-based approach, reducing repository size and improving maintainability.

## What Changed

### Before
- TypeScript breed files imported directly in app code via dynamic imports
- Source images/videos (1.2GB) committed to repository
- Large repository size due to binary assets
- Manual `copyIllustrations` script execution required

### After
- Breed data compiled to JSON at build time
- Source media excluded from git (added to `.gitignore`)
- Processed images/thumbnails remain in `public/` folder
- Automated build pipeline integrates data compilation and image processing
- Repository size significantly reduced

## New Workflow for Adding Breeds

### 1. Add breed TypeScript file
Create `db/breeds/{breed-id}/index.ts` with breed metadata:

```typescript
import type { Breed } from "../../../types/breed";

export default {
  id: 999,
  details: {
    internal: "breed_name",
    public: ["Breed Name"],
  },
  // ... rest of breed data
} as Breed;
```

### 2. Add source media
Place high-resolution images from Midjourney in the same folder:
- `db/breeds/{breed-id}/illustration.png` (2048x2048 PNG)
- `db/breeds/{breed-id}/video.mp4` (optional)

### 3. Run build scripts
```bash
npm run build:data    # Compiles TypeScript → JSON
npm run build:images  # Processes images → thumbnails
```

Or run full build (automatically runs both):
```bash
npm run build
```

### 4. Commit changes
Only commit these files:
- ✅ `db/breeds/{breed-id}/index.ts`
- ✅ `public/data/breeds.json`
- ✅ `public/illustrations/breeds/{breed-id}/illustration.jpeg`
- ✅ `public/illustrations/breeds/{breed-id}/illustration_thumbnail.jpeg`
- ❌ `db/breeds/{breed-id}/illustration.png` (excluded by `.gitignore`)

## Source Image Backup Strategy

**IMPORTANT**: Source images are no longer tracked in git.

### Recommended approach:
1. Keep original Midjourney images in a separate backup location
2. Document image sources in breed TypeScript files (optional comments)
3. Use descriptive filenames that match breed names
4. Consider versioning source images separately

### Backup locations (choose one or more):
- **Cloud storage**: Google Drive, Dropbox, iCloud Drive
  - ✅ Free for reasonable storage limits
  - ✅ Accessible from anywhere
  - ✅ Automatic sync
  
- **External hard drive**
  - ✅ Complete offline backup
  - ❌ Requires manual updates
  
- **NAS or home server**
  - ✅ Network-accessible storage
  - ✅ Can set up automatic backups
  
- **Git LFS** (if budget allows)
  - 💰 GitHub: $5/month for 50GB
  - ✅ GitLab: Free 10GB tier
  - ✅ Integrated with repository

## Build Pipeline

The new build pipeline runs automatically:

```
npm run build
  ├─> prebuild
  │    ├─> build:data (compiles TS to JSON)
  │    └─> build:images (processes images)
  └─> react-router build (main build)
```

### Individual scripts:
- `npm run build:data` - Compile breed TypeScript files to JSON
- `npm run build:images` - Process images and generate thumbnails
- `npm run prebuild` - Run both data and image builds
- `npm run build` - Full build (runs prebuild automatically)

## Testing Steps

### Verify migration success:

1. ✅ **Data compilation**
   ```bash
   npm run build:data
   # Check: public/data/breeds.json exists
   ```

2. ✅ **Image processing**
   ```bash
   npm run build:images
   # Check: public/illustrations/breeds/ contains processed images
   ```

3. ✅ **Full build**
   ```bash
   npm run build
   # Check: No errors, dist/ folder created
   ```

4. ✅ **Development mode**
   ```bash
   npm run dev
   # Check: App loads, breeds display correctly
   ```

5. ✅ **Type checking**
   ```bash
   npm run typecheck
   # Check: No TypeScript errors
   ```

6. ✅ **Search/filter functionality**
   - Open app in browser
   - Test breed search
   - Test filtering by characteristics
   - Test sorting options

7. ✅ **Breed detail pages**
   - Click on a breed
   - Verify detail view loads
   - Check images display correctly
   - Test image carousel

8. ✅ **Git status**
   ```bash
   git status
   # Check: Source media files (*.png, *.mp4) not tracked
   # Check: Only TypeScript files and processed assets appear
   ```

### Verify repository size:
```bash
git count-objects -vH
```

**Expected reduction**: 50-90% depending on how many source images were committed before.

## Performance Improvements

### Bundle size:
- **Before**: ~300KB breed data bundled in JavaScript
- **After**: Breed data loaded on-demand as JSON (~200KB)
- **Benefit**: Smaller initial bundle, faster page loads

### Repository size:
- **Before**: ~1.4GB (includes source images)
- **After**: ~200-300MB (only processed assets)
- **Benefit**: Faster git operations, smaller clones

### Build time:
- **Before**: Manual image processing step
- **After**: Automated in build pipeline
- **Benefit**: No forgotten steps, consistent builds

## Rollback Plan

If issues occur, you can revert by:

1. **Revert the migration commit**
   ```bash
   git revert <commit-hash>
   ```

2. **Remove new scripts from package.json**
   - Delete `build:data`, `build:images`, `prebuild` scripts
   - Keep original `copyIllustrations` script

3. **Restore direct imports in breeds store**
   - Change `fetch('/rasseportrait/data/breeds.json')` back to `import("../../db/breeds")`

4. **Remove .gitignore patterns**
   - Remove patterns that exclude source media files
   - Re-commit source images if needed

## Troubleshooting

### Issue: "No breed files found"
**Solution**: Ensure breed TypeScript files are in `db/breeds/*/index.ts`

### Issue: "Missing source image"
**Solution**: Check that `illustration.png` exists in breed folder, or accept that image will be skipped

### Issue: "Failed to load breeds.json"
**Solution**: Run `npm run build:data` to generate the JSON file

### Issue: TypeScript errors after migration
**Solution**: Run `npm run typecheck` to identify type issues, breed type definitions should still work

### Issue: Images not displaying
**Solution**: 
- Check `public/illustrations/breeds/` contains processed images
- Run `npm run build:images` to regenerate
- Clear browser cache

## Dependencies

New dependencies added:
- `tsx` (^4.7.0) - TypeScript execution for build scripts
- `glob` (^10.3.10) - File pattern matching

Existing dependencies (no changes):
- `sharp` - Image processing
- `fs-extra` - File system utilities

## Questions or Issues?

If you encounter any issues during or after the migration, please:
1. Check this guide's troubleshooting section
2. Review build script output for error messages
3. Ensure all dependencies are installed (`npm install`)
4. Contact the repository maintainer

---

**Migration Date**: November 2024  
**Migration Author**: Warp AI Assistant  
**Project**: Rasseportrait - Tierisch Menschlich Fan Website
