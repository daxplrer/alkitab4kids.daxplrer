// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { basename as posixBasename } from "./posix/basename.ts";
import { basename as windowsBasename } from "./windows/basename.ts";
/**
 * Return the last portion of a `path`.
 * Trailing directory separators are ignored, and optional suffix is removed.
 *
 * @param path - path to extract the name from.
 * @param [suffix] - suffix to remove from extracted name.
 */ export function basename(path, suffix = "") {
    return isWindows ? windowsBasename(path, suffix) : posixBasename(path, suffix);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvYmFzZW5hbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4vX29zLnRzXCI7XG5pbXBvcnQgeyBiYXNlbmFtZSBhcyBwb3NpeEJhc2VuYW1lIH0gZnJvbSBcIi4vcG9zaXgvYmFzZW5hbWUudHNcIjtcbmltcG9ydCB7IGJhc2VuYW1lIGFzIHdpbmRvd3NCYXNlbmFtZSB9IGZyb20gXCIuL3dpbmRvd3MvYmFzZW5hbWUudHNcIjtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGxhc3QgcG9ydGlvbiBvZiBhIGBwYXRoYC5cbiAqIFRyYWlsaW5nIGRpcmVjdG9yeSBzZXBhcmF0b3JzIGFyZSBpZ25vcmVkLCBhbmQgb3B0aW9uYWwgc3VmZml4IGlzIHJlbW92ZWQuXG4gKlxuICogQHBhcmFtIHBhdGggLSBwYXRoIHRvIGV4dHJhY3QgdGhlIG5hbWUgZnJvbS5cbiAqIEBwYXJhbSBbc3VmZml4XSAtIHN1ZmZpeCB0byByZW1vdmUgZnJvbSBleHRyYWN0ZWQgbmFtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJhc2VuYW1lKHBhdGg6IHN0cmluZywgc3VmZml4ID0gXCJcIik6IHN0cmluZyB7XG4gIHJldHVybiBpc1dpbmRvd3NcbiAgICA/IHdpbmRvd3NCYXNlbmFtZShwYXRoLCBzdWZmaXgpXG4gICAgOiBwb3NpeEJhc2VuYW1lKHBhdGgsIHN1ZmZpeCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHFDQUFxQztBQUVyQyxTQUFTLFNBQVMsUUFBUSxXQUFXO0FBQ3JDLFNBQVMsWUFBWSxhQUFhLFFBQVEsc0JBQXNCO0FBQ2hFLFNBQVMsWUFBWSxlQUFlLFFBQVEsd0JBQXdCO0FBRXBFOzs7Ozs7Q0FNQyxHQUNELE9BQU8sU0FBUyxTQUFTLElBQVksRUFBRSxTQUFTLEVBQUUsRUFBVTtJQUMxRCxPQUFPLFlBQ0gsZ0JBQWdCLE1BQU0sVUFDdEIsY0FBYyxNQUFNLE9BQU87QUFDakMsQ0FBQyJ9