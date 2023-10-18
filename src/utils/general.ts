export const sleep = (sec: number) => new Promise(resolve => setTimeout(resolve, sec * 1000))

export function parseToDoubleAndRound(str : string) {
    const number = parseFloat(str);
    if (isNaN(number)) {
        return null; // or throw an error if preferred
    }
    return Math.round(number * 10000) / 10000;
}