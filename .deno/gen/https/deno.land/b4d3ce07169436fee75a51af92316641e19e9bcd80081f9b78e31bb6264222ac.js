// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
/** Test whether the given string is a glob */ export function isGlob(str) {
    const chars = {
        "{": "}",
        "(": ")",
        "[": "]"
    };
    const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
    if (str === "") {
        return false;
    }
    let match;
    while(match = regex.exec(str)){
        if (match[2]) return true;
        let idx = match.index + match[0].length;
        // if an open bracket/brace/paren is escaped,
        // set the index to the next closing character
        const open = match[1];
        const close = open ? chars[open] : null;
        if (open && close) {
            const n = str.indexOf(close, idx);
            if (n !== -1) {
                idx = n + 1;
            }
        }
        str = str.slice(idx);
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvX2NvbW1vbi9pc19nbG9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbi8qKiBUZXN0IHdoZXRoZXIgdGhlIGdpdmVuIHN0cmluZyBpcyBhIGdsb2IgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0dsb2Ioc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgY2hhcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IFwie1wiOiBcIn1cIiwgXCIoXCI6IFwiKVwiLCBcIltcIjogXCJdXCIgfTtcbiAgY29uc3QgcmVnZXggPVxuICAgIC9cXFxcKC4pfCheIXxcXCp8XFw/fFtcXF0uKyldXFw/fFxcW1teXFxcXFxcXV0rXFxdfFxce1teXFxcXH1dK1xcfXxcXChcXD9bOiE9XVteXFxcXCldK1xcKXxcXChbXnxdK1xcfFteXFxcXCldK1xcKSkvO1xuXG4gIGlmIChzdHIgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGw7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHJlZ2V4LmV4ZWMoc3RyKSkpIHtcbiAgICBpZiAobWF0Y2hbMl0pIHJldHVybiB0cnVlO1xuICAgIGxldCBpZHggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgIC8vIGlmIGFuIG9wZW4gYnJhY2tldC9icmFjZS9wYXJlbiBpcyBlc2NhcGVkLFxuICAgIC8vIHNldCB0aGUgaW5kZXggdG8gdGhlIG5leHQgY2xvc2luZyBjaGFyYWN0ZXJcbiAgICBjb25zdCBvcGVuID0gbWF0Y2hbMV07XG4gICAgY29uc3QgY2xvc2UgPSBvcGVuID8gY2hhcnNbb3Blbl0gOiBudWxsO1xuICAgIGlmIChvcGVuICYmIGNsb3NlKSB7XG4gICAgICBjb25zdCBuID0gc3RyLmluZGV4T2YoY2xvc2UsIGlkeCk7XG4gICAgICBpZiAobiAhPT0gLTEpIHtcbiAgICAgICAgaWR4ID0gbiArIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RyID0gc3RyLnNsaWNlKGlkeCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHFDQUFxQztBQUVyQyw0Q0FBNEMsR0FDNUMsT0FBTyxTQUFTLE9BQU8sR0FBVyxFQUFXO0lBQzNDLE1BQU0sUUFBZ0M7UUFBRSxLQUFLO1FBQUssS0FBSztRQUFLLEtBQUs7SUFBSTtJQUNyRSxNQUFNLFFBQ0o7SUFFRixJQUFJLFFBQVEsSUFBSTtRQUNkLE9BQU8sS0FBSztJQUNkLENBQUM7SUFFRCxJQUFJO0lBRUosTUFBUSxRQUFRLE1BQU0sSUFBSSxDQUFDLEtBQU87UUFDaEMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSTtRQUN6QixJQUFJLE1BQU0sTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNO1FBRXZDLDZDQUE2QztRQUM3Qyw4Q0FBOEM7UUFDOUMsTUFBTSxPQUFPLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sUUFBUSxPQUFPLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTtRQUN2QyxJQUFJLFFBQVEsT0FBTztZQUNqQixNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTztZQUM3QixJQUFJLE1BQU0sQ0FBQyxHQUFHO2dCQUNaLE1BQU0sSUFBSTtZQUNaLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQztJQUNsQjtJQUVBLE9BQU8sS0FBSztBQUNkLENBQUMifQ==