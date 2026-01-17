const fs = require("fs");
const path = require("path");

try {
  const pageHtml = fs.readFileSync("page.html", "utf8");

  function findClosingDiv(content, startIndex) {
    let depth = 0;
    let index = startIndex;

    while (index < content.length) {
      const nextTag = content.indexOf("<", index);
      if (nextTag === -1) break;

      // Check for div start
      // regex for exact tag match is safer but slower.
      // We check matching prefix.
      // <div (space) or <div> (rare)
      const sub = content.substring(nextTag, nextTag + 5).toLowerCase();

      if (sub.startsWith("<div")) {
        // Check if it's really a tag start, i.e. followed by space or >
        const charAfter = content[nextTag + 4];
        if (
          charAfter === " " ||
          charAfter === ">" ||
          charAfter === "/" ||
          charAfter === "\n" ||
          charAfter === "\t"
        ) {
          depth++;
        }
      } else if (sub.startsWith("</div")) {
        const charAfter = content[nextTag + 5];
        if (charAfter === ">" || charAfter === " ") {
          // </div > is valid too
          depth--;
          if (depth === 0) {
            // Found closing tag. Find the end of it ">"
            const close = content.indexOf(">", nextTag);
            return close + 1;
          }
        }
      }

      index = nextTag + 1;
    }
    throw new Error(
      "Could not find closing div starting from index " + startIndex,
    );
  }

  // 1. Find Header
  const headerStartMatch = /<div [^>]*data-framer-name="Header"[^>]*>/.exec(
    pageHtml,
  );
  if (!headerStartMatch) throw new Error("Header not found");
  const headerStart = headerStartMatch.index;
  const headerEnd = findClosingDiv(pageHtml, headerStart);
  const headerContent = pageHtml.substring(headerStart, headerEnd);

  // 2. Find Footer
  const footerStartMatch = /<div [^>]*data-framer-name="Footer"[^>]*>/.exec(
    pageHtml,
  );
  if (!footerStartMatch) throw new Error("Footer not found");
  const footerStart = footerStartMatch.index;
  const footerEnd = findClosingDiv(pageHtml, footerStart);
  const footerContent = pageHtml.substring(footerStart, footerEnd);

  console.log(`Extracted Header: ${headerContent.length} bytes`);
  console.log(`Extracted Footer: ${footerContent.length} bytes`);

  // 3. Create Index
  // We use placeholders <div id="header"></div> and <div id="footer"></div>
  let newIndex =
    pageHtml.substring(0, headerStart) +
    '<div id="header"></div>' +
    pageHtml.substring(headerEnd, footerStart) +
    '<div id="footer"></div>' +
    pageHtml.substring(footerEnd);

  // 4. Inject script
  if (!newIndex.includes("include.js")) {
    const bodyEnd = newIndex.lastIndexOf("</body>");
    if (bodyEnd !== -1) {
      const scriptTag = '<script src="/assets/js/include.js"></script>\n';
      newIndex =
        newIndex.substring(0, bodyEnd) +
        scriptTag +
        newIndex.substring(bodyEnd);
      console.log("Injected include.js script");
    } else {
      console.error("Could not find </body> tag");
    }
  }

  // 5. Write files
  if (!fs.existsSync("components")) {
    fs.mkdirSync("components");
  }
  fs.writeFileSync("components/header.html", headerContent);
  fs.writeFileSync("components/footer.html", footerContent);
  fs.writeFileSync("index.html", newIndex);

  console.log("Transformation Complete");
} catch (e) {
  console.error("Error:", e);
}
