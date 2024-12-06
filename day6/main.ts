import { readLines } from "../utils.ts";

const lines = await readLines("day6\\input.txt");
console.log(`Found ${lines.length} lines`);

// create the map
const globalMap: string[][] = [];
lines.forEach((line) => {
    if (line.length > 1) {
        globalMap.push(line.slice(0, -1).split(""));
    }
});

// dimensions
const ty = globalMap.length;
const tx = globalMap[0].length;

// find the starting position
let startX = -1;
let startY = -1;
for (startY = 0; startY < globalMap.length && startX === -1; startY++) {
    startX = globalMap[startY].indexOf("^");
}
startY--;
console.log(`Initial pos = ${startX},${startY}`);

// Directions
const dirx = [0, 1, 0, -1];
const diry = [-1, 0, 1, 0];
const dirSymbol = ["1", "2", "3", "4", "+"];

// display
function displayMap(map: string[][]): void {
    map.forEach((line) => {
        console.log(line.join(""));
    });
}

// Moving
const inside = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < tx && y < ty;

// returns true if loop détected
// returns false if deplacement end outside of map
function testMap(map: string[][], debug: boolean): boolean {
    let isLoop = false;
    let x = startX;
    let y = startY;
    let dirIndex = 0;

    while (inside(x, y) && !isLoop) {
        // mark position on map
        if (dirSymbol.includes(map[y][x])) {
            // cross
            map[y][x] = dirSymbol[4];
        } else {
            map[y][x] = dirSymbol[dirIndex];
        }

        if (debug) {
            displayMap(map);
            console.log(`-- x=${x} y=${y} dir=${dirIndex} --`);
        }

        // Move
        let x1 = x + dirx[dirIndex];
        let y1 = y + diry[dirIndex];

        if (inside(x1, y1)) {
            // obstacle
            if (map[y1][x1] === "#" || map[y1][x1] === "O") {
                // can't go there
                x1 = x;
                y1 = y;
                // turn
                dirIndex = (dirIndex + 1) % dirx.length;

                // loop détected !
            } else if (map[y1][x1] === dirSymbol[dirIndex]) {
                isLoop = true;

                // continue to move
            } else {
                x = x1;
                y = y1;
            }
        } else {
            x = x1;
            y = y1;
        }
    }

    console.log(`Final position ${x},${y}`);
    return isLoop;
}

function visitedPos(map: string[][]): number[][] {
    const visited: number[][] = [];
    // list visited positions
    for (let y = 0; y < ty; y++) {
        for (let x = 0; x < tx; x++) {
            if (dirSymbol.includes(map[y][x])) {
                visited.push([x, y]);
            }
        }
    }
    return visited;
}

function copyMap(map: string[][]): string[][] {
    const result: string[][] = [];
    map.forEach((row) => {
        result.push([...row]);
    });
    return result;
}

// first map
const firstMap = copyMap(globalMap);
const looped = testMap(firstMap, false);
let visited = visitedPos(firstMap);
console.log(`Loop = ${looped}    Moves = ${visited.length}`);
console.log(" ");

// try to put an obstacle on every visited position to create a loop
let countLooped = 0;
visited = [[81,16]];
for(let i=0; i<visited.length; i++) {
    const v = visited[i];

    const x = v[0];
    const y = v[1];
    const tempMap = copyMap(globalMap);
    tempMap[y][x] = "O";
    displayMap(tempMap);
    console.log(`${i+1}/${visited.length} Obstacle ${x},${y}`);
    const looped = testMap(tempMap, true);
    console.log(`> Looped = ${looped}`);
    displayMap(tempMap);
    console.log(" ");

    if (looped) {
        //displayMap(tempMap);
        countLooped++;
    }
}

console.log(`Loop counts = ${countLooped}`);
