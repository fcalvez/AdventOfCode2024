import { extractNumbers } from "../utils.ts";
import { readLines } from "../utils.ts";

const lines = await readLines('day1\\input.txt');
console.log(`Found ${lines.length} lines`);

const numbers = lines.map(l => extractNumbers(l));

// part 1
const l1 = numbers.map(n => n[0]);
const l2 = numbers.map(n => n[1]);
l1.sort();
l2.sort();

console.log(`L1 = ${l1}`);
console.log(`L2 = ${l2}`);

let total = 0;
for(let i=0; i<l1.length; i++) {
    const delta=Math.abs(l1[i] - l2[i]);
    total += delta;
}
console.log(`Distance = ${total}`);

// part 2
const l3 = numbers.map(n => n[0]);
const l4 = numbers.map(n => n[1]);

let total2 = 0;
l3.forEach(n => {
    const count = l4.filter(x => x === n).length;
    const score = n * count;
    total2 += score;
});
console.log(`Total = ${total2}`);
