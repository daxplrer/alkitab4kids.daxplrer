// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { isWindows } from "./_os.ts";
import { extname as posixExtname } from "./posix/extname.ts";
import { extname as windowsExtname } from "./posix/extname.ts";
/**
 * Return the extension of the `path` with leading period.
 * @param path with extension
 * @returns extension (ex. for `file.ts` returns `.ts`)
 */ export function extname(path) {
    return isWindows ? windowsExtname(path) : posixExtname(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvZXh0bmFtZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIzIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQgeyBpc1dpbmRvd3MgfSBmcm9tIFwiLi9fb3MudHNcIjtcbmltcG9ydCB7IGV4dG5hbWUgYXMgcG9zaXhFeHRuYW1lIH0gZnJvbSBcIi4vcG9zaXgvZXh0bmFtZS50c1wiO1xuaW1wb3J0IHsgZXh0bmFtZSBhcyB3aW5kb3dzRXh0bmFtZSB9IGZyb20gXCIuL3Bvc2l4L2V4dG5hbWUudHNcIjtcbi8qKlxuICogUmV0dXJuIHRoZSBleHRlbnNpb24gb2YgdGhlIGBwYXRoYCB3aXRoIGxlYWRpbmcgcGVyaW9kLlxuICogQHBhcmFtIHBhdGggd2l0aCBleHRlbnNpb25cbiAqIEByZXR1cm5zIGV4dGVuc2lvbiAoZXguIGZvciBgZmlsZS50c2AgcmV0dXJucyBgLnRzYClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dG5hbWUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlzV2luZG93cyA/IHdpbmRvd3NFeHRuYW1lKHBhdGgpIDogcG9zaXhFeHRuYW1lKHBhdGgpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxxQ0FBcUM7QUFFckMsU0FBUyxTQUFTLFFBQVEsV0FBVztBQUNyQyxTQUFTLFdBQVcsWUFBWSxRQUFRLHFCQUFxQjtBQUM3RCxTQUFTLFdBQVcsY0FBYyxRQUFRLHFCQUFxQjtBQUMvRDs7OztDQUlDLEdBQ0QsT0FBTyxTQUFTLFFBQVEsSUFBWSxFQUFVO0lBQzVDLE9BQU8sWUFBWSxlQUFlLFFBQVEsYUFBYSxLQUFLO0FBQzlELENBQUMifQ==