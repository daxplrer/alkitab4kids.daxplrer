// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { _common } from "./_common/common.ts";
import { SEP } from "./separator.ts";
/** Determines the common path from a set of paths, using an optional separator,
 * which defaults to the OS default separator.
 *
 * ```ts
 *       import { common } from "https://deno.land/std@$STD_VERSION/path/mod.ts";
 *       const p = common([
 *         "./deno/std/path/mod.ts",
 *         "./deno/std/fs/mod.ts",
 *       ]);
 *       console.log(p); // "./deno/std/"
 * ```
 */ export function common(paths, sep = SEP) {
    return _common(paths, sep);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvY29tbW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmltcG9ydCB7IF9jb21tb24gfSBmcm9tIFwiLi9fY29tbW9uL2NvbW1vbi50c1wiO1xuaW1wb3J0IHsgU0VQIH0gZnJvbSBcIi4vc2VwYXJhdG9yLnRzXCI7XG5cbi8qKiBEZXRlcm1pbmVzIHRoZSBjb21tb24gcGF0aCBmcm9tIGEgc2V0IG9mIHBhdGhzLCB1c2luZyBhbiBvcHRpb25hbCBzZXBhcmF0b3IsXG4gKiB3aGljaCBkZWZhdWx0cyB0byB0aGUgT1MgZGVmYXVsdCBzZXBhcmF0b3IuXG4gKlxuICogYGBgdHNcbiAqICAgICAgIGltcG9ydCB7IGNvbW1vbiB9IGZyb20gXCJodHRwczovL2Rlbm8ubGFuZC9zdGRAJFNURF9WRVJTSU9OL3BhdGgvbW9kLnRzXCI7XG4gKiAgICAgICBjb25zdCBwID0gY29tbW9uKFtcbiAqICAgICAgICAgXCIuL2Rlbm8vc3RkL3BhdGgvbW9kLnRzXCIsXG4gKiAgICAgICAgIFwiLi9kZW5vL3N0ZC9mcy9tb2QudHNcIixcbiAqICAgICAgIF0pO1xuICogICAgICAgY29uc29sZS5sb2cocCk7IC8vIFwiLi9kZW5vL3N0ZC9cIlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tb24ocGF0aHM6IHN0cmluZ1tdLCBzZXAgPSBTRVApOiBzdHJpbmcge1xuICByZXR1cm4gX2NvbW1vbihwYXRocywgc2VwKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUscUNBQXFDO0FBRXJDLFNBQVMsT0FBTyxRQUFRLHNCQUFzQjtBQUM5QyxTQUFTLEdBQUcsUUFBUSxpQkFBaUI7QUFFckM7Ozs7Ozs7Ozs7O0NBV0MsR0FDRCxPQUFPLFNBQVMsT0FBTyxLQUFlLEVBQUUsTUFBTSxHQUFHLEVBQVU7SUFDekQsT0FBTyxRQUFRLE9BQU87QUFDeEIsQ0FBQyJ9