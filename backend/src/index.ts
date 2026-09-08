import express from "express";

const PORT = 3000;

const server = express();

server.get("/", (req, res) => {
     res.json({
          status: 200,
          path: req.path
     });
});

server.listen(PORT, () => {
     console.log(`Listenin on port ${PORT}`);
})
