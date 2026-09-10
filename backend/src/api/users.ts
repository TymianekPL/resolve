import { Router } from "express";
import { createUser, Errors } from "../utils/users.js";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
     console.log(req.body);
     if (!req.body || !req.body.username || !req.body.password || !req.body.displayName) {
          res.status(400).json({
               status: 400,
               localeMessage: "errors.auth.missing_fields"
          });
          return;
     }
     let { username, password, displayName } = req.body as { username: string, password: string, displayName: string };
     username = username.trim();
     password = password.trim();
     displayName = displayName.trim();

     if (username.length === 0 || password.length === 0 || displayName.length === 0) {
          res.status(400).json({
               status: 400,
               localeMessage: "errors.auth.missing_fields"
          });
          return;
     }

     const status = await createUser(username, password, displayName);
     if (Errors[status]) {
          res.status(401).json({
               status: 401,
               message: status
          });
          return;
     }
     res.status(201).json({
          status: 201,
          message: "created"
     });
});

export default userRouter;
