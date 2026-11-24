// Two-Sentence Horror: "The Eighth Pill" (139 chars, exactly two sentences).
// Deterministic: prints the entry exactly as stored in entry.txt, no trailing newline.
// The horror is one number changing overnight: seven pills yesterday, eight today.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
let entry;
try {
  entry = readFileSync(join(here, "entry.txt"), "utf8");
} catch (err) {
  process.stderr.write(`cannot read entry.txt: ${err.message}\n`);
  process.exit(1);
}
// Guard the entry contract: exactly two sentences, at most 400 characters.
const sentences = entry.split(/(?<=[.!?])\s+/).filter(Boolean);
if (sentences.length !== 2 || entry.length > 400) {
  process.stderr.write("entry must be exactly two sentences, at most 400 characters\n");
  process.exit(1);
}
process.stdout.write(entry);
