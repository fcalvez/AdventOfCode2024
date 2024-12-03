import { expect } from "jsr:@std/expect";
import { isLevelValid } from "./lib.ts";

Deno.test("Normal valid", () => {
    expect(isLevelValid([1,2,3,4,5,6],false)).toBe(true);
    expect(isLevelValid([1,2,4,5,6],false)).toBe(true);
    expect(isLevelValid([1,2,5,6],false)).toBe(true);
    expect(isLevelValid([6,5,4,3,2,1],false)).toBe(true);
    expect(isLevelValid([6,5,4,2,1],false)).toBe(true);
    expect(isLevelValid([6,5,2,1],false)).toBe(true);
    expect(isLevelValid([1,3,5,7,9],false)).toBe(true);
    expect(isLevelValid([1,4,7,10,13],false)).toBe(true);
    expect(isLevelValid([15,12,9,6],false)).toBe(true);
    expect(isLevelValid([1,4],false)).toBe(true);
    expect(isLevelValid([4,1],false)).toBe(true);
});

Deno.test("Normal invalid", () => {
    expect(isLevelValid([1,5,6],false)).toBe(false);
    expect(isLevelValid([1,4,5,6,10],false)).toBe(false);
    expect(isLevelValid([1,7,5,6],false)).toBe(false);
    expect(isLevelValid([6,6,5,4,3,2,1],false)).toBe(false);
    expect(isLevelValid([6,7,5,2,1],false)).toBe(false);
    expect(isLevelValid([6,5,2,1,1],false)).toBe(false);
    expect(isLevelValid([1,3,5,5,7,9],false)).toBe(false);
    expect(isLevelValid([1,4,7,7,10,13],false)).toBe(false);
    expect(isLevelValid([15,12,15,9,6,6],false)).toBe(false);
    expect(isLevelValid([1,1],false)).toBe(false);
    expect(isLevelValid([4,5,3],false)).toBe(false);
});

Deno.test("Valid if one removed", () => {
    expect(isLevelValid([10,1,2,3,4,5,6],true)).toBe(true);
    expect(isLevelValid([1,1,2,3,4,5,6],true)).toBe(true);
    expect(isLevelValid([1,10,2,3,4,5,6],true)).toBe(true);
    expect(isLevelValid([1,2,3,7,4,5,6],true)).toBe(true);
    expect(isLevelValid([1,2,3,4,5,6,6],true)).toBe(true);
    expect(isLevelValid([1,2,3,4,5,5,6],true)).toBe(true);
    expect(isLevelValid([10,1,2],true)).toBe(true);
    expect(isLevelValid([1,1,2],true)).toBe(true);
    expect(isLevelValid([1,2,2],true)).toBe(true);
    expect(isLevelValid([1,2,20],true)).toBe(true);
    expect(isLevelValid([1,10,9,8,7,6],true)).toBe(true);
});

Deno.test("Invalid", () => {
    expect(isLevelValid([10,1,1,2,3,4,5,6],true)).toBe(false);
    expect(isLevelValid([1,1,1,2,3,4,5,6],true)).toBe(false);
    expect(isLevelValid([1,2,3,7,7,4,5,6,6],true)).toBe(false);
    expect(isLevelValid([1,2,3,8,9,15,16],true)).toBe(false);
    expect(isLevelValid([10,20,30],true)).toBe(false);
    expect(isLevelValid([30,20,10],true)).toBe(false);
    expect(isLevelValid([1,1,1],true)).toBe(false);
    expect(isLevelValid([8,12,16],true)).toBe(false);
});

Deno.test("Specific", () => {
    expect(isLevelValid([38,35,35,33,31,29,32],true)).toBe(false);
});
