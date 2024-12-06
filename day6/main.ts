import { readLines } from "../utils.ts";

const lines = await readLines("day6\\input.txt");
console.log(`Found ${lines.length} lines`);

enum StatusCode {
    none = 0,
    start = 0x40,
    obstacle = 0x10,
    newObstacle = 0x20,
    top = 1,
    right = 2,
    down = 4,
    left = 8,
}

// items map
function charToNum(c:string):StatusCode {
    switch (c) {
        case '^':
            return StatusCode.start;
        case '#':
            return StatusCode.obstacle;
        default:
            return StatusCode.none;
    }
}

// create the map
const globalMap: StatusCode[][] = [];
lines.forEach((line) => {
    if (line.length > 1) {
        globalMap.push(line.slice(0, -1).split("").map(x => charToNum(x)));
    }
});

// dimensions
const ty = globalMap.length;
const tx = globalMap[0].length;

// find the starting position
let startX = -1;
let startY = -1;
for (startY = 0; startY < globalMap.length && startX === -1; startY++) {
    startX = globalMap[startY].indexOf(StatusCode.start);
}
startY--;
console.log(`Initial pos = ${startX},${startY}`);

// Directions
const dirx = [0, 1, 0, -1];
const diry = [-1, 0, 1, 0];
const dirSymbol = [StatusCode.top, StatusCode.right, StatusCode.down, StatusCode.left];

// display
function displayMap(map: StatusCode[][]): void {
    map.forEach((line) => {
        console.log(displayLine(line));
    });
}
function displayLine(line: StatusCode[]) : string {
    return line.map(x => x === StatusCode.none ? ' .' : x.toString(16).padStart(2,' ')).join(' ');
}

// Moving
const inside = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < tx && y < ty;

// returns true if loop détected
// returns false if deplacement end outside of map
function testMap(map: StatusCode[][], debug: boolean): boolean {
    let isLoop = false;
    let x = startX;
    let y = startY;
    let dirIndex = 0;

    while (inside(x, y) && !isLoop) {
        // mark
        map[y][x] = map[y][x] | dirSymbol[dirIndex];

        if (debug) {
            displayMap(map);
            console.log(`-- x=${x} y=${y} dir=${dirIndex} --`);
        }

        // Move
        let x1 = x + dirx[dirIndex];
        let y1 = y + diry[dirIndex];

        if (inside(x1, y1)) {
            // obstacle
            if (map[y1][x1] & StatusCode.obstacle || map[y1][x1] & StatusCode.newObstacle) {
                // can't go there
                x1 = x;
                y1 = y;
                // turn
                dirIndex = (dirIndex + 1) % dirx.length;

                // loop détected !
            } else if (map[y1][x1] & dirSymbol[dirIndex]) {
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

function visitedPos(map: StatusCode[][]): number[][] {
    const visited: number[][] = [];
    // list visited positions
    for (let y = 0; y < ty; y++) {
        for (let x = 0; x < tx; x++) {
            if (map[y][x] & StatusCode.down || 
                map[y][x] & StatusCode.left ||
                map[y][x] & StatusCode.right ||
                map[y][x] & StatusCode.top) 
            {
                visited.push([x, y]);
            }
        }
    }
    return visited;
}

function copyMap(map: StatusCode[][]): StatusCode[][] {
    const result: StatusCode[][] = [];
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
//visited = [[8,2]];
for(let i=0; i<visited.length; i++) {
    const v = visited[i];

    const x = v[0];
    const y = v[1];
    const tempMap = copyMap(globalMap);
    tempMap[y][x] = StatusCode.newObstacle;
    //displayMap(tempMap);
    console.log(`${i+1}/${visited.length} Obstacle ${x},${y}`);
    const looped = testMap(tempMap, false);
    //console.log(`> Looped = ${looped}`);
    //displayMap(tempMap);
    console.log(" ");

    if (looped) {
        //displayMap(tempMap);
        console.log(`Loop for Obstacle ${x},${y}`);
        countLooped++;
    }
}

console.log(`Loop counts = ${countLooped}`);
