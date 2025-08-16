import express from "express";
import axios from "axios";

const app = express();
const DEEZER_BASE = "https://api.deezer.com";

app.get("/ping", (req, res) => res.send({ status: "ok" }));

app.get("/*", async (req, res) => {
  try {
    const path = req.params[0];
    const query = new URLSearchParams(req.query).toString();
    const url = `${DEEZER_BASE}/${path}?${query}`;

    // Fetch Deezer
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
