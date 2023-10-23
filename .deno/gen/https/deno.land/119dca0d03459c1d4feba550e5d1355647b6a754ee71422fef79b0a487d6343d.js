// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const regExpEscapeChars = [
    "!",
    "$",
    "(",
    ")",
    "*",
    "+",
    ".",
    "=",
    "?",
    "[",
    "\\",
    "^",
    "{",
    "|"
];
const rangeEscapeChars = [
    "-",
    "\\",
    "]"
];
export function _globToRegExp(c, glob, { extended =true , globstar: globstarOption = true , // os = osType,
caseInsensitive =false  } = {}) {
    if (glob === "") {
        return /(?!)/;
    }
    // Remove trailing separators.
    let newLength = glob.length;
    for(; newLength > 1 && c.seps.includes(glob[newLength - 1]); newLength--);
    glob = glob.slice(0, newLength);
    let regExpString = "";
    // Terminates correctly. Trust that `j` is incremented every iteration.
    for(let j = 0; j < glob.length;){
        let segment = "";
        const groupStack = [];
        let inRange = false;
        let inEscape = false;
        let endsWithSep = false;
        let i = j;
        // Terminates with `i` at the non-inclusive end of the current segment.
        for(; i < glob.length && !c.seps.includes(glob[i]); i++){
            if (inEscape) {
                inEscape = false;
                const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
                segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
                continue;
            }
            if (glob[i] === c.escapePrefix) {
                inEscape = true;
                continue;
            }
            if (glob[i] === "[") {
                if (!inRange) {
                    inRange = true;
                    segment += "[";
                    if (glob[i + 1] === "!") {
                        i++;
                        segment += "^";
                    } else if (glob[i + 1] === "^") {
                        i++;
                        segment += "\\^";
                    }
                    continue;
                } else if (glob[i + 1] === ":") {
                    let k = i + 1;
                    let value = "";
                    while(glob[k + 1] !== undefined && glob[k + 1] !== ":"){
                        value += glob[k + 1];
                        k++;
                    }
                    if (glob[k + 1] === ":" && glob[k + 2] === "]") {
                        i = k + 2;
                        if (value === "alnum") segment += "\\dA-Za-z";
                        else if (value === "alpha") segment += "A-Za-z";
                        else if (value === "ascii") segment += "\x00-\x7F";
                        else if (value === "blank") segment += "\t ";
                        else if (value === "cntrl") segment += "\x00-\x1F\x7F";
                        else if (value === "digit") segment += "\\d";
                        else if (value === "graph") segment += "\x21-\x7E";
                        else if (value === "lower") segment += "a-z";
                        else if (value === "print") segment += "\x20-\x7E";
                        else if (value === "punct") {
                            segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
                        } else if (value === "space") segment += "\\s\v";
                        else if (value === "upper") segment += "A-Z";
                        else if (value === "word") segment += "\\w";
                        else if (value === "xdigit") segment += "\\dA-Fa-f";
                        continue;
                    }
                }
            }
            if (glob[i] === "]" && inRange) {
                inRange = false;
                segment += "]";
                continue;
            }
            if (inRange) {
                if (glob[i] === "\\") {
                    segment += `\\\\`;
                } else {
                    segment += glob[i];
                }
                continue;
            }
            if (glob[i] === ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
                segment += ")";
                const type = groupStack.pop();
                if (type === "!") {
                    segment += c.wildcard;
                } else if (type !== "@") {
                    segment += type;
                }
                continue;
            }
            if (glob[i] === "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] !== "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i] === "+" && extended && glob[i + 1] === "(") {
                i++;
                groupStack.push("+");
                segment += "(?:";
                continue;
            }
            if (glob[i] === "@" && extended && glob[i + 1] === "(") {
                i++;
                groupStack.push("@");
                segment += "(?:";
                continue;
            }
            if (glob[i] === "?") {
                if (extended && glob[i + 1] === "(") {
                    i++;
                    groupStack.push("?");
                    segment += "(?:";
                } else {
                    segment += ".";
                }
                continue;
            }
            if (glob[i] === "!" && extended && glob[i + 1] === "(") {
                i++;
                groupStack.push("!");
                segment += "(?!";
                continue;
            }
            if (glob[i] === "{") {
                groupStack.push("BRACE");
                segment += "(?:";
                continue;
            }
            if (glob[i] === "}" && groupStack[groupStack.length - 1] === "BRACE") {
                groupStack.pop();
                segment += ")";
                continue;
            }
            if (glob[i] === "," && groupStack[groupStack.length - 1] === "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i] === "*") {
                if (extended && glob[i + 1] === "(") {
                    i++;
                    groupStack.push("*");
                    segment += "(?:";
                } else {
                    const prevChar = glob[i - 1];
                    let numStars = 1;
                    while(glob[i + 1] === "*"){
                        i++;
                        numStars++;
                    }
                    const nextChar = glob[i + 1];
                    if (globstarOption && numStars === 2 && [
                        ...c.seps,
                        undefined
                    ].includes(prevChar) && [
                        ...c.seps,
                        undefined
                    ].includes(nextChar)) {
                        segment += c.globstar;
                        endsWithSep = true;
                    } else {
                        segment += c.wildcard;
                    }
                }
                continue;
            }
            segment += regExpEscapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        }
        // Check for unclosed groups or a dangling backslash.
        if (groupStack.length > 0 || inRange || inEscape) {
            // Parse failure. Take all characters from this segment literally.
            segment = "";
            for (const c of glob.slice(j, i)){
                segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
                endsWithSep = false;
            }
        }
        regExpString += segment;
        if (!endsWithSep) {
            regExpString += i < glob.length ? c.sep : c.sepMaybe;
            endsWithSep = true;
        }
        // Terminates with `i` at the start of the next segment.
        while(c.seps.includes(glob[i]))i++;
        // Check that the next value of `j` is indeed higher than the current value.
        if (!(i > j)) {
            throw new Error("Assertion failure: i > j (potential infinite loop)");
        }
        j = i;
    }
    regExpString = `^${regExpString}$`;
    return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvX2NvbW1vbi9nbG9iX3RvX3JlZ19leHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuZXhwb3J0IGludGVyZmFjZSBHbG9iT3B0aW9ucyB7XG4gIC8qKiBFeHRlbmRlZCBnbG9iIHN5bnRheC5cbiAgICogU2VlIGh0dHBzOi8vd3d3LmxpbnV4am91cm5hbC5jb20vY29udGVudC9iYXNoLWV4dGVuZGVkLWdsb2JiaW5nLlxuICAgKlxuICAgKiBAZGVmYXVsdCB7dHJ1ZX1cbiAgICovXG4gIGV4dGVuZGVkPzogYm9vbGVhbjtcbiAgLyoqIEdsb2JzdGFyIHN5bnRheC5cbiAgICogU2VlIGh0dHBzOi8vd3d3LmxpbnV4am91cm5hbC5jb20vY29udGVudC9nbG9ic3Rhci1uZXctYmFzaC1nbG9iYmluZy1vcHRpb24uXG4gICAqIElmIGZhbHNlLCBgKipgIGlzIHRyZWF0ZWQgbGlrZSBgKmAuXG4gICAqXG4gICAqIEBkZWZhdWx0IHt0cnVlfVxuICAgKi9cbiAgZ2xvYnN0YXI/OiBib29sZWFuO1xuICAvKiogV2hldGhlciBnbG9ic3RhciBzaG91bGQgYmUgY2FzZS1pbnNlbnNpdGl2ZS4gKi9cbiAgY2FzZUluc2Vuc2l0aXZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgR2xvYlRvUmVnRXhwT3B0aW9ucyA9IEdsb2JPcHRpb25zO1xuXG5jb25zdCByZWdFeHBFc2NhcGVDaGFycyA9IFtcbiAgXCIhXCIsXG4gIFwiJFwiLFxuICBcIihcIixcbiAgXCIpXCIsXG4gIFwiKlwiLFxuICBcIitcIixcbiAgXCIuXCIsXG4gIFwiPVwiLFxuICBcIj9cIixcbiAgXCJbXCIsXG4gIFwiXFxcXFwiLFxuICBcIl5cIixcbiAgXCJ7XCIsXG4gIFwifFwiLFxuXTtcbmNvbnN0IHJhbmdlRXNjYXBlQ2hhcnMgPSBbXCItXCIsIFwiXFxcXFwiLCBcIl1cIl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2xvYkNvbnN0YW50cyB7XG4gIHNlcDogc3RyaW5nO1xuICBzZXBNYXliZTogc3RyaW5nO1xuICBzZXBzOiBzdHJpbmdbXTtcbiAgZ2xvYnN0YXI6IHN0cmluZztcbiAgd2lsZGNhcmQ6IHN0cmluZztcbiAgZXNjYXBlUHJlZml4OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2xvYlRvUmVnRXhwKFxuICBjOiBHbG9iQ29uc3RhbnRzLFxuICBnbG9iOiBzdHJpbmcsXG4gIHtcbiAgICBleHRlbmRlZCA9IHRydWUsXG4gICAgZ2xvYnN0YXI6IGdsb2JzdGFyT3B0aW9uID0gdHJ1ZSxcbiAgICAvLyBvcyA9IG9zVHlwZSxcbiAgICBjYXNlSW5zZW5zaXRpdmUgPSBmYWxzZSxcbiAgfTogR2xvYlRvUmVnRXhwT3B0aW9ucyA9IHt9LFxuKTogUmVnRXhwIHtcbiAgaWYgKGdsb2IgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gLyg/ISkvO1xuICB9XG5cbiAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNlcGFyYXRvcnMuXG4gIGxldCBuZXdMZW5ndGggPSBnbG9iLmxlbmd0aDtcbiAgZm9yICg7IG5ld0xlbmd0aCA+IDEgJiYgYy5zZXBzLmluY2x1ZGVzKGdsb2JbbmV3TGVuZ3RoIC0gMV0pOyBuZXdMZW5ndGgtLSk7XG4gIGdsb2IgPSBnbG9iLnNsaWNlKDAsIG5ld0xlbmd0aCk7XG5cbiAgbGV0IHJlZ0V4cFN0cmluZyA9IFwiXCI7XG5cbiAgLy8gVGVybWluYXRlcyBjb3JyZWN0bHkuIFRydXN0IHRoYXQgYGpgIGlzIGluY3JlbWVudGVkIGV2ZXJ5IGl0ZXJhdGlvbi5cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBnbG9iLmxlbmd0aDspIHtcbiAgICBsZXQgc2VnbWVudCA9IFwiXCI7XG4gICAgY29uc3QgZ3JvdXBTdGFjazogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgaW5SYW5nZSA9IGZhbHNlO1xuICAgIGxldCBpbkVzY2FwZSA9IGZhbHNlO1xuICAgIGxldCBlbmRzV2l0aFNlcCA9IGZhbHNlO1xuICAgIGxldCBpID0gajtcblxuICAgIC8vIFRlcm1pbmF0ZXMgd2l0aCBgaWAgYXQgdGhlIG5vbi1pbmNsdXNpdmUgZW5kIG9mIHRoZSBjdXJyZW50IHNlZ21lbnQuXG4gICAgZm9yICg7IGkgPCBnbG9iLmxlbmd0aCAmJiAhYy5zZXBzLmluY2x1ZGVzKGdsb2JbaV0pOyBpKyspIHtcbiAgICAgIGlmIChpbkVzY2FwZSkge1xuICAgICAgICBpbkVzY2FwZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBlc2NhcGVDaGFycyA9IGluUmFuZ2UgPyByYW5nZUVzY2FwZUNoYXJzIDogcmVnRXhwRXNjYXBlQ2hhcnM7XG4gICAgICAgIHNlZ21lbnQgKz0gZXNjYXBlQ2hhcnMuaW5jbHVkZXMoZ2xvYltpXSkgPyBgXFxcXCR7Z2xvYltpXX1gIDogZ2xvYltpXTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChnbG9iW2ldID09PSBjLmVzY2FwZVByZWZpeCkge1xuICAgICAgICBpbkVzY2FwZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2xvYltpXSA9PT0gXCJbXCIpIHtcbiAgICAgICAgaWYgKCFpblJhbmdlKSB7XG4gICAgICAgICAgaW5SYW5nZSA9IHRydWU7XG4gICAgICAgICAgc2VnbWVudCArPSBcIltcIjtcbiAgICAgICAgICBpZiAoZ2xvYltpICsgMV0gPT09IFwiIVwiKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBzZWdtZW50ICs9IFwiXlwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZ2xvYltpICsgMV0gPT09IFwiXlwiKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBzZWdtZW50ICs9IFwiXFxcXF5cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2xvYltpICsgMV0gPT09IFwiOlwiKSB7XG4gICAgICAgICAgbGV0IGsgPSBpICsgMTtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHdoaWxlIChnbG9iW2sgKyAxXSAhPT0gdW5kZWZpbmVkICYmIGdsb2JbayArIDFdICE9PSBcIjpcIikge1xuICAgICAgICAgICAgdmFsdWUgKz0gZ2xvYltrICsgMV07XG4gICAgICAgICAgICBrKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChnbG9iW2sgKyAxXSA9PT0gXCI6XCIgJiYgZ2xvYltrICsgMl0gPT09IFwiXVwiKSB7XG4gICAgICAgICAgICBpID0gayArIDI7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiYWxudW1cIikgc2VnbWVudCArPSBcIlxcXFxkQS1aYS16XCI7XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJhbHBoYVwiKSBzZWdtZW50ICs9IFwiQS1aYS16XCI7XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJhc2NpaVwiKSBzZWdtZW50ICs9IFwiXFx4MDAtXFx4N0ZcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcImJsYW5rXCIpIHNlZ21lbnQgKz0gXCJcXHQgXCI7XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJjbnRybFwiKSBzZWdtZW50ICs9IFwiXFx4MDAtXFx4MUZcXHg3RlwiO1xuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwiZGlnaXRcIikgc2VnbWVudCArPSBcIlxcXFxkXCI7XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJncmFwaFwiKSBzZWdtZW50ICs9IFwiXFx4MjEtXFx4N0VcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcImxvd2VyXCIpIHNlZ21lbnQgKz0gXCJhLXpcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcInByaW50XCIpIHNlZ21lbnQgKz0gXCJcXHgyMC1cXHg3RVwiO1xuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwicHVuY3RcIikge1xuICAgICAgICAgICAgICBzZWdtZW50ICs9IFwiIVxcXCIjJCUmJygpKissXFxcXC0uLzo7PD0+P0BbXFxcXFxcXFxcXFxcXV5f4oCYe3x9flwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJzcGFjZVwiKSBzZWdtZW50ICs9IFwiXFxcXHNcXHZcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcInVwcGVyXCIpIHNlZ21lbnQgKz0gXCJBLVpcIjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBcIndvcmRcIikgc2VnbWVudCArPSBcIlxcXFx3XCI7XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ4ZGlnaXRcIikgc2VnbWVudCArPSBcIlxcXFxkQS1GYS1mXCI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGdsb2JbaV0gPT09IFwiXVwiICYmIGluUmFuZ2UpIHtcbiAgICAgICAgaW5SYW5nZSA9IGZhbHNlO1xuICAgICAgICBzZWdtZW50ICs9IFwiXVwiO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluUmFuZ2UpIHtcbiAgICAgICAgaWYgKGdsb2JbaV0gPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgc2VnbWVudCArPSBgXFxcXFxcXFxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZ21lbnQgKz0gZ2xvYltpXTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBnbG9iW2ldID09PSBcIilcIiAmJiBncm91cFN0YWNrLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgZ3JvdXBTdGFja1tncm91cFN0YWNrLmxlbmd0aCAtIDFdICE9PSBcIkJSQUNFXCJcbiAgICAgICkge1xuICAgICAgICBzZWdtZW50ICs9IFwiKVwiO1xuICAgICAgICBjb25zdCB0eXBlID0gZ3JvdXBTdGFjay5wb3AoKSE7XG4gICAgICAgIGlmICh0eXBlID09PSBcIiFcIikge1xuICAgICAgICAgIHNlZ21lbnQgKz0gYy53aWxkY2FyZDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSBcIkBcIikge1xuICAgICAgICAgIHNlZ21lbnQgKz0gdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBnbG9iW2ldID09PSBcInxcIiAmJiBncm91cFN0YWNrLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgZ3JvdXBTdGFja1tncm91cFN0YWNrLmxlbmd0aCAtIDFdICE9PSBcIkJSQUNFXCJcbiAgICAgICkge1xuICAgICAgICBzZWdtZW50ICs9IFwifFwiO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdsb2JbaV0gPT09IFwiK1wiICYmIGV4dGVuZGVkICYmIGdsb2JbaSArIDFdID09PSBcIihcIikge1xuICAgICAgICBpKys7XG4gICAgICAgIGdyb3VwU3RhY2sucHVzaChcIitcIik7XG4gICAgICAgIHNlZ21lbnQgKz0gXCIoPzpcIjtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChnbG9iW2ldID09PSBcIkBcIiAmJiBleHRlbmRlZCAmJiBnbG9iW2kgKyAxXSA9PT0gXCIoXCIpIHtcbiAgICAgICAgaSsrO1xuICAgICAgICBncm91cFN0YWNrLnB1c2goXCJAXCIpO1xuICAgICAgICBzZWdtZW50ICs9IFwiKD86XCI7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2xvYltpXSA9PT0gXCI/XCIpIHtcbiAgICAgICAgaWYgKGV4dGVuZGVkICYmIGdsb2JbaSArIDFdID09PSBcIihcIikge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgICBncm91cFN0YWNrLnB1c2goXCI/XCIpO1xuICAgICAgICAgIHNlZ21lbnQgKz0gXCIoPzpcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWdtZW50ICs9IFwiLlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2xvYltpXSA9PT0gXCIhXCIgJiYgZXh0ZW5kZWQgJiYgZ2xvYltpICsgMV0gPT09IFwiKFwiKSB7XG4gICAgICAgIGkrKztcbiAgICAgICAgZ3JvdXBTdGFjay5wdXNoKFwiIVwiKTtcbiAgICAgICAgc2VnbWVudCArPSBcIig/IVwiO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdsb2JbaV0gPT09IFwie1wiKSB7XG4gICAgICAgIGdyb3VwU3RhY2sucHVzaChcIkJSQUNFXCIpO1xuICAgICAgICBzZWdtZW50ICs9IFwiKD86XCI7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ2xvYltpXSA9PT0gXCJ9XCIgJiYgZ3JvdXBTdGFja1tncm91cFN0YWNrLmxlbmd0aCAtIDFdID09PSBcIkJSQUNFXCIpIHtcbiAgICAgICAgZ3JvdXBTdGFjay5wb3AoKTtcbiAgICAgICAgc2VnbWVudCArPSBcIilcIjtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChnbG9iW2ldID09PSBcIixcIiAmJiBncm91cFN0YWNrW2dyb3VwU3RhY2subGVuZ3RoIC0gMV0gPT09IFwiQlJBQ0VcIikge1xuICAgICAgICBzZWdtZW50ICs9IFwifFwiO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdsb2JbaV0gPT09IFwiKlwiKSB7XG4gICAgICAgIGlmIChleHRlbmRlZCAmJiBnbG9iW2kgKyAxXSA9PT0gXCIoXCIpIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgZ3JvdXBTdGFjay5wdXNoKFwiKlwiKTtcbiAgICAgICAgICBzZWdtZW50ICs9IFwiKD86XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcHJldkNoYXIgPSBnbG9iW2kgLSAxXTtcbiAgICAgICAgICBsZXQgbnVtU3RhcnMgPSAxO1xuICAgICAgICAgIHdoaWxlIChnbG9iW2kgKyAxXSA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIG51bVN0YXJzKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG5leHRDaGFyID0gZ2xvYltpICsgMV07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZ2xvYnN0YXJPcHRpb24gJiYgbnVtU3RhcnMgPT09IDIgJiZcbiAgICAgICAgICAgIFsuLi5jLnNlcHMsIHVuZGVmaW5lZF0uaW5jbHVkZXMocHJldkNoYXIpICYmXG4gICAgICAgICAgICBbLi4uYy5zZXBzLCB1bmRlZmluZWRdLmluY2x1ZGVzKG5leHRDaGFyKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgc2VnbWVudCArPSBjLmdsb2JzdGFyO1xuICAgICAgICAgICAgZW5kc1dpdGhTZXAgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWdtZW50ICs9IGMud2lsZGNhcmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBzZWdtZW50ICs9IHJlZ0V4cEVzY2FwZUNoYXJzLmluY2x1ZGVzKGdsb2JbaV0pID8gYFxcXFwke2dsb2JbaV19YCA6IGdsb2JbaV07XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHVuY2xvc2VkIGdyb3VwcyBvciBhIGRhbmdsaW5nIGJhY2tzbGFzaC5cbiAgICBpZiAoZ3JvdXBTdGFjay5sZW5ndGggPiAwIHx8IGluUmFuZ2UgfHwgaW5Fc2NhcGUpIHtcbiAgICAgIC8vIFBhcnNlIGZhaWx1cmUuIFRha2UgYWxsIGNoYXJhY3RlcnMgZnJvbSB0aGlzIHNlZ21lbnQgbGl0ZXJhbGx5LlxuICAgICAgc2VnbWVudCA9IFwiXCI7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgZ2xvYi5zbGljZShqLCBpKSkge1xuICAgICAgICBzZWdtZW50ICs9IHJlZ0V4cEVzY2FwZUNoYXJzLmluY2x1ZGVzKGMpID8gYFxcXFwke2N9YCA6IGM7XG4gICAgICAgIGVuZHNXaXRoU2VwID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVnRXhwU3RyaW5nICs9IHNlZ21lbnQ7XG4gICAgaWYgKCFlbmRzV2l0aFNlcCkge1xuICAgICAgcmVnRXhwU3RyaW5nICs9IGkgPCBnbG9iLmxlbmd0aCA/IGMuc2VwIDogYy5zZXBNYXliZTtcbiAgICAgIGVuZHNXaXRoU2VwID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBUZXJtaW5hdGVzIHdpdGggYGlgIGF0IHRoZSBzdGFydCBvZiB0aGUgbmV4dCBzZWdtZW50LlxuICAgIHdoaWxlIChjLnNlcHMuaW5jbHVkZXMoZ2xvYltpXSkpIGkrKztcblxuICAgIC8vIENoZWNrIHRoYXQgdGhlIG5leHQgdmFsdWUgb2YgYGpgIGlzIGluZGVlZCBoaWdoZXIgdGhhbiB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICBpZiAoIShpID4gaikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkFzc2VydGlvbiBmYWlsdXJlOiBpID4gaiAocG90ZW50aWFsIGluZmluaXRlIGxvb3ApXCIpO1xuICAgIH1cbiAgICBqID0gaTtcbiAgfVxuXG4gIHJlZ0V4cFN0cmluZyA9IGBeJHtyZWdFeHBTdHJpbmd9JGA7XG4gIHJldHVybiBuZXcgUmVnRXhwKHJlZ0V4cFN0cmluZywgY2FzZUluc2Vuc2l0aXZlID8gXCJpXCIgOiBcIlwiKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUscUNBQXFDO0FBc0JyQyxNQUFNLG9CQUFvQjtJ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