// import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
// const port = 3000;
// const app = new expressive.App();
// app.get("/", (_req, res) => {
//   res.send("Hello from Replit\r\n");
// });
// const server = await app.listen(port, "0.0.0.0");
// console.log("app listening on port " + server.port);
// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import * as path from 'https://deno.land/std@0.204.0/path/mod.ts';
const app = express();
app.get("/", (req, res)=>{
    res.redirect(path.join(req.originalUrl, 'web', 'index'));
});
app.get('/web/index');
app.listen(8000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvZGVub3dlYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgKiBhcyBleHByZXNzaXZlIGZyb20gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vTk1hdGhhci9kZW5vLWV4cHJlc3MvbWFzdGVyL21vZC50c1wiO1xuXG4vLyBjb25zdCBwb3J0ID0gMzAwMDtcbi8vIGNvbnN0IGFwcCA9IG5ldyBleHByZXNzaXZlLkFwcCgpO1xuLy8gYXBwLmdldChcIi9cIiwgKF9yZXEsIHJlcykgPT4ge1xuLy8gICByZXMuc2VuZChcIkhlbGxvIGZyb20gUmVwbGl0XFxyXFxuXCIpO1xuLy8gfSk7XG4vLyBjb25zdCBzZXJ2ZXIgPSBhd2FpdCBhcHAubGlzdGVuKHBvcnQsIFwiMC4wLjAuMFwiKTtcbi8vIGNvbnNvbGUubG9nKFwiYXBwIGxpc3RlbmluZyBvbiBwb3J0IFwiICsgc2VydmVyLnBvcnQpO1xuXG4vLyBAZGVuby10eXBlcz1cIm5wbTpAdHlwZXMvZXhwcmVzc0A0LjE3LjE1XCJcbmltcG9ydCBleHByZXNzIGZyb20gXCJucG06ZXhwcmVzc0A0LjE4LjJcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMjA0LjAvcGF0aC9tb2QudHMnXG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLmdldChcIi9cIiwgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5yZWRpcmVjdChwYXRoLmpvaW4ocmVxLm9yaWdpbmFsVXJsLCAnd2ViJywgJ2luZGV4JykpXG59KTtcbmFwcC5nZXQoJy93ZWIvaW5kZXgnLCApICBcblxuYXBwLmxpc3Rlbig4MDAwKTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0dBQXNHO0FBRXRHLHFCQUFxQjtBQUNyQixvQ0FBb0M7QUFDcEMsZ0NBQWdDO0FBQ2hDLHVDQUF1QztBQUN2QyxNQUFNO0FBQ04sb0RBQW9EO0FBQ3BELHVEQUF1RDtBQUV2RCwyQ0FBMkM7QUFDM0MsT0FBTyxhQUFhLHFCQUFxQjtBQUN6QyxZQUFZLFVBQVUsNENBQTJDO0FBRWpFLE1BQU0sTUFBTTtBQUVaLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLE1BQVE7SUFDekIsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQUUsT0FBTztBQUNqRDtBQUNBLElBQUksR0FBRyxDQUFDO0FBRVIsSUFBSSxNQUFNLENBQUMifQ==