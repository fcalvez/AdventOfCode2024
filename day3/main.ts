import { readLines } from "../utils.ts";

const lines = await readLines("day3\\input.txt");
console.log(`Found ${lines.length} lines`);

const regMemory = /mul\((\d{1,3}),(\d{1,3})\)/g;

let total = 0;

lines.forEach((line) => {
    let str;
    while ((str = regMemory.exec(line)) !== null) {
        const n1 = Number(str[1]);
        const n2 = Number(str[2]);
        const mult = n1 * n2;
        console.log(`${n1}x${n2}=${mult}`);
        total += mult;
    }
});

console.log(`Total = ${total}`);
