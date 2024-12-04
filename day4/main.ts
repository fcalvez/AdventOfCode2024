import { readLines } from "../utils.ts";

const lines = await readLines("day4\\input.txt");
console.log(`Found ${lines.length} lines`);

const tx = lines[0].length;
const ty = lines.length;

const dirx = [1, 1, 1, 0, -1, -1, -1, 0];
const diry = [-1, 0, 1, 1, 1, 0, -1, -1];
function findXmas(x: number, y: number): number {
    let count = 0;
    for (let i = 0; i < 8; i++) {
        let xx = x;
        let yy=y;
        if (lines[yy][xx] === "X") {
            xx += dirx[i];
            yy += diry[i];
            if(xx >= 0 && yy >=0 && xx < tx && yy < ty && lines[yy][xx] === "M") {
                xx += dirx[i];
                yy += diry[i];
                if(xx >= 0 && yy >=0 && xx < tx && yy < ty && lines[yy][xx] === "A") {
                    xx += dirx[i];
                    yy += diry[i];
                    if(xx >= 0 && yy >=0 && xx < tx && yy < ty && lines[yy][xx] === "S") {
                        count++                        
                    }
                }
    
            }
        }
    }
    return count;
}

let total = 0;
// Find every X
for (let y = 0; y < ty; y++) {
    for (let x = 0; x < tx; x++) {
        // for each X
        if (lines[y][x] === "X") {
            // Search XM in every 9 directions
            const c = findXmas(x, y);
            console.log(`Find X at {${x},${y}} -> ${c}`);
            total += c;
        }
    }
}

console.log(`total XMAS = ${total}`);
