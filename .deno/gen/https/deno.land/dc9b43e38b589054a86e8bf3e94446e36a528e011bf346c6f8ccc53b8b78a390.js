// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { parse as posixParse } from "./posix/parse.ts";
import { parse as windowsParse } from "./windows/parse.ts";
/**
 * Return a `ParsedPath` object of the `path`.
 * @param path to process
 */ export function parse(path) {
    return isWindows ? windowsParse(path) : posixParse(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvcGFyc2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4vX29zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFBhcnNlZFBhdGggfSBmcm9tIFwiLi9faW50ZXJmYWNlLnRzXCI7XG5pbXBvcnQgeyBwYXJzZSBhcyBwb3NpeFBhcnNlIH0gZnJvbSBcIi4vcG9zaXgvcGFyc2UudHNcIjtcbmltcG9ydCB7IHBhcnNlIGFzIHdpbmRvd3NQYXJzZSB9IGZyb20gXCIuL3dpbmRvd3MvcGFyc2UudHNcIjtcblxuLyoqXG4gKiBSZXR1cm4gYSBgUGFyc2VkUGF0aGAgb2JqZWN0IG9mIHRoZSBgcGF0aGAuXG4gKiBAcGFyYW0gcGF0aCB0byBwcm9jZXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShwYXRoOiBzdHJpbmcpOiBQYXJzZWRQYXRoIHtcbiAgcmV0dXJuIGlzV2luZG93cyA/IHdpbmRvd3NQYXJzZShwYXRoKSA6IHBvc2l4UGFyc2UocGF0aCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHFDQUFxQztBQUVyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBRXJDLFNBQVMsU0FBUyxVQUFVLFFBQVEsbUJBQW1CO0FBQ3ZELFNBQVMsU0FBUyxZQUFZLFFBQVEscUJBQXFCO0FBRTNEOzs7Q0FHQyxHQUNELE9BQU8sU0FBUyxNQUFNLElBQVksRUFBYztJQUM5QyxPQUFPLFlBQVksYUFBYSxRQUFRLFdBQVcsS0FBSztBQUMxRCxDQUFDIn0=