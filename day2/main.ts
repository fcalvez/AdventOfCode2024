import { extractNumbers } from "../utils.ts";
import { readLines } from "../utils.ts";
import { isLevelValid } from "./lib.ts";

const lines = await readLines("day2\\input.txt");
console.log(`Found ${lines.length} lines`);

const levels: number[][] = [];
lines.forEach((line) => {
    const level = extractNumbers(line);
    levels.push(level);
});

let validLevelsCount = 0;
levels.forEach((level) => {
    if (isLevelValid(level, true)) {
        validLevelsCount++;
        //console.log(`Level ${level} Safe`);
    } else {
        console.log(`Level ${level} Unsafe`);
    }
});

console.log(`Valid levels count = ${validLevelsCount}`);
