import fs from 'node:fs'
import path from 'node:path';

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
const lines = data.split('\n').filter((line) => !!line);
const linePattern = /^Game (\d+): (.+)$/;
const colorPattern = /^(\d+) (red|blue|green)$/;
const colorLimits: { [color:string]: number } = {
    'red': 12,
    'blue': 14,
    'green': 13,
};
let sum = 0;

function mult(...values: number[]): number {
    if (values.length === 0) {
        return NaN;
    } else if (values.length === 1) {
        return values[0];
    }
    return values[0] * mult(...values.slice(1));
}

// Part 1:
// games: for (let line of lines) {
//     const match = linePattern.exec(line);
//     const id = Number.parseInt(match?.[1] ?? '');
//     const data = match?.[2];
//     if (!match || !id || !data) {
//         continue;
//     }
//     let gamePossible = true;
//     const rounds = data.split(/;\s*/);
//     for (const roundEntry of rounds) {
//         const countByColor: { [color: string]: number } = {};
//         const colors = roundEntry.split(/,\s*/);
//         for (const colorEntry of colors) {
//             const colorMatch = colorPattern.exec(colorEntry);
//             if (colorMatch) {
//                 const colorName = colorMatch[2] ?? '';
//                 const colorCount = Number.parseInt(colorMatch[1]) ?? 0;
//                 countByColor[colorName] = colorCount;
//             }
//         }
//         for (const [color, count] of Object.entries(countByColor)) {
//             if (count > colorLimits[color]) {
//                 continue games;
//             }
//         }
//     }
//     sum += id;
// }

// Part 2:
for (let line of lines) {
    const match = linePattern.exec(line);
    const data = match?.[2];
    if (!match || !data) {
        continue;
    }
    const maxCountByColor: { [color: string]: number } = {};
    const rounds = data.split(/;\s*/);
    for (const roundEntry of rounds) {
        const colors = roundEntry.split(/,\s*/);
        for (const colorEntry of colors) {
            const colorMatch = colorPattern.exec(colorEntry);
            if (colorMatch) {
                const color = colorMatch[2] ?? '';
                const count = Number.parseInt(colorMatch[1]) ?? 0;
                if (!maxCountByColor[color] || count > maxCountByColor[color]) {
                    maxCountByColor[color] = count;
                }
            }
        }
    }
    const power = mult(...Object.values(maxCountByColor));
    // console.log(line, power);
    sum += power;
}

console.log(sum);
