import express from "express";
import { config } from "dotenv";
import { checkDb } from "./db.js";

config();
checkDb();

const PORT = parseInt(process.env["BACKEND_PORT"] ?? "3000");

const server = express();

server.get("/", (req, res) => {
     res.json({
          status: 200,
          path: req.path
     });
});

server.listen(PORT, () => {
     console.log(`Listenin on port ${PORT}`);
});
