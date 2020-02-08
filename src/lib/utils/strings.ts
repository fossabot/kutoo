import { URL, parse } from 'url';


export function getStringBewtween(str: string, start: string, end: string, shift?: number) {
    if (!shift) {
        shift = 0
    }
    let data = str.slice(str.indexOf(start) + start.length, str.length - 1)
    return data.substring(0, data.indexOf(end) + shift);
}

export function isUrl(s: string, protocols = ['http', 'https']) {
    try {
        new URL(s);
        const parsed = parse(s);
        return protocols
            ? parsed.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(parsed.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
};

export function replaceInvalidChars(str: string, v?: string) {
    if (!v) {
        v = ''
    }
    return str.replace(/[\~\#\%\&\*\{\}\\\:\<\>\?\/\+\|]/g, v);
}

export function nthIndex(str: string, pat: string, n: number) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
    }
    return i;
}