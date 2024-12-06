import { readLines } from "../utils.ts";

const lines = await readLines("day6\\input.txt");
console.log(`Found ${lines.length} lines`);

// create the map
const map: string[][] = [];
lines.forEach((line) => {
    if (line.length > 1) {
        map.push(line.slice(0, -1).split(""));
    }
});

// dimensions
const ty = map.length;
const tx = map[0].length;

// find the starting position
let x = -1;
let y = -1;
for (y = 0; y < map.length && x === -1; y++) {
    x = map[y].indexOf("^");
}
y--;
console.log(`Initial pos = ${x},${y}`);

// Directions
const dirx = [0, 1, 0, -1];
const diry = [-1, 0, 1, 0];
let dirIndex = 0;

// display
function displayMap(): void {
    map.forEach((line) => {
        console.log(line);
    });
}

// Moving
const inside = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < tx && y < ty;

while (inside(x, y)) {
    // mark position on map
    map[y][x] = "X";
    console.log(" ");
    //displayMap();
    // Move
    let x1 = x + dirx[dirIndex];
    let y1 = y + diry[dirIndex];

    // obstacle
    if (inside(x1, y1) && map[y1][x1] === "#") {
        // can't go there
        x1 = x;
        y1 = y;
        // turn
        dirIndex = (dirIndex + 1) % dirx.length;
    } else {
        x = x1;
        y = y1;
    }
}

console.log(`Final position ${x},${y}`);

// count visited positions
const count = map.reduce((p, row) => {
    return p + row.reduce((pp, col) => {
        if (col === "X") {
            return pp + 1;
        }
        return pp;
    }, 0);
}, 0);
console.log(`Positions = ${count}`);
