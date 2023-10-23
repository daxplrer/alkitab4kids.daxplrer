// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { _format, assertArg } from "../_common/format.ts";
/**
 * Generate a path from `FormatInputPathObject` object.
 * @param pathObject with path
 */ export function format(pathObject) {
    assertArg(pathObject);
    return _format("\\", pathObject);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvd2luZG93cy9mb3JtYXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgX2Zvcm1hdCwgYXNzZXJ0QXJnIH0gZnJvbSBcIi4uL19jb21tb24vZm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEZvcm1hdElucHV0UGF0aE9iamVjdCB9IGZyb20gXCIuLi9faW50ZXJmYWNlLnRzXCI7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBwYXRoIGZyb20gYEZvcm1hdElucHV0UGF0aE9iamVjdGAgb2JqZWN0LlxuICogQHBhcmFtIHBhdGhPYmplY3Qgd2l0aCBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQocGF0aE9iamVjdDogRm9ybWF0SW5wdXRQYXRoT2JqZWN0KTogc3RyaW5nIHtcbiAgYXNzZXJ0QXJnKHBhdGhPYmplY3QpO1xuICByZXR1cm4gX2Zvcm1hdChcIlxcXFxcIiwgcGF0aE9iamVjdCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLHFDQUFxQztBQUVyQyxTQUFTLE9BQU8sRUFBRSxTQUFTLFFBQVEsdUJBQXVCO0FBRzFEOzs7Q0FHQyxHQUNELE9BQU8sU0FBUyxPQUFPLFVBQWlDLEVBQVU7SUFDaEUsVUFBVTtJQUNWLE9BQU8sUUFBUSxNQUFNO0FBQ3ZCLENBQUMifQ==