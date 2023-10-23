// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { assertArgs, lastPathSegment, stripSuffix } from "../_common/basename.ts";
import { stripTrailingSeparators } from "../_common/strip_trailing_separators.ts";
import { isPosixPathSeparator } from "./_util.ts";
/**
 * Return the last portion of a `path`.
 * Trailing directory separators are ignored, and optional suffix is removed.
 *
 * @param path - path to extract the name from.
 * @param [suffix] - suffix to remove from extracted name.
 */ export function basename(path, suffix = "") {
    assertArgs(path, suffix);
    const lastSegment = lastPathSegment(path, isPosixPathSeparator);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvcG9zaXgvYmFzZW5hbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHtcbiAgYXNzZXJ0QXJncyxcbiAgbGFzdFBhdGhTZWdtZW50LFxuICBzdHJpcFN1ZmZpeCxcbn0gZnJvbSBcIi4uL19jb21tb24vYmFzZW5hbWUudHNcIjtcbmltcG9ydCB7IHN0cmlwVHJhaWxpbmdTZXBhcmF0b3JzIH0gZnJvbSBcIi4uL19jb21tb24vc3RyaXBfdHJhaWxpbmdfc2VwYXJhdG9ycy50c1wiO1xuaW1wb3J0IHsgaXNQb3NpeFBhdGhTZXBhcmF0b3IgfSBmcm9tIFwiLi9fdXRpbC50c1wiO1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGFzdCBwb3J0aW9uIG9mIGEgYHBhdGhgLlxuICogVHJhaWxpbmcgZGlyZWN0b3J5IHNlcGFyYXRvcnMgYXJlIGlnbm9yZWQsIGFuZCBvcHRpb25hbCBzdWZmaXggaXMgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0gcGF0aCAtIHBhdGggdG8gZXh0cmFjdCB0aGUgbmFtZSBmcm9tLlxuICogQHBhcmFtIFtzdWZmaXhdIC0gc3VmZml4IHRvIHJlbW92ZSBmcm9tIGV4dHJhY3RlZCBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZW5hbWUocGF0aDogc3RyaW5nLCBzdWZmaXggPSBcIlwiKTogc3RyaW5nIHtcbiAgYXNzZXJ0QXJncyhwYXRoLCBzdWZmaXgpO1xuXG4gIGNvbnN0IGxhc3RTZWdtZW50ID0gbGFzdFBhdGhTZWdtZW50KHBhdGgsIGlzUG9zaXhQYXRoU2VwYXJhdG9yKTtcbiAgY29uc3Qgc3RyaXBwZWRTZWdtZW50ID0gc3RyaXBUcmFpbGluZ1NlcGFyYXRvcnMoXG4gICAgbGFzdFNlZ21lbnQsXG4gICAgaXNQb3NpeFBhdGhTZXBhcmF0b3IsXG4gICk7XG4gIHJldHVybiBzdWZmaXggPyBzdHJpcFN1ZmZpeChzdHJpcHBlZFNlZ21lbnQsIHN1ZmZpeCkgOiBzdHJpcHBlZFNlZ21lbnQ7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHFDQUFxQztBQUVyQyxTQUNFLFVBQVUsRUFDVixlQUFlLEVBQ2YsV0FBVyxRQUNOLHlCQUF5QjtBQUNoQyxTQUFTLHVCQUF1QixRQUFRLDBDQUEwQztBQUNsRixTQUFTLG9CQUFvQixRQUFRLGFBQWE7QUFFbEQ7Ozs7OztDQU1DLEdBQ0QsT0FBTyxTQUFTLFNBQVMsSUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFVO0lBQzFELFdBQVcsTUFBTTtJQUVqQixNQUFNLGNBQWMsZ0JBQWdCLE1BQU07SUFDMUMsTUFBTSxrQkFBa0Isd0JBQ3RCLGFBQ0E7SUFFRixPQUFPLFNBQVMsWUFBWSxpQkFBaUIsVUFBVSxlQUFlO0FBQ3hFLENBQUMifQ==