// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { _globToRegExp } from "../_common/glob_to_reg_exp.ts";
import { normalize } from "./normalize.ts";
import { join } from "./join.ts";
import { SEP, SEP_PATTERN } from "./separator.ts";
export { isGlob } from "../_common/is_glob.ts";
const constants = {
    sep: "(?:\\\\|/)+",
    sepMaybe: "(?:\\\\|/)*",
    seps: [
        "\\",
        "/"
    ],
    globstar: "(?:[^\\\\/]*(?:\\\\|/|$)+)*",
    wildcard: "[^\\\\/]*",
    escapePrefix: "`"
};
/** Convert a glob string to a regular expression.
 *
 * Tries to match bash glob expansion as closely as possible.
 *
 * Basic glob syntax:
 * - `*` - Matches everything without leaving the path segment.
 * - `?` - Matches any single character.
 * - `{foo,bar}` - Matches `foo` or `bar`.
 * - `[abcd]` - Matches `a`, `b`, `c` or `d`.
 * - `[a-d]` - Matches `a`, `b`, `c` or `d`.
 * - `[!abcd]` - Matches any single character besides `a`, `b`, `c` or `d`.
 * - `[[:<class>:]]` - Matches any character belonging to `<class>`.
 *     - `[[:alnum:]]` - Matches any digit or letter.
 *     - `[[:digit:]abc]` - Matches any digit, `a`, `b` or `c`.
 *     - See https://facelessuser.github.io/wcmatch/glob/#posix-character-classes
 *       for a complete list of supported character classes.
 * - `\` - Escapes the next character for an `os` other than `"windows"`.
 * - \` - Escapes the next character for `os` set to `"windows"`.
 * - `/` - Path separator.
 * - `\` - Additional path separator only for `os` set to `"windows"`.
 *
 * Extended syntax:
 * - Requires `{ extended: true }`.
 * - `?(foo|bar)` - Matches 0 or 1 instance of `{foo,bar}`.
 * - `@(foo|bar)` - Matches 1 instance of `{foo,bar}`. They behave the same.
 * - `*(foo|bar)` - Matches _n_ instances of `{foo,bar}`.
 * - `+(foo|bar)` - Matches _n > 0_ instances of `{foo,bar}`.
 * - `!(foo|bar)` - Matches anything other than `{foo,bar}`.
 * - See https://www.linuxjournal.com/content/bash-extended-globbing.
 *
 * Globstar syntax:
 * - Requires `{ globstar: true }`.
 * - `**` - Matches any number of any path segments.
 *     - Must comprise its entire path segment in the provided glob.
 * - See https://www.linuxjournal.com/content/globstar-new-bash-globbing-option.
 *
 * Note the following properties:
 * - The generated `RegExp` is anchored at both start and end.
 * - Repeating and trailing separators are tolerated. Trailing separators in the
 *   provided glob have no meaning and are discarded.
 * - Absolute globs will only match absolute paths, etc.
 * - Empty globs will match nothing.
 * - Any special glob syntax must be contained to one path segment. For example,
 *   `?(foo|bar/baz)` is invalid. The separator will take precedence and the
 *   first segment ends with an unclosed group.
 * - If a path segment ends with unclosed groups or a dangling escape prefix, a
 *   parse error has occurred. Every character for that segment is taken
 *   literally in this event.
 *
 * Limitations:
 * - A negative group like `!(foo|bar)` will wrongly be converted to a negative
 *   look-ahead followed by a wildcard. This means that `!(foo).js` will wrongly
 *   fail to match `foobar.js`, even though `foobar` is not `foo`. Effectively,
 *   `!(foo|bar)` is treated like `!(@(foo|bar)*)`. This will work correctly if
 *   the group occurs not nested at the end of the segment. */ export function globToRegExp(glob, options = {}) {
    return _globToRegExp(constants, glob, options);
}
/** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */ export function normalizeGlob(glob, { globstar =false  } = {}) {
    if (glob.match(/\0/g)) {
        throw new Error(`Glob contains invalid characters: "${glob}"`);
    }
    if (!globstar) {
        return normalize(glob);
    }
    const s = SEP_PATTERN.source;
    const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
    return normalize(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
/** Like join(), but doesn't collapse "**\/.." when `globstar` is true. */ export function joinGlobs(globs, { extended =true , globstar =false  } = {}) {
    if (!globstar || globs.length === 0) {
        return join(...globs);
    }
    if (globs.length === 0) return ".";
    let joined;
    for (const glob of globs){
        const path = glob;
        if (path.length > 0) {
            if (!joined) joined = path;
            else joined += `${SEP}${path}`;
        }
    }
    if (!joined) return ".";
    return normalizeGlob(joined, {
        extended,
        globstar
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvd2luZG93cy9nbG9iLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7XG4gIF9nbG9iVG9SZWdFeHAsXG4gIEdsb2JDb25zdGFudHMsXG4gIEdsb2JPcHRpb25zLFxuICBHbG9iVG9SZWdFeHBPcHRpb25zLFxufSBmcm9tIFwiLi4vX2NvbW1vbi9nbG9iX3RvX3JlZ19leHAudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZSB9IGZyb20gXCIuL25vcm1hbGl6ZS50c1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCIuL2pvaW4udHNcIjtcbmltcG9ydCB7IFNFUCwgU0VQX1BBVFRFUk4gfSBmcm9tIFwiLi9zZXBhcmF0b3IudHNcIjtcbmV4cG9ydCB7IGlzR2xvYiB9IGZyb20gXCIuLi9fY29tbW9uL2lzX2dsb2IudHNcIjtcblxuY29uc3QgY29uc3RhbnRzOiBHbG9iQ29uc3RhbnRzID0ge1xuICBzZXA6IFwiKD86XFxcXFxcXFx8LykrXCIsXG4gIHNlcE1heWJlOiBcIig/OlxcXFxcXFxcfC8pKlwiLFxuICBzZXBzOiBbXCJcXFxcXCIsIFwiL1wiXSxcbiAgZ2xvYnN0YXI6IFwiKD86W15cXFxcXFxcXC9dKig/OlxcXFxcXFxcfC98JCkrKSpcIixcbiAgd2lsZGNhcmQ6IFwiW15cXFxcXFxcXC9dKlwiLFxuICBlc2NhcGVQcmVmaXg6IFwiYFwiLFxufTtcblxuLyoqIENvbnZlcnQgYSBnbG9iIHN0cmluZyB0byBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBUcmllcyB0byBtYXRjaCBiYXNoIGdsb2IgZXhwYW5zaW9uIGFzIGNsb3NlbHkgYXMgcG9zc2libGUuXG4gKlxuICogQmFzaWMgZ2xvYiBzeW50YXg6XG4gKiAtIGAqYCAtIE1hdGNoZXMgZXZlcnl0aGluZyB3aXRob3V0IGxlYXZpbmcgdGhlIHBhdGggc2VnbWVudC5cbiAqIC0gYD9gIC0gTWF0Y2hlcyBhbnkgc2luZ2xlIGNoYXJhY3Rlci5cbiAqIC0gYHtmb28sYmFyfWAgLSBNYXRjaGVzIGBmb29gIG9yIGBiYXJgLlxuICogLSBgW2FiY2RdYCAtIE1hdGNoZXMgYGFgLCBgYmAsIGBjYCBvciBgZGAuXG4gKiAtIGBbYS1kXWAgLSBNYXRjaGVzIGBhYCwgYGJgLCBgY2Agb3IgYGRgLlxuICogLSBgWyFhYmNkXWAgLSBNYXRjaGVzIGFueSBzaW5nbGUgY2hhcmFjdGVyIGJlc2lkZXMgYGFgLCBgYmAsIGBjYCBvciBgZGAuXG4gKiAtIGBbWzo8Y2xhc3M+Ol1dYCAtIE1hdGNoZXMgYW55IGNoYXJhY3RlciBiZWxvbmdpbmcgdG8gYDxjbGFzcz5gLlxuICogICAgIC0gYFtbOmFsbnVtOl1dYCAtIE1hdGNoZXMgYW55IGRpZ2l0IG9yIGxldHRlci5cbiAqICAgICAtIGBbWzpkaWdpdDpdYWJjXWAgLSBNYXRjaGVzIGFueSBkaWdpdCwgYGFgLCBgYmAgb3IgYGNgLlxuICogICAgIC0gU2VlIGh0dHBzOi8vZmFjZWxlc3N1c2VyLmdpdGh1Yi5pby93Y21hdGNoL2dsb2IvI3Bvc2l4LWNoYXJhY3Rlci1jbGFzc2VzXG4gKiAgICAgICBmb3IgYSBjb21wbGV0ZSBsaXN0IG9mIHN1cHBvcnRlZCBjaGFyYWN0ZXIgY2xhc3Nlcy5cbiAqIC0gYFxcYCAtIEVzY2FwZXMgdGhlIG5leHQgY2hhcmFjdGVyIGZvciBhbiBgb3NgIG90aGVyIHRoYW4gYFwid2luZG93c1wiYC5cbiAqIC0gXFxgIC0gRXNjYXBlcyB0aGUgbmV4dCBjaGFyYWN0ZXIgZm9yIGBvc2Agc2V0IHRvIGBcIndpbmRvd3NcImAuXG4gKiAtIGAvYCAtIFBhdGggc2VwYXJhdG9yLlxuICogLSBgXFxgIC0gQWRkaXRpb25hbCBwYXRoIHNlcGFyYXRvciBvbmx5IGZvciBgb3NgIHNldCB0byBgXCJ3aW5kb3dzXCJgLlxuICpcbiAqIEV4dGVuZGVkIHN5bnRheDpcbiAqIC0gUmVxdWlyZXMgYHsgZXh0ZW5kZWQ6IHRydWUgfWAuXG4gKiAtIGA/KGZvb3xiYXIpYCAtIE1hdGNoZXMgMCBvciAxIGluc3RhbmNlIG9mIGB7Zm9vLGJhcn1gLlxuICogLSBgQChmb298YmFyKWAgLSBNYXRjaGVzIDEgaW5zdGFuY2Ugb2YgYHtmb28sYmFyfWAuIFRoZXkgYmVoYXZlIHRoZSBzYW1lLlxuICogLSBgKihmb298YmFyKWAgLSBNYXRjaGVzIF9uXyBpbnN0YW5jZXMgb2YgYHtmb28sYmFyfWAuXG4gKiAtIGArKGZvb3xiYXIpYCAtIE1hdGNoZXMgX24gPiAwXyBpbnN0YW5jZXMgb2YgYHtmb28sYmFyfWAuXG4gKiAtIGAhKGZvb3xiYXIpYCAtIE1hdGNoZXMgYW55dGhpbmcgb3RoZXIgdGhhbiBge2ZvbyxiYXJ9YC5cbiAqIC0gU2VlIGh0dHBzOi8vd3d3LmxpbnV4am91cm5hbC5jb20vY29udGVudC9iYXNoLWV4dGVuZGVkLWdsb2JiaW5nLlxuICpcbiAqIEdsb2JzdGFyIHN5bnRheDpcbiAqIC0gUmVxdWlyZXMgYHsgZ2xvYnN0YXI6IHRydWUgfWAuXG4gKiAtIGAqKmAgLSBNYXRjaGVzIGFueSBudW1iZXIgb2YgYW55IHBhdGggc2VnbWVudHMuXG4gKiAgICAgLSBNdXN0IGNvbXByaXNlIGl0cyBlbnRpcmUgcGF0aCBzZWdtZW50IGluIHRoZSBwcm92aWRlZCBnbG9iLlxuICogLSBTZWUgaHR0cHM6Ly93d3cubGludXhqb3VybmFsLmNvbS9jb250ZW50L2dsb2JzdGFyLW5ldy1iYXNoLWdsb2JiaW5nLW9wdGlvbi5cbiAqXG4gKiBOb3RlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIC0gVGhlIGdlbmVyYXRlZCBgUmVnRXhwYCBpcyBhbmNob3JlZCBhdCBib3RoIHN0YXJ0IGFuZCBlbmQuXG4gKiAtIFJlcGVhdGluZyBhbmQgdHJhaWxpbmcgc2VwYXJhdG9ycyBhcmUgdG9sZXJhdGVkLiBUcmFpbGluZyBzZXBhcmF0b3JzIGluIHRoZVxuICogICBwcm92aWRlZCBnbG9iIGhhdmUgbm8gbWVhbmluZyBhbmQgYXJlIGRpc2NhcmRlZC5cbiAqIC0gQWJzb2x1dGUgZ2xvYnMgd2lsbCBvbmx5IG1hdGNoIGFic29sdXRlIHBhdGhzLCBldGMuXG4gKiAtIEVtcHR5IGdsb2JzIHdpbGwgbWF0Y2ggbm90aGluZy5cbiAqIC0gQW55IHNwZWNpYWwgZ2xvYiBzeW50YXggbXVzdCBiZSBjb250YWluZWQgdG8gb25lIHBhdGggc2VnbWVudC4gRm9yIGV4YW1wbGUsXG4gKiAgIGA/KGZvb3xiYXIvYmF6KWAgaXMgaW52YWxpZC4gVGhlIHNlcGFyYXRvciB3aWxsIHRha2UgcHJlY2VkZW5jZSBhbmQgdGhlXG4gKiAgIGZpcnN0IHNlZ21lbnQgZW5kcyB3aXRoIGFuIHVuY2xvc2VkIGdyb3VwLlxuICogLSBJZiBhIHBhdGggc2VnbWVudCBlbmRzIHdpdGggdW5jbG9zZWQgZ3JvdXBzIG9yIGEgZGFuZ2xpbmcgZXNjYXBlIHByZWZpeCwgYVxuICogICBwYXJzZSBlcnJvciBoYXMgb2NjdXJyZWQuIEV2ZXJ5IGNoYXJhY3RlciBmb3IgdGhhdCBzZWdtZW50IGlzIHRha2VuXG4gKiAgIGxpdGVyYWxseSBpbiB0aGlzIGV2ZW50LlxuICpcbiAqIExpbWl0YXRpb25zOlxuICogLSBBIG5lZ2F0aXZlIGdyb3VwIGxpa2UgYCEoZm9vfGJhcilgIHdpbGwgd3JvbmdseSBiZSBjb252ZXJ0ZWQgdG8gYSBuZWdhdGl2ZVxuICogICBsb29rLWFoZWFkIGZvbGxvd2VkIGJ5IGEgd2lsZGNhcmQuIFRoaXMgbWVhbnMgdGhhdCBgIShmb28pLmpzYCB3aWxsIHdyb25nbHlcbiAqICAgZmFpbCB0byBtYXRjaCBgZm9vYmFyLmpzYCwgZXZlbiB0aG91Z2ggYGZvb2JhcmAgaXMgbm90IGBmb29gLiBFZmZlY3RpdmVseSxcbiAqICAgYCEoZm9vfGJhcilgIGlzIHRyZWF0ZWQgbGlrZSBgIShAKGZvb3xiYXIpKilgLiBUaGlzIHdpbGwgd29yayBjb3JyZWN0bHkgaWZcbiAqICAgdGhlIGdyb3VwIG9jY3VycyBub3QgbmVzdGVkIGF0IHRoZSBlbmQgb2YgdGhlIHNlZ21lbnQuICovXG5leHBvcnQgZnVuY3Rpb24gZ2xvYlRvUmVnRXhwKFxuICBnbG9iOiBzdHJpbmcsXG4gIG9wdGlvbnM6IEdsb2JUb1JlZ0V4cE9wdGlvbnMgPSB7fSxcbik6IFJlZ0V4cCB7XG4gIHJldHVybiBfZ2xvYlRvUmVnRXhwKGNvbnN0YW50cywgZ2xvYiwgb3B0aW9ucyk7XG59XG5cbi8qKiBMaWtlIG5vcm1hbGl6ZSgpLCBidXQgZG9lc24ndCBjb2xsYXBzZSBcIioqXFwvLi5cIiB3aGVuIGBnbG9ic3RhcmAgaXMgdHJ1ZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVHbG9iKFxuICBnbG9iOiBzdHJpbmcsXG4gIHsgZ2xvYnN0YXIgPSBmYWxzZSB9OiBHbG9iT3B0aW9ucyA9IHt9LFxuKTogc3RyaW5nIHtcbiAgaWYgKGdsb2IubWF0Y2goL1xcMC9nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgR2xvYiBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnM6IFwiJHtnbG9ifVwiYCk7XG4gIH1cbiAgaWYgKCFnbG9ic3Rhcikge1xuICAgIHJldHVybiBub3JtYWxpemUoZ2xvYik7XG4gIH1cbiAgY29uc3QgcyA9IFNFUF9QQVRURVJOLnNvdXJjZTtcbiAgY29uc3QgYmFkUGFyZW50UGF0dGVybiA9IG5ldyBSZWdFeHAoXG4gICAgYCg/PD0oJHtzfXxeKVxcXFwqXFxcXCoke3N9KVxcXFwuXFxcXC4oPz0ke3N9fCQpYCxcbiAgICBcImdcIixcbiAgKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZShnbG9iLnJlcGxhY2UoYmFkUGFyZW50UGF0dGVybiwgXCJcXDBcIikpLnJlcGxhY2UoL1xcMC9nLCBcIi4uXCIpO1xufVxuXG4vKiogTGlrZSBqb2luKCksIGJ1dCBkb2Vzbid0IGNvbGxhcHNlIFwiKipcXC8uLlwiIHdoZW4gYGdsb2JzdGFyYCBpcyB0cnVlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpvaW5HbG9icyhcbiAgZ2xvYnM6IHN0cmluZ1tdLFxuICB7IGV4dGVuZGVkID0gdHJ1ZSwgZ2xvYnN0YXIgPSBmYWxzZSB9OiBHbG9iT3B0aW9ucyA9IHt9LFxuKTogc3RyaW5nIHtcbiAgaWYgKCFnbG9ic3RhciB8fCBnbG9icy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gam9pbiguLi5nbG9icyk7XG4gIH1cbiAgaWYgKGdsb2JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiLlwiO1xuICBsZXQgam9pbmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGZvciAoY29uc3QgZ2xvYiBvZiBnbG9icykge1xuICAgIGNvbnN0IHBhdGggPSBnbG9iO1xuICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICgham9pbmVkKSBqb2luZWQgPSBwYXRoO1xuICAgICAgZWxzZSBqb2luZWQgKz0gYCR7U0VQfSR7cGF0aH1gO1xuICAgIH1cbiAgfVxuICBpZiAoIWpvaW5lZCkgcmV0dXJuIFwiLlwiO1xuICByZXR1cm4gbm9ybWFsaXplR2xvYihqb2luZWQsIHsgZXh0ZW5kZWQsIGdsb2JzdGFyIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxxQ0FBcUM7QUFFckMsU0FDRSxhQUFhLFFBSVIsZ0NBQWdDO0FBQ3ZDLFNBQVMsU0FBUyxRQUFRLGlCQUFpQjtBQUMzQyxTQUFTLElBQUksUUFBUSxZQUFZO0FBQ2pDLFNBQVMsR0FBRyxFQUFFLFdBQVcsUUFBUSxpQkFBaUI7QUFDbEQsU0FBUyxNQUFNLFFBQVEsd0JBQXdCO0FBRS9DLE1BQU0sWUFBMkI7SUFDL0IsS0FBSztJQUNMLFVBQVU7SUFDVixNQUFNO1FBQUM7UUFBTTtLQUFJO0lBQ2pCLFVBQVU7SUFDVixVQUFVO0lBQ1YsY0FBYztBQUNoQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NERBc0Q0RCxHQUM1RCxPQUFPLFNBQVMsYUFDZCxJQUFZLEVBQ1osVUFBK0IsQ0FBQyxDQUFDLEVBQ3pCO0lBQ1IsT0FBTyxjQUFjLFdBQVcsTUFBTTtBQUN4QyxDQUFDO0FBRUQsNkVBQTZFLEdBQzdFLE9BQU8sU0FBUyxjQUNkLElBQVksRUFDWixFQUFFLFVBQVcsS0FBSyxDQUFBLEVBQWUsR0FBRyxDQUFDLENBQUMsRUFDOUI7SUFDUixJQUFJLEtBQUssS0FBSyxDQUFDLFFBQVE7UUFDckIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO0lBQ2pFLENBQUM7SUFDRCxJQUFJLENBQUMsVUFBVTtRQUNiLE9BQU8sVUFBVTtJQUNuQixDQUFDO0lBQ0QsTUFBTSxJQUFJLFlBQVksTUFBTTtJQUM1QixNQUFNLG1CQUFtQixJQUFJLE9BQzNCLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQ3pDO0lBRUYsT0FBTyxVQUFVLEtBQUssT0FBTyxDQUFDLGtCQUFrQixPQUFPLE9BQU8sQ0FBQyxPQUFPO0FBQ3hFLENBQUM7QUFFRCx3RUFBd0UsR0FDeEUsT0FBTyxTQUFTLFVBQ2QsS0FBZSxFQUNmLEVBQUUsVUFBVyxJQUFJLENBQUEsRUFBRSxVQUFXLEtBQUssQ0FBQSxFQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQy9DO0lBQ1IsSUFBSSxDQUFDLFlBQVksTUFBTSxNQUFNLEtBQUssR0FBRztRQUNuQyxPQUFPLFFBQVE7SUFDakIsQ0FBQztJQUNELElBQUksTUFBTSxNQUFNLEtBQUssR0FBRyxPQUFPO0lBQy9CLElBQUk7SUFDSixLQUFLLE1BQU0sUUFBUSxNQUFPO1FBQ3hCLE1BQU0sT0FBTztRQUNiLElBQUksS0FBSyxNQUFNLEdBQUcsR0FBRztZQUNuQixJQUFJLENBQUMsUUFBUSxTQUFTO2lCQUNqQixVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDO1FBQ2hDLENBQUM7SUFDSDtJQUNBLElBQUksQ0FBQyxRQUFRLE9BQU87SUFDcEIsT0FBTyxjQUFjLFFBQVE7UUFBRTtRQUFVO0lBQVM7QUFDcEQsQ0FBQyJ9