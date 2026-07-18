import { readFileSync } from "node:fs";

const dinosSource = readFileSync(new URL("../src/data/dinos.ts", import.meta.url), "utf8");
const sheetsSource = readFileSync(new URL("../src/data/dinoTechnicalSheetsEn.ts", import.meta.url), "utf8");
const spanishFactsSource = readFileSync(new URL("../src/coffee/funfacts.coffee", import.meta.url), "utf8");
const englishFactsSource = readFileSync(new URL("../src/data/funfactsEn.ts", import.meta.url), "utf8");

const dinoIds = [...dinosSource.matchAll(/id:\s*"([^"]+)"/g)].map((match) => match[1]);
const sheetIds = new Set([...sheetsSource.matchAll(/"([^"]+)":\s*"/g)].map((match) => match[1]));
const missingSheets = dinoIds.filter((id) => !sheetIds.has(id));

if (missingSheets.length > 0) {
  console.error(`Missing English technical sheets for: ${missingSheets.join(", ")}`);
  process.exit(1);
}

const spanishFactCount = [...spanishFactsSource.matchAll(/^  "/gm)].length;
const englishFactCount = [...englishFactsSource.matchAll(/^  "/gm)].length;

if (spanishFactCount !== englishFactCount) {
  console.error(`English fun facts coverage mismatch: ${englishFactCount}/${spanishFactCount} translated.`);
  process.exit(1);
}

const appSource = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const forbiddenGeneratedCopy = [
  "This English view summarizes the full species note",
  "is presented as a",
  "The profile treats",
];
const leakedGeneratedCopy = forbiddenGeneratedCopy.filter((copy) => appSource.includes(copy));

if (leakedGeneratedCopy.length > 0) {
  console.error(`Generated English summary copy is still present: ${leakedGeneratedCopy.join(", ")}`);
  process.exit(1);
}

console.log(`English encyclopedia coverage OK for ${dinoIds.length} dinosaur entries.`);
console.log(`English fun facts coverage OK for ${englishFactCount} translated facts.`);
