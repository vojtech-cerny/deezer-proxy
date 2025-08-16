import http from "http";
import https from "https";
import { URL } from "url";

const DEEZER_BASE = "https://api.deezer.com";

const server = http.createServer((req, res) => {
  if (req.url === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  try {
    // Build Deezer URL
    const url = new URL(DEEZER_BASE + req.url);

    https.get(url, (deezerRes) => {
      let data = "";
      deezerRes.on("data", chunk => (data += chunk));
      deezerRes.on("end", () => {
        res.writeHead(deezerRes.statusCode, { "Content-Type": "application/json" });
        res.end(data);
      });
    }).on("error", (err) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    });

  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
