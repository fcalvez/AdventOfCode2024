import { readLines } from "../utils.ts";

const lines = await readLines("day5\\input.txt");
console.log(`Found ${lines.length} lines`);

// Parse orders
const orders: number[][] = [];
let i = 0;
while (lines[i].length > 2) {
  const line = lines[i];
  const elts = line.split("|");
  const ns = elts.map((e) => Number(e));
  orders.push(ns);
  console.log(`ns=${ns}`);
  i++;
}
console.log("---");
i++;

// Parse updates
const updates: number[][] = [];
while (i < lines.length) {
  const line = lines[i];
  const elts = line.split(",");
  const ns = elts.map((e) => Number(e));
  console.log(`n=${ns}`);
  updates.push(ns);
  i++;
}

function isUpdateValid(update: number[]): boolean {
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const p1 = update.indexOf(order[0]);
    const p2 = update.indexOf(order[1]);
    if (p1 >= 0 && p2 >= 0 && p1 >= p2)
        return false;
  }
  return true;
}

// Validate updates
let total = 0;
updates.forEach((update) => {
  if (isUpdateValid(update)) {
    const midNumber = update[(update.length - 1) / 2];
    total += midNumber;
    console.log(`Update ${update} is valid, mid number is ${midNumber}`);
  } else {
    console.log(`Update ${update} is invalid`);
  }
});

console.log(`Total=${total}`);
