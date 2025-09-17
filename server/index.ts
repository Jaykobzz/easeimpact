import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerRoutes } from "./routes.js";

const app = express();

app.use(express.json());

// Register API routes
registerRoutes(app);

// Health check endpoint
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Serva byggd frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDistCandidates = [
  // When running the TypeScript sources directly (ts-node-dev)
  path.resolve(__dirname, "..", "dist", "public"),
  // When running the compiled server output (server/dist/server/index.js)
  path.resolve(__dirname, "..", "..", "..", "dist", "public"),
];

const clientDist = clientDistCandidates.find((candidate) =>
  existsSync(candidate)
);

if (clientDist) {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) =>
    res.sendFile(path.join(clientDist, "index.html"))
  );
} else {
  console.warn(
    "⚠️ Client build output not found. Static assets will not be served."
  );
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
