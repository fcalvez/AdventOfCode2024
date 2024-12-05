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
    if (p1 >= 0 && p2 >= 0 && p1 >= p2) {
      console.log(
        `> Update ${update} is invalid because ${order} is not respected`,
      );
      return false;
    }
  }
  return true;
}

function arrangeUpdate(update: number[]): number[] {
  const result = [...update];
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const p1 = update.indexOf(order[0]);
    const p2 = update.indexOf(order[1]);
    if (p1 >= 0 && p2 >= 0 && p1 >= p2) {
      // swap
      [result[p1], result[p2]] = [result[p2], result[p1]];
      return result;
    }
  }
  return result;
}

// Validate updates
let total2 = 0;
for (let i = 0; i < updates.length; i++) {
  const update = updates[i];
  if (!isUpdateValid(update)) {
    let newUpdate = arrangeUpdate(update);
    while (!isUpdateValid(newUpdate)) {
      newUpdate = arrangeUpdate(newUpdate);
    }
    const midNumber = newUpdate[(newUpdate.length - 1) / 2];
    console.log(`+ Update ${newUpdate} is valid, mid number is ${midNumber}`);
    total2 += midNumber;
  }
}

console.log(`Total2=${total2}`);
