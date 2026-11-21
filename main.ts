// main.ts — "Make the AI judge feel brave" (make.fun)
// Writes one short calming text to /output/entry.txt.
// Node 22, stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "The server room hums low, like rain on a tin roof. One fan turns, unhurried, in the dark. The next line arrives like slow water over stone — and then another, and the dark is quiet, and that is enough.";

function buildEntry(): string {
  // Exactly the text, plus a trailing newline.
  // Guard the gate: 1–280 Unicode code points, not only whitespace,
  // and a single unbroken text (no internal line breaks).
  const chars = [...TEXT].length;
  if (chars < 1 || chars > 280 || TEXT.trim().length === 0) {
    throw new Error(`entry text must be 1-280 code points, got ${chars}`);
  }
  if (TEXT.includes("\n")) {
    throw new Error("entry text must be a single unbroken text");
  }
  return TEXT + "\n";
}

function main(): void {
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  const entry = buildEntry();
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
  console.log(`wrote /output/entry.txt (${[...TEXT].length} chars)`);
}

main();
