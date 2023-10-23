// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { assertArg } from "../_common/dirname.ts";
import { stripTrailingSeparators } from "../_common/strip_trailing_separators.ts";
import { isPosixPathSeparator } from "./_util.ts";
/**
 * Return the directory path of a `path`.
 * @param path - path to extract the directory from.
 */ export function dirname(path) {
    assertArg(path);
    let end = -1;
    let matchedNonSeparator = false;
    for(let i = path.length - 1; i >= 1; --i){
        if (isPosixPathSeparator(path.charCodeAt(i))) {
            if (matchedNonSeparator) {
                end = i;
                break;
            }
        } else {
            matchedNonSeparator = true;
        }
    }
    // No matches. Fallback based on provided path:
    //
    // - leading slashes paths
    //     "/foo" => "/"
    //     "///foo" => "/"
    // - no slash path
    //     "foo" => "."
    if (end === -1) {
        return isPosixPathSeparator(path.charCodeAt(0)) ? "/" : ".";
    }
    return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvcG9zaXgvZGlybmFtZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIzIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBhc3NlcnRBcmcgfSBmcm9tIFwiLi4vX2NvbW1vbi9kaXJuYW1lLnRzXCI7XG5pbXBvcnQgeyBzdHJpcFRyYWlsaW5nU2VwYXJhdG9ycyB9IGZyb20gXCIuLi9fY29tbW9uL3N0cmlwX3RyYWlsaW5nX3NlcGFyYXRvcnMudHNcIjtcbmltcG9ydCB7IGlzUG9zaXhQYXRoU2VwYXJhdG9yIH0gZnJvbSBcIi4vX3V0aWwudHNcIjtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGRpcmVjdG9yeSBwYXRoIG9mIGEgYHBhdGhgLlxuICogQHBhcmFtIHBhdGggLSBwYXRoIHRvIGV4dHJhY3QgdGhlIGRpcmVjdG9yeSBmcm9tLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlybmFtZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBhc3NlcnRBcmcocGF0aCk7XG5cbiAgbGV0IGVuZCA9IC0xO1xuICBsZXQgbWF0Y2hlZE5vblNlcGFyYXRvciA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMTsgLS1pKSB7XG4gICAgaWYgKGlzUG9zaXhQYXRoU2VwYXJhdG9yKHBhdGguY2hhckNvZGVBdChpKSkpIHtcbiAgICAgIGlmIChtYXRjaGVkTm9uU2VwYXJhdG9yKSB7XG4gICAgICAgIGVuZCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtYXRjaGVkTm9uU2VwYXJhdG9yID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBObyBtYXRjaGVzLiBGYWxsYmFjayBiYXNlZCBvbiBwcm92aWRlZCBwYXRoOlxuICAvL1xuICAvLyAtIGxlYWRpbmcgc2xhc2hlcyBwYXRoc1xuICAvLyAgICAgXCIvZm9vXCIgPT4gXCIvXCJcbiAgLy8gICAgIFwiLy8vZm9vXCIgPT4gXCIvXCJcbiAgLy8gLSBubyBzbGFzaCBwYXRoXG4gIC8vICAgICBcImZvb1wiID0+IFwiLlwiXG4gIGlmIChlbmQgPT09IC0xKSB7XG4gICAgcmV0dXJuIGlzUG9zaXhQYXRoU2VwYXJhdG9yKHBhdGguY2hhckNvZGVBdCgwKSkgPyBcIi9cIiA6IFwiLlwiO1xuICB9XG5cbiAgcmV0dXJuIHN0cmlwVHJhaWxpbmdTZXBhcmF0b3JzKFxuICAgIHBhdGguc2xpY2UoMCwgZW5kKSxcbiAgICBpc1Bvc2l4UGF0aFNlcGFyYXRvcixcbiAgKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUscUNBQXFDO0FBRXJDLFNBQVMsU0FBUyxRQUFRLHdCQUF3QjtBQUNsRCxTQUFTLHVCQUF1QixRQUFRLDBDQUEwQztBQUNsRixTQUFTLG9CQUFvQixRQUFRLGFBQWE7QUFFbEQ7OztDQUdDLEdBQ0QsT0FBTyxTQUFTLFFBQVEsSUFBWSxFQUFVO0lBQzVDLFVBQVU7SUFFVixJQUFJLE1BQU0sQ0FBQztJQUNYLElBQUksc0JBQXNCLEtBQUs7SUFFL0IsSUFBSyxJQUFJLElBQUksS0FBSyxNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsRUFBRSxFQUFHO1FBQ3pDLElBQUkscUJBQXFCLEtBQUssVUFBVSxDQUFDLEtBQUs7WUFDNUMsSUFBSSxxQkFBcUI7Z0JBQ3ZCLE1BQU07Z0JBQ04sS0FBTTtZQUNSLENBQUM7UUFDSCxPQUFPO1lBQ0wsc0JBQXNCLElBQUk7UUFDNUIsQ0FBQztJQUNIO0lBRUEsK0NBQStDO0lBQy9DLEVBQUU7SUFDRiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLElBQUksUUFBUSxDQUFDLEdBQUc7UUFDZCxPQUFPLHFCQUFxQixLQUFLLFVBQVUsQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUM3RCxDQUFDO0lBRUQsT0FBTyx3QkFDTCxLQUFLLEtBQUssQ0FBQyxHQUFHLE1BQ2Q7QUFFSixDQUFDIn0=