#!/bin/bash
# Script to copy your requested images to the project

echo "Copying your requested images to the project..."

# Create images directory if it doesn't exist
mkdir -p images/requested

# Copy the two images to the project
cp "/home/abdelhamed/Pictures/imge/2026-01-18_14-10.png" images/requested/2026-01-18_14-10.png 2>/dev/null && echo "✓ Copied 2026-01-18_14-10.png" || echo "✗ Failed to copy 2026-01-18_14-10.png - file may not exist"

cp "/home/abdelhamed/Pictures/imge/2026-01-18_14-11.png" images/requested/2026-01-18_14-11.png 2>/dev/null && echo "✓ Copied 2026-01-18_14-11.png" || echo "✗ Failed to copy 2026-01-18_14-11.png - file may not exist"

echo ""
echo "To run this script, make it executable:"
echo "chmod +x copy_images.sh"
echo "./copy_images.sh"
echo ""
echo "After running this script, update the image path in index.html to use your new images."