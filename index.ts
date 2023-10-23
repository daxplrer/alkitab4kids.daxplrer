// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import * as path from "https://deno.land/std@0.204.0/path/mod.ts";

const app = express();

app.get("/", (req, res) => {
  res.redirect(path.join(req.originalUrl, "web", "index"));
});
app.get('/web/', (req, res)=>{
  
})

app.listen(8000);
