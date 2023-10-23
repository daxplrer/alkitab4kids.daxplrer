// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
export function stripTrailingSeparators(segment, isSep) {
    if (segment.length <= 1) {
        return segment;
    }
    let end = segment.length;
    for(let i = segment.length - 1; i > 0; i--){
        if (isSep(segment.charCodeAt(i))) {
            end = i;
        } else {
            break;
        }
    }
    return segment.slice(0, end);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjIwNC4wL3BhdGgvX2NvbW1vbi9zdHJpcF90cmFpbGluZ19zZXBhcmF0b3JzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjMgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgdGhlIEJyb3dzZXJpZnkgYXV0aG9ycy4gTUlUIExpY2Vuc2UuXG4vLyBQb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJvd3NlcmlmeS9wYXRoLWJyb3dzZXJpZnkvXG4vLyBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2VwYXJhdG9ycyhcbiAgc2VnbWVudDogc3RyaW5nLFxuICBpc1NlcDogKGNoYXI6IG51bWJlcikgPT4gYm9vbGVhbixcbik6IHN0cmluZyB7XG4gIGlmIChzZWdtZW50Lmxlbmd0aCA8PSAxKSB7XG4gICAgcmV0dXJuIHNlZ21lbnQ7XG4gIH1cblxuICBsZXQgZW5kID0gc2VnbWVudC5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IHNlZ21lbnQubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgIGlmIChpc1NlcChzZWdtZW50LmNoYXJDb2RlQXQoaSkpKSB7XG4gICAgICBlbmQgPSBpO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VnbWVudC5zbGljZSgwLCBlbmQpO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxpREFBaUQ7QUFDakQsNkRBQTZEO0FBQzdELHFDQUFxQztBQUVyQyxPQUFPLFNBQVMsd0JBQ2QsT0FBZSxFQUNmLEtBQWdDLEVBQ3hCO0lBQ1IsSUFBSSxRQUFRLE1BQU0sSUFBSSxHQUFHO1FBQ3ZCLE9BQU87SUFDVCxDQUFDO0lBRUQsSUFBSSxNQUFNLFFBQVEsTUFBTTtJQUV4QixJQUFLLElBQUksSUFBSSxRQUFRLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxJQUFLO1FBQzNDLElBQUksTUFBTSxRQUFRLFVBQVUsQ0FBQyxLQUFLO1lBQ2hDLE1BQU07UUFDUixPQUFPO1lBQ0wsS0FBTTtRQUNSLENBQUM7SUFDSDtJQUVBLE9BQU8sUUFBUSxLQUFLLENBQUMsR0FBRztBQUMxQixDQUFDIn0=