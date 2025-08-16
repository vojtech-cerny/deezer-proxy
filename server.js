import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/track", async (req, res) => {
  const { track, artist } = req.query;
  if (!track || !artist) return res.status(400).json({ error: "track and artist required" });

  try {
    const { data } = await axios.get(
      `https://api.deezer.com/search?q=${encodeURIComponent(`track:"${track}" artist:"${artist}"`)}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
