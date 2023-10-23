// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
export function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvX2NvbW1vbi90b19maWxlX3VybC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIzIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5jb25zdCBXSElURVNQQUNFX0VOQ09ESU5HUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgXCJcXHUwMDA5XCI6IFwiJTA5XCIsXG4gIFwiXFx1MDAwQVwiOiBcIiUwQVwiLFxuICBcIlxcdTAwMEJcIjogXCIlMEJcIixcbiAgXCJcXHUwMDBDXCI6IFwiJTBDXCIsXG4gIFwiXFx1MDAwRFwiOiBcIiUwRFwiLFxuICBcIlxcdTAwMjBcIjogXCIlMjBcIixcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVXaGl0ZXNwYWNlKHN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlQWxsKC9bXFxzXS9nLCAoYykgPT4ge1xuICAgIHJldHVybiBXSElURVNQQUNFX0VOQ09ESU5HU1tjXSA/PyBjO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUscUNBQXFDO0FBRXJDLE1BQU0sdUJBQStDO0lBQ25ELFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtBQUNaO0FBRUEsT0FBTyxTQUFTLGlCQUFpQixNQUFjLEVBQVU7SUFDdkQsT0FBTyxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBTTtRQUN2QyxPQUFPLG9CQUFvQixDQUFDLEVBQUUsSUFBSTtJQUNwQztBQUNGLENBQUMifQ==