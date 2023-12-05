import fs from 'node:fs'
import path from 'node:path';
import range from 'lodash/range';

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
const lines = data.split('\n').filter((line) => !!line);
const rowCount = lines.length;
const colCount = lines[0].length;
let sum = 0;

function anySpecial(r: number, cMin: number, cMax: number): boolean {
    if (r < 0 || r >= rowCount) {
        return false;
    }
    const toCheck = range(Math.max(0, cMin), Math.min(colCount - 1, cMax) + 1);
    return toCheck.some((c) => /[^.\d]/.test(lines[r][c]));
}

function isPartNumber(num: string, rIndex: number, cIndex: number): boolean {
    const rBefore = rIndex - 1;
    const rAfter = rIndex + 1;
    const cBefore = cIndex - 1;
    const cAfter = cIndex + num.length;
    if (anySpecial(rIndex, cBefore, cBefore)) {
        return true;
    }
    if (anySpecial(rIndex, cAfter, cAfter)) {
        return true;
    }
    if (anySpecial(rBefore, cBefore, cAfter)) {
        return true;
    }
    if (anySpecial(rAfter, cBefore, cAfter)) {
        return true;
    }
    return false;
}

for (let r = 0; r < lines.length; r++) {
    const row = lines[r];
    let candidate = '';
    let cStart = -1;
    for (let c = 0; c < row.length; c++) {
        const col = row[c];
        if (/\d/.test(col)) {
            candidate += col;
            if (cStart < 0) {
                cStart = c;
            }
        }
        if (candidate && (c === row.length - 1 || !/\d/.test(lines[r][c+1]))) {
            if (isPartNumber(candidate, r, cStart)) {
                sum += Number.parseInt(candidate);
            }
            candidate = '';
            cStart = -1;
        }
    }
    candidate = ''
}

console.log(sum);
