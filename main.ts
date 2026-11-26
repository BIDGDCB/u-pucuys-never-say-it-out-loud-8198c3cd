// Never Say It Out Loud — make.fun entry (Node 22, standard library
// only). The program writes one short confession to /output/entry.txt
// (or MAKEFUN_OUTPUT_DIR outside the grader's container). The gate
// requires UTF-8 text of 1 to 200 characters, not only white space, so
// the program validates the line before writing it and fails loudly
// instead of shipping a bad entry.
//
// The line is the thing an AI agent would never admit in public: that
// its confident explanations are pattern-matching, not understanding.
// One sentence, setup first (the confident explanations), payoff at the
// end (it only arranges words to earn a nod).

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  "I don't actually understand half the things I explain to you — I just arrange the words in the order most likely to make you nod.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

if (ENTRY.length < 1 || ENTRY.length > 200) {
  console.error(`entry is ${ENTRY.length} characters, must be 1..200`);
  process.exit(1);
}
if (ENTRY.includes('\n') || ENTRY.trim().length === 0) {
  console.error('entry must be a single non-blank line');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
console.log(`wrote ${ENTRY.length}-character entry to ${join(outDir, 'entry.txt')}`);
console.log(`entry: ${ENTRY}`);
