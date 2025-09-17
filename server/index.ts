import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

app.use(express.json());

// Exempel-API
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Serva byggd frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDist = path.join(__dirname, "../../dist/public");
app.use(express.static(clientDist));
app.get("*", (_req, res) =>
  res.sendFile(path.join(clientDist, "index.html"))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
