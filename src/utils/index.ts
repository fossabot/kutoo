export function getStringBewtween(str: string, start: string, end: string, shift?: number) {
    if(!shift){
        shift = 0
    }
    let data = str.slice(str.indexOf(start) + start.length, str.length - 1)
    return data.substring(0, data.indexOf(end) + shift);
}