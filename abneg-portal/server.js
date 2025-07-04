// server.js
import express from "express";
const app = express();
const PORT = 3001;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
