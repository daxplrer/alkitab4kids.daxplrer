// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
import { CHAR_BACKWARD_SLASH, CHAR_FORWARD_SLASH, CHAR_LOWERCASE_A, CHAR_LOWERCASE_Z, CHAR_UPPERCASE_A, CHAR_UPPERCASE_Z } from "../_common/constants.ts";
export function isPosixPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH;
}
export function isPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}
export function isWindowsDeviceRoot(code) {
    return code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z || code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvd2luZG93cy9fdXRpbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIzIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gQ29weXJpZ2h0IHRoZSBCcm93c2VyaWZ5IGF1dGhvcnMuIE1JVCBMaWNlbnNlLlxuLy8gUG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJpZnkvcGF0aC1icm93c2VyaWZ5L1xuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG5pbXBvcnQge1xuICBDSEFSX0JBQ0tXQVJEX1NMQVNILFxuICBDSEFSX0ZPUldBUkRfU0xBU0gsXG4gIENIQVJfTE9XRVJDQVNFX0EsXG4gIENIQVJfTE9XRVJDQVNFX1osXG4gIENIQVJfVVBQRVJDQVNFX0EsXG4gIENIQVJfVVBQRVJDQVNFX1osXG59IGZyb20gXCIuLi9fY29tbW9uL2NvbnN0YW50cy50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQb3NpeFBhdGhTZXBhcmF0b3IoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0g7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhTZXBhcmF0b3IoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0ggfHwgY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzV2luZG93c0RldmljZVJvb3QoY29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgKGNvZGUgPj0gQ0hBUl9MT1dFUkNBU0VfQSAmJiBjb2RlIDw9IENIQVJfTE9XRVJDQVNFX1opIHx8XG4gICAgKGNvZGUgPj0gQ0hBUl9VUFBFUkNBU0VfQSAmJiBjb2RlIDw9IENIQVJfVVBQRVJDQVNFX1opXG4gICk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFLGlEQUFpRDtBQUNqRCw2REFBNkQ7QUFDN0QscUNBQXFDO0FBRXJDLFNBQ0UsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixnQkFBZ0IsUUFDWCwwQkFBMEI7QUFFakMsT0FBTyxTQUFTLHFCQUFxQixJQUFZLEVBQVc7SUFDMUQsT0FBTyxTQUFTO0FBQ2xCLENBQUM7QUFFRCxPQUFPLFNBQVMsZ0JBQWdCLElBQVksRUFBVztJQUNyRCxPQUFPLFNBQVMsc0JBQXNCLFNBQVM7QUFDakQsQ0FBQztBQUVELE9BQU8sU0FBUyxvQkFBb0IsSUFBWSxFQUFXO0lBQ3pELE9BQ0UsQUFBQyxRQUFRLG9CQUFvQixRQUFRLG9CQUNwQyxRQUFRLG9CQUFvQixRQUFRO0FBRXpDLENBQUMifQ==