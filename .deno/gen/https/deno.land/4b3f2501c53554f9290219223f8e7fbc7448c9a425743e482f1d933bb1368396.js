// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
export function _common(paths, sep) {
    const [first = "", ...remaining] = paths;
    if (first === "" || remaining.length === 0) {
        return first.substring(0, first.lastIndexOf(sep) + 1);
    }
    const parts = first.split(sep);
    let endOfPrefix = parts.length;
    for (const path of remaining){
        const compare = path.split(sep);
        for(let i = 0; i < endOfPrefix; i++){
            if (compare[i] !== parts[i]) {
                endOfPrefix = i;
            }
        }
        if (endOfPrefix === 0) {
            return "";
        }
    }
    const prefix = parts.slice(0, endOfPrefix).join(sep);
    return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvX2NvbW1vbi9jb21tb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb21tb24ocGF0aHM6IHN0cmluZ1tdLCBzZXA6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IFtmaXJzdCA9IFwiXCIsIC4uLnJlbWFpbmluZ10gPSBwYXRocztcbiAgaWYgKGZpcnN0ID09PSBcIlwiIHx8IHJlbWFpbmluZy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmlyc3Quc3Vic3RyaW5nKDAsIGZpcnN0Lmxhc3RJbmRleE9mKHNlcCkgKyAxKTtcbiAgfVxuICBjb25zdCBwYXJ0cyA9IGZpcnN0LnNwbGl0KHNlcCk7XG5cbiAgbGV0IGVuZE9mUHJlZml4ID0gcGFydHMubGVuZ3RoO1xuICBmb3IgKGNvbnN0IHBhdGggb2YgcmVtYWluaW5nKSB7XG4gICAgY29uc3QgY29tcGFyZSA9IHBhdGguc3BsaXQoc2VwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuZE9mUHJlZml4OyBpKyspIHtcbiAgICAgIGlmIChjb21wYXJlW2ldICE9PSBwYXJ0c1tpXSkge1xuICAgICAgICBlbmRPZlByZWZpeCA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVuZE9mUHJlZml4ID09PSAwKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gIH1cbiAgY29uc3QgcHJlZml4ID0gcGFydHMuc2xpY2UoMCwgZW5kT2ZQcmVmaXgpLmpvaW4oc2VwKTtcbiAgcmV0dXJuIHByZWZpeC5lbmRzV2l0aChzZXApID8gcHJlZml4IDogYCR7cHJlZml4fSR7c2VwfWA7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHFDQUFxQztBQUVyQyxPQUFPLFNBQVMsUUFBUSxLQUFlLEVBQUUsR0FBVyxFQUFVO0lBQzVELE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLFVBQVUsR0FBRztJQUNuQyxJQUFJLFVBQVUsTUFBTSxVQUFVLE1BQU0sS0FBSyxHQUFHO1FBQzFDLE9BQU8sTUFBTSxTQUFTLENBQUMsR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPO0lBQ3JELENBQUM7SUFDRCxNQUFNLFFBQVEsTUFBTSxLQUFLLENBQUM7SUFFMUIsSUFBSSxjQUFjLE1BQU0sTUFBTTtJQUM5QixLQUFLLE1BQU0sUUFBUSxVQUFXO1FBQzVCLE1BQU0sVUFBVSxLQUFLLEtBQUssQ0FBQztRQUMzQixJQUFLLElBQUksSUFBSSxHQUFHLElBQUksYUFBYSxJQUFLO1lBQ3BDLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFO2dCQUMzQixjQUFjO1lBQ2hCLENBQUM7UUFDSDtRQUVBLElBQUksZ0JBQWdCLEdBQUc7WUFDckIsT0FBTztRQUNULENBQUM7SUFDSDtJQUNBLE1BQU0sU0FBUyxNQUFNLEtBQUssQ0FBQyxHQUFHLGFBQWEsSUFBSSxDQUFDO0lBQ2hELE9BQU8sT0FBTyxRQUFRLENBQUMsT0FBTyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO0FBQzFELENBQUMifQ==