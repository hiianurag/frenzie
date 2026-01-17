const fs = require("fs");

try {
  const content = fs.readFileSync("page.html", "utf8");

  // Find Header
  // The data attribute is data-framer-name="Header"
  // We need to find the opening <div that contains this.

  // Regex for finding the tag with this attribute
  // <div class="..." data-framer-name="Header" ...>

  const headerTagRegex = /<div [^>]*data-framer-name="Header"[^>]*>/;
  const headerMatch = content.match(headerTagRegex);

  if (headerMatch) {
    console.log("Header Found match:", headerMatch[0]);
    console.log("Header Index:", headerMatch.index);

    // Find closing tag?
    // We assume Header is followed by Main.
    const mainTagRegex = /<div [^>]*data-framer-name="Main"[^>]*>/;
    const mainMatch = content.match(mainTagRegex);

    if (mainMatch) {
      console.log("Main Found match:", mainMatch[0]);
      console.log("Main Index:", mainMatch.index);

      // Header content is from headerMatch.index to mainMatch.index
      // Need to verify if there is anything between them.
      // Usually <div header>...</div><div main>
      // So content.substring(headerIndex, mainIndex) should contain the header div and its content.

      // Let's verify standard structure: ...</div><div main...
      // If we blindly take substring, we assume Header is a sibling of Main and immediately precedes it.
    }
  } else {
    console.log("Header NOT found");
  }

  // Find Footer
  const footerTagRegex = /<div [^>]*data-framer-name="Footer"[^>]*>/;
  const footerMatch = content.match(footerTagRegex);

  if (footerMatch) {
    console.log("Footer Found match:", footerMatch[0]);
    console.log("Footer Index:", footerMatch.index);

    // Show context after footer
    const start = footerMatch.index;
    const end = Math.min(start + 500, content.length);
    console.log("Footer Start Context:", content.substring(start, end));
  } else {
    console.log("Footer NOT found");
  }
} catch (e) {
  console.error(e);
}
