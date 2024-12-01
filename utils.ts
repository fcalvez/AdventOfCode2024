export async function readLines(filePath: string): Promise<string[]> {
  const text = await Deno.readTextFile(filePath);
  return text.split("\n").filter(l => l.length > 1);
}

export function extractNumbers(line: string): number[] {
  const numberRegEx = /(-?\d+)/g;
  let str;
  const result: number[] = [];
  while ((str = numberRegEx.exec(line)) !== null) {
    const num = Number(str[0]);
    result.push(num);
  }
  return result;
}
