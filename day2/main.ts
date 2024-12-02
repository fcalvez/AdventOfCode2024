import { extractNumbers } from "../utils.ts";
import { readLines } from "../utils.ts";

const lines = await readLines("day2\\input.txt");
console.log(`Found ${lines.length} lines`);

const levels: number[][] = [];
lines.forEach((line) => {
    const level = extractNumbers(line);
    levels.push(level);
});

function safeRemove(level:number[], index:number) : number[] {
    if(index === 0)
        return level.slice(1);
    if(index === level.length-1)
        return level.slice(0,-1);
    return [...level.slice(0,index),...level.slice(index+1)];
}

function isLevelValid(level: number[], allowError: boolean): boolean {
    const firstDelta = Math.abs(level[1] - level[0]);
    if (firstDelta > 3) {
        if (allowError) {
            return isLevelValid(safeRemove(level,0), false) 
                || isLevelValid(safeRemove(level,1), false);
        }
        return false;
    }

    const firstSign = Math.sign(level[1] - level[0]);
    if (firstSign === 0) {
        if (allowError) {
            return isLevelValid(safeRemove(level,0), false) 
                || isLevelValid(safeRemove(level,1), false);
        }
        return false;
    }

    for (let i = 2; i < level.length; i++) {
        const delta = Math.abs(level[i] - level[i - 1]);
        const sign = Math.sign(level[i] - level[i - 1]);
        // direction change ?
        if (sign !== firstSign || delta > 3) {
            if (allowError) {
                return isLevelValid(safeRemove(level,i-1), false) 
                || isLevelValid(safeRemove(level,i), false);
            }
            return false;
        }
    }
    return true;
}

let validLevelsCount = 0;
levels.forEach((level) => {
    if (isLevelValid(level, true)) {
        validLevelsCount++;
        console.log(`Level ${level} Safe`);
    } else {
        console.log(`Level ${level} Unsafe`);
    }
});

console.log(`Valid levels count = ${validLevelsCount}`);
