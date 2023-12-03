import fs from 'node:fs'
import path from 'node:path';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
const lines = data.split('\n').filter((line) => !!line);
let sum = 0;

enum DigitName {
    Zero = 'zero',
    One = 'one',
    Two = 'two',
    Three = 'three',
    Four = 'four',
    Five = 'five',
    Six = 'six',
    Seven = 'seven',
    Eight = 'eight',
    Nine = 'nine',
}

enum DigitChar {
    Zero = '0',
    One = '1',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
    Seven = '7',
    Eight = '8',
    Nine = '9',
}

const digitNames: DigitName[] = Object.values(DigitName);
const digitChars: DigitChar[] = Object.values(DigitChar);

function findFirstDigit(line: string, allowDigitNames = false): string {
    const digitIndexes: { [key in DigitChar]?: number } = {};
    for (let i = 0; i < 10; i++) {
        let digitCharIndex = line.indexOf(digitChars[i]);
        if (allowDigitNames) {
            const digitNameIndex = line.indexOf(digitNames[i]);
            if (digitNameIndex > -1 && (digitCharIndex === -1 || digitNameIndex < digitCharIndex)) {
                digitCharIndex = digitNameIndex;
            }
        }
        digitIndexes[digitChars[i]] = digitCharIndex;
    }
    const entries = Object.entries(digitIndexes).filter(([c,i]) => i >= 0);
    // console.log(line);
    // console.log(entries);
    let [firstDigit, _] = minBy(entries, '1')!;
    // console.log(firstDigit);
    return firstDigit;
}

function findLastDigit(line: string, allowDigitNames = false): string {
    const digitIndexes: { [key in DigitChar]?: number } = {};
    for (let i = 0; i < 10; i++) {
        let digitCharIndex = line.lastIndexOf(digitChars[i]);
        if (allowDigitNames) {
            const digitNameIndex = line.lastIndexOf(digitNames[i]);
            if (digitNameIndex > digitCharIndex) {
                digitCharIndex = digitNameIndex;
            }
        }
        digitIndexes[digitChars[i]] = digitCharIndex;
    }
    // console.log(line);
    // console.log(Object.entries(digitIndexes));
    let [lastDigit, maxIndex] = maxBy(Object.entries(digitIndexes), '1')!;
    // console.log(lastDigit);
    return lastDigit;
}


// Part 1: false
// Part 2: true
const allowDigitNames = false;

for (let line of lines) {
    let firstDigit: string = findFirstDigit(line, allowDigitNames);
    let lastDigit: string = findLastDigit(line, allowDigitNames);
    if (firstDigit && lastDigit) {
        const calibrationValue = Number.parseInt(`${firstDigit}${lastDigit}`);
        sum += calibrationValue;
    }
}

console.log(sum);
