// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { assertPath } from "./assert_path.ts";
export function assertArg(path) {
    assertPath(path);
    if (path.length === 0) return ".";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvX2NvbW1vbi9ub3JtYWxpemUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMyB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cblxuaW1wb3J0IHsgYXNzZXJ0UGF0aCB9IGZyb20gXCIuL2Fzc2VydF9wYXRoLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRBcmcocGF0aDogc3RyaW5nKSB7XG4gIGFzc2VydFBhdGgocGF0aCk7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiLlwiO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxxQ0FBcUM7QUFFckMsU0FBUyxVQUFVLFFBQVEsbUJBQW1CO0FBRTlDLE9BQU8sU0FBUyxVQUFVLElBQVksRUFBRTtJQUN0QyxXQUFXO0lBQ1gsSUFBSSxLQUFLLE1BQU0sS0FBSyxHQUFHLE9BQU87QUFDaEMsQ0FBQyJ9