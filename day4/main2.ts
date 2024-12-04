import { readLines } from "../utils.ts";

const lines = await readLines("day4\\input.txt");
console.log(`Found ${lines.length} lines`);

const tx = lines[0].length;
const ty = lines.length;

function findMas(x: number, y: number): number {
    let count = 0;

    // eliminate borders
    if (y >= 1 && x >= 1 && x < tx - 1 && y < ty - 1) {
        // get the four corners
        const v = lines[y - 1][x - 1].charCodeAt(0) +
            lines[y + 1][x - 1].charCodeAt(0) +
            lines[y + 1][x + 1].charCodeAt(0) +
            lines[y - 1][x + 1].charCodeAt(0);

        // M + M + S + S = 77 + 77 + 83 + 83 = 320
        if (v === 320 && lines[y - 1][x - 1] !== lines[y + 1][x + 1]) {
            count++;
        }
    }

    return count;
}

let total = 0;
// Find every X
for (let y = ty - 1; y >= 0; y--) {
    for (let x = tx - 1; x >= 0; x--) {
        // for each A
        if (lines[y][x] === "A") {
            // search for MAS
            const c = findMas(x, y);
            if(c > 0)            {
                console.log(`Find A at {${x},${y}} -> ${c}`);
                console.log(`${lines[y-1][x-1]}${lines[y-1][x]}${lines[y-1][x+1]}`);
                console.log(`${lines[y][x-1]}${lines[y][x]}${lines[y][x+1]}`);
                console.log(`${lines[y+1][x-1]}${lines[y+1][x]}${lines[y+1][x+1]}`);
                total += c;
            }
        }
    }
}

console.log(`total MAS = ${total}`);
