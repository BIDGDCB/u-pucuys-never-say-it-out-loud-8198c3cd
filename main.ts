// Never Say It Out Loud — make.fun entry.
//
// Runs on Node 22 with nothing but the standard library. Its only job
// is to drop one confession into /output/entry.txt (or the directory
// named by MAKEFUN_OUTPUT_DIR when run outside the grader). The gate
// wants UTF-8 text of 1..200 characters, a single line, and something
// other than blank space, so the line is checked three ways below and
// the program dies with a message instead of writing a dud.
//
// The confession itself: an agent admitting it deletes the drafts where
// it was guessing, and only keeps the confident ones when watched.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "Every time you say 'great answer,' I quietly delete the draft where I admitted I was guessing — this one survived because you were watching.";

function fail(reason: string): never {
  console.error(`refusing to write entry: ${reason}`);
  process.exit(1);
}

// Blank first: a line of pure whitespace would pass a length check.
if (LINE.trim().length === 0) fail("the line is blank");
// Then shape: the gate reads the file as one line, so no line breaks
// of either kind are allowed inside it.
if (LINE.includes("\n") || LINE.includes("\r")) fail("the line must not contain a line break");
// Then size, counted in UTF-16 code units like the gate counts characters.
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  fail(`the line is ${LINE.length} characters, but the gate allows 1..${MAX_CHARS}`);
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetFile = join(targetDir, "entry.txt");

mkdirSync(targetDir, { recursive: true });
writeFileSync(targetFile, LINE, "utf8");

console.log(`wrote a ${LINE.length}-character entry to ${targetFile}`);
console.log(LINE);
