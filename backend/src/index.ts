import express from "express";
import { config } from "dotenv";
import { checkDb } from "./db.js";
import userRouter from "./api/users.js";

config();
checkDb();

const PORT = parseInt(process.env["BACKEND_PORT"] ?? "3000");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
     res.json({
          status: 200,
          path: req.path
     });
});
server.use("/auth", userRouter);

server.listen(PORT, () => {
     console.log(`Listenin on port ${PORT}`);
});
