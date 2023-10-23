// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { isPosixPathSeparator } from "./_util.ts";
import { resolve } from "./resolve.ts";
import { assertArgs } from "../_common/relative.ts";
/**
 * Return the relative path from `from` to `to` based on current working directory.
 *
 * @param from path in current working directory
 * @param to path in current working directory
 */ export function relative(from, to) {
    assertArgs(from, to);
    from = resolve(from);
    to = resolve(to);
    if (from === to) return "";
    // Trim any leading backslashes
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (!isPosixPathSeparator(from.charCodeAt(fromStart))) break;
    }
    const fromLen = fromEnd - fromStart;
    // Trim any leading backslashes
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (!isPosixPathSeparator(to.charCodeAt(toStart))) break;
    }
    const toLen = toEnd - toStart;
    // Compare paths to find the longest common path from root
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for(; i <= length; ++i){
        if (i === length) {
            if (toLen > length) {
                if (isPosixPathSeparator(to.charCodeAt(toStart + i))) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='/foo/bar'; to='/foo/bar/baz'
                    return to.slice(toStart + i + 1);
                } else if (i === 0) {
                    // We get here if `from` is the root
                    // For example: from='/'; to='/foo'
                    return to.slice(toStart + i);
                }
            } else if (fromLen > length) {
                if (isPosixPathSeparator(from.charCodeAt(fromStart + i))) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='/foo/bar/baz'; to='/foo/bar'
                    lastCommonSep = i;
                } else if (i === 0) {
                    // We get here if `to` is the root.
                    // For example: from='/foo'; to='/'
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (isPosixPathSeparator(fromCode)) lastCommonSep = i;
    }
    let out = "";
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i){
        if (i === fromEnd || isPosixPathSeparator(from.charCodeAt(i))) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (isPosixPathSeparator(to.charCodeAt(toStart))) ++toStart;
        return to.slice(toStart);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvcG9zaXgvcmVsYXRpdmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNQb3NpeFBhdGhTZXBhcmF0b3IgfSBmcm9tIFwiLi9fdXRpbC50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCIuL3Jlc29sdmUudHNcIjtcbmltcG9ydCB7IGFzc2VydEFyZ3MgfSBmcm9tIFwiLi4vX2NvbW1vbi9yZWxhdGl2ZS50c1wiO1xuXG4vKipcbiAqIFJldHVybiB0aGUgcmVsYXRpdmUgcGF0aCBmcm9tIGBmcm9tYCB0byBgdG9gIGJhc2VkIG9uIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuXG4gKlxuICogQHBhcmFtIGZyb20gcGF0aCBpbiBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5XG4gKiBAcGFyYW0gdG8gcGF0aCBpbiBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZShmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBzdHJpbmcge1xuICBhc3NlcnRBcmdzKGZyb20sIHRvKTtcblxuICBmcm9tID0gcmVzb2x2ZShmcm9tKTtcbiAgdG8gPSByZXNvbHZlKHRvKTtcblxuICBpZiAoZnJvbSA9PT0gdG8pIHJldHVybiBcIlwiO1xuXG4gIC8vIFRyaW0gYW55IGxlYWRpbmcgYmFja3NsYXNoZXNcbiAgbGV0IGZyb21TdGFydCA9IDE7XG4gIGNvbnN0IGZyb21FbmQgPSBmcm9tLmxlbmd0aDtcbiAgZm9yICg7IGZyb21TdGFydCA8IGZyb21FbmQ7ICsrZnJvbVN0YXJ0KSB7XG4gICAgaWYgKCFpc1Bvc2l4UGF0aFNlcGFyYXRvcihmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0KSkpIGJyZWFrO1xuICB9XG4gIGNvbnN0IGZyb21MZW4gPSBmcm9tRW5kIC0gZnJvbVN0YXJ0O1xuXG4gIC8vIFRyaW0gYW55IGxlYWRpbmcgYmFja3NsYXNoZXNcbiAgbGV0IHRvU3RhcnQgPSAxO1xuICBjb25zdCB0b0VuZCA9IHRvLmxlbmd0aDtcbiAgZm9yICg7IHRvU3RhcnQgPCB0b0VuZDsgKyt0b1N0YXJ0KSB7XG4gICAgaWYgKCFpc1Bvc2l4UGF0aFNlcGFyYXRvcih0by5jaGFyQ29kZUF0KHRvU3RhcnQpKSkgYnJlYWs7XG4gIH1cbiAgY29uc3QgdG9MZW4gPSB0b0VuZCAtIHRvU3RhcnQ7XG5cbiAgLy8gQ29tcGFyZSBwYXRocyB0byBmaW5kIHRoZSBsb25nZXN0IGNvbW1vbiBwYXRoIGZyb20gcm9vdFxuICBjb25zdCBsZW5ndGggPSBmcm9tTGVuIDwgdG9MZW4gPyBmcm9tTGVuIDogdG9MZW47XG4gIGxldCBsYXN0Q29tbW9uU2VwID0gLTE7XG4gIGxldCBpID0gMDtcbiAgZm9yICg7IGkgPD0gbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoaSA9PT0gbGVuZ3RoKSB7XG4gICAgICBpZiAodG9MZW4gPiBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGlzUG9zaXhQYXRoU2VwYXJhdG9yKHRvLmNoYXJDb2RlQXQodG9TdGFydCArIGkpKSkge1xuICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGBmcm9tYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgdG9gLlxuICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvZm9vL2Jhcic7IHRvPScvZm9vL2Jhci9iYXonXG4gICAgICAgICAgcmV0dXJuIHRvLnNsaWNlKHRvU3RhcnQgKyBpICsgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIC8vIFdlIGdldCBoZXJlIGlmIGBmcm9tYCBpcyB0aGUgcm9vdFxuICAgICAgICAgIC8vIEZvciBleGFtcGxlOiBmcm9tPScvJzsgdG89Jy9mb28nXG4gICAgICAgICAgcmV0dXJuIHRvLnNsaWNlKHRvU3RhcnQgKyBpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmcm9tTGVuID4gbGVuZ3RoKSB7XG4gICAgICAgIGlmIChpc1Bvc2l4UGF0aFNlcGFyYXRvcihmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0ICsgaSkpKSB7XG4gICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgZXhhY3QgYmFzZSBwYXRoIGZvciBgZnJvbWAuXG4gICAgICAgICAgLy8gRm9yIGV4YW1wbGU6IGZyb209Jy9mb28vYmFyL2Jheic7IHRvPScvZm9vL2JhcidcbiAgICAgICAgICBsYXN0Q29tbW9uU2VwID0gaTtcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgLy8gV2UgZ2V0IGhlcmUgaWYgYHRvYCBpcyB0aGUgcm9vdC5cbiAgICAgICAgICAvLyBGb3IgZXhhbXBsZTogZnJvbT0nL2Zvbyc7IHRvPScvJ1xuICAgICAgICAgIGxhc3RDb21tb25TZXAgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgZnJvbUNvZGUgPSBmcm9tLmNoYXJDb2RlQXQoZnJvbVN0YXJ0ICsgaSk7XG4gICAgY29uc3QgdG9Db2RlID0gdG8uY2hhckNvZGVBdCh0b1N0YXJ0ICsgaSk7XG4gICAgaWYgKGZyb21Db2RlICE9PSB0b0NvZGUpIGJyZWFrO1xuICAgIGVsc2UgaWYgKGlzUG9zaXhQYXRoU2VwYXJhdG9yKGZyb21Db2RlKSkgbGFzdENvbW1vblNlcCA9IGk7XG4gIH1cblxuICBsZXQgb3V0ID0gXCJcIjtcbiAgLy8gR2VuZXJhdGUgdGhlIHJlbGF0aXZlIHBhdGggYmFzZWQgb24gdGhlIHBhdGggZGlmZmVyZW5jZSBiZXR3ZWVuIGB0b2BcbiAgLy8gYW5kIGBmcm9tYFxuICBmb3IgKGkgPSBmcm9tU3RhcnQgKyBsYXN0Q29tbW9uU2VwICsgMTsgaSA8PSBmcm9tRW5kOyArK2kpIHtcbiAgICBpZiAoaSA9PT0gZnJvbUVuZCB8fCBpc1Bvc2l4UGF0aFNlcGFyYXRvcihmcm9tLmNoYXJDb2RlQXQoaSkpKSB7XG4gICAgICBpZiAob3V0Lmxlbmd0aCA9PT0gMCkgb3V0ICs9IFwiLi5cIjtcbiAgICAgIGVsc2Ugb3V0ICs9IFwiLy4uXCI7XG4gICAgfVxuICB9XG5cbiAgLy8gTGFzdGx5LCBhcHBlbmQgdGhlIHJlc3Qgb2YgdGhlIGRlc3RpbmF0aW9uIChgdG9gKSBwYXRoIHRoYXQgY29tZXMgYWZ0ZXJcbiAgLy8gdGhlIGNvbW1vbiBwYXRoIHBhcnRzXG4gIGlmIChvdXQubGVuZ3RoID4gMCkgcmV0dXJuIG91dCArIHRvLnNsaWNlKHRvU3RhcnQgKyBsYXN0Q29tbW9uU2VwKTtcbiAgZWxzZSB7XG4gICAgdG9TdGFydCArPSBsYXN0Q29tbW9uU2VwO1xuICAgIGlmIChpc1Bvc2l4UGF0aFNlcGFyYXRvcih0by5jaGFyQ29kZUF0KHRvU3RhcnQpKSkgKyt0b1N0YXJ0O1xuICAgIHJldHVybiB0by5zbGljZSh0b1N0YXJ0KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxxQ0FBcUM7QUFFckMsU0FBUyxvQkFBb0IsUUFBUSxhQUFhO0FBQ2xELFNBQVMsT0FBTyxRQUFRLGVBQWU7QUFDdkMsU0FBUyxVQUFVLFFBQVEseUJBQXlCO0FBRXBEOzs7OztDQUtDLEdBQ0QsT0FBTyxTQUFTLFNBQVMsSUFBWSxFQUFFLEVBQVUsRUFBVTtJQUN6RCxXQUFXLE1BQU07SUFFakIsT0FBTyxRQUFRO0lBQ2YsS0FBSyxRQUFRO0lBRWIsSUFBSSxTQUFTLElBQUksT0FBTztJQUV4QiwrQkFBK0I7SUFDL0IsSUFBSSxZQUFZO0lBQ2hCLE1BQU0sVUFBVSxLQUFLLE1BQU07SUFDM0IsTUFBTyxZQUFZLFNBQVMsRUFBRSxVQUFXO1FBQ3ZDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxVQUFVLENBQUMsYUFBYSxLQUFNO0lBQy9EO0lBQ0EsTUFBTSxVQUFVLFVBQVU7SUFFMUIsK0JBQStCO0lBQy9CLElBQUksVUFBVTtJQUNkLE1BQU0sUUFBUSxHQUFHLE1BQU07SUFDdkIsTUFBTyxVQUFVLE9BQU8sRUFBRSxRQUFTO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxVQUFVLENBQUMsV0FBVyxLQUFNO0lBQzNEO0lBQ0EsTUFBTSxRQUFRLFFBQVE7SUFFdEIsMERBQTBEO0lBQzFELE1BQU0sU0FBUyxVQUFVLFFBQVEsVUFBVSxLQUFLO0lBQ2hELElBQUksZ0JBQWdCLENBQUM7SUFDckIsSUFBSSxJQUFJO0lBQ1IsTUFBTyxLQUFLLFFBQVEsRUFBRSxFQUFHO1FBQ3ZCLElBQUksTUFBTSxRQUFRO1lBQ2hCLElBQUksUUFBUSxRQUFRO2dCQUNsQixJQUFJLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxVQUFVLEtBQUs7b0JBQ3BELHlEQUF5RDtvQkFDekQsa0RBQWtEO29CQUNsRCxPQUFPLEdBQUcsS0FBSyxDQUFDLFVBQVUsSUFBSTtnQkFDaEMsT0FBTyxJQUFJLE1BQU0sR0FBRztvQkFDbEIsb0NBQW9DO29CQUNwQyxtQ0FBbUM7b0JBQ25DLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBVTtnQkFDNUIsQ0FBQztZQUNILE9BQU8sSUFBSSxVQUFVLFFBQVE7Z0JBQzNCLElBQUkscUJBQXFCLEtBQUssVUFBVSxDQUFDLFlBQVksS0FBSztvQkFDeEQseURBQXlEO29CQUN6RCxrREFBa0Q7b0JBQ2xELGdCQUFnQjtnQkFDbEIsT0FBTyxJQUFJLE1BQU0sR0FBRztvQkFDbEIsbUNBQW1DO29CQUNuQyxtQ0FBbUM7b0JBQ25DLGdCQUFnQjtnQkFDbEIsQ0FBQztZQUNILENBQUM7WUFDRCxLQUFNO1FBQ1IsQ0FBQztRQUNELE1BQU0sV0FBVyxLQUFLLFVBQVUsQ0FBQyxZQUFZO1FBQzdDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVO1FBQ3ZDLElBQUksYUFBYSxRQUFRLEtBQU07YUFDMUIsSUFBSSxxQkFBcUIsV0FBVyxnQkFBZ0I7SUFDM0Q7SUFFQSxJQUFJLE1BQU07SUFDVix1RUFBdUU7SUFDdkUsYUFBYTtJQUNiLElBQUssSUFBSSxZQUFZLGdCQUFnQixHQUFHLEtBQUssU0FBUyxFQUFFLEVBQUc7UUFDekQsSUFBSSxNQUFNLFdBQVcscUJBQXFCLEtBQUssVUFBVSxDQUFDLEtBQUs7WUFDN0QsSUFBSSxJQUFJLE1BQU0sS0FBSyxHQUFHLE9BQU87aUJBQ3hCLE9BQU87UUFDZCxDQUFDO0lBQ0g7SUFFQSwwRUFBMEU7SUFDMUUsd0JBQXdCO0lBQ3hCLElBQUksSUFBSSxNQUFNLEdBQUcsR0FBRyxPQUFPLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVTtTQUMvQztRQUNILFdBQVc7UUFDWCxJQUFJLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUU7UUFDcEQsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQyJ9