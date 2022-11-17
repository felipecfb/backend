import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.get("/users", new UserController().getUsers);
routes.post("/users", new UserController().create);
routes.post("/auth", new AuthController().authenticate);
routes.get("/auth", authMiddleware, new AuthController().index);

export default routes;
