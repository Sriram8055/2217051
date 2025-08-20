const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

const crypto = require('crypto');
const urls = {};
app.post("/shorturls", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL required" });

    const shortId = crypto.randomBytes(4).toString("hex");
    urls[shortId] = url;

    res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

app.get("/:id", (req, res) => {
    const originalUrl = urls[req.params.id];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

app.listen(3000, () => console.log("URL Shortener running on http://localhost:3000"));
