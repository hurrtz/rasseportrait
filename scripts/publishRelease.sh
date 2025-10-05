#!/bin/bash

# More robust deployment script that handles git subtree conflicts
set -e

echo "🚀 Starting deployment to GitHub Pages..."

# Ensure we have the latest remote state
echo "📡 Fetching latest remote state..."
git fetch origin

# Try the normal subtree push first
echo "📦 Attempting git subtree push..."
if git subtree push --prefix build/client origin gh-pages; then
    echo "✅ Deployment successful!"
    exit 0
else
    echo "⚠️  Normal subtree push failed, using force deployment..."
    
    # Store current branch
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    # Delete and recreate the gh-pages branch with current build content
    echo "🔄 Force updating gh-pages branch..."
    git branch -D gh-pages 2>/dev/null || true
    git subtree push --prefix build/client origin gh-pages --force 2>/dev/null || {
        # If subtree push --force fails, use the nuclear option
        echo "🔥 Using nuclear option: force push new subtree..."
        
        # Create a new orphan branch with just the build content
        TEMP_BRANCH="gh-pages-$(date +%s)"
        git subtree split --prefix build/client -b $TEMP_BRANCH
        
        # Force push the new branch to gh-pages
        git push origin $TEMP_BRANCH:gh-pages --force
        
        # Clean up temporary branch
        git branch -D $TEMP_BRANCH
    }
    
    # Return to original branch
    git checkout $CURRENT_BRANCH
    
    echo "✅ Force deployment completed!"
fi
