const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const apiKey = "TmW3n2IbOKaZxkghOoYB";

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/lokasi", async (req, res) => {
    const q = req.query.q;
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(q)}.json?key=${apiKey}&language=id`;

    try {
        const f = (await axios.get(url)).data.features[0];
        

        res.json({
            lokasi: f.place_name,
            longitude: f.geometry.coordinates[0],
            latitude: f.geometry.coordinates[1]
        });
    } catch (error) {
        res.status(500).json({ message: "Lokasi tidak ditemukan" });
    }
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));