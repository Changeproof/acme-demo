// Simple automatic test for index.html.
// It reads the web page and checks two things: (1) there is a title,
// and (2) there is a version number like 1.0.0. If either is missing,
// the test fails (exit code 1) so GitHub can block the change.

const fs = require("fs");

const html = fs.readFileSync(__dirname + "/index.html", "utf8");
let failures = 0;

// Check 1: a non-empty <title>...</title>
const titleMatch = html.match(/<title>\s*(.+?)\s*<\/title>/i);
if (titleMatch && titleMatch[1].length > 0) {
  console.log('PASS: page has a title ("' + titleMatch[1] + '")');
} else {
  console.error("FAIL: page is missing a <title>");
  failures++;
}

// Check 2: a version number in the form digits.digits.digits (e.g. 1.0.0)
const versionMatch = html.match(/\b(\d+\.\d+\.\d+)\b/);
if (versionMatch) {
  console.log("PASS: page has a version number (" + versionMatch[1] + ")");
} else {
  console.error("FAIL: page is missing a version number like 1.0.0");
  failures++;
}

if (failures > 0) {
  console.error("\nTEST FAILED: " + failures + " check(s) did not pass.");
  process.exit(1);
} else {
  console.log("\nTEST PASSED: all checks passed.");
  process.exit(0);
}
