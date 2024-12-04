import { readLines } from "../utils.ts";

const lines = await readLines("day3\\input.txt");
console.log(`Found ${lines.length} lines`);

const regMemory = /(mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don)'t\(\)/g;

let total = 0;
let enableMult = true;
lines.forEach((line) => {
    let str;
    while ((str = regMemory.exec(line)) !== null) {
        if (str[1] === "mul") {
            const n1 = Number(str[2]);
            const n2 = Number(str[3]);
            const mult = n1 * n2;
            if (enableMult) {
                console.log(`${n1}x${n2}=${mult}`);
                total += mult;
            } else {
                console.log(`ignored ${n1}x${n2}=${mult}`);
            }
        } else if (str[4] === "do") {
            enableMult = true;
            console.log("Do!");
        } else if (str[5] === "don") {
            enableMult = false;
            console.log("Don't!");
        } else {
            console.log(`${str}`);
        }
    }
});

console.log(`Total = ${total}`);
