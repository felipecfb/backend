import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.get("/users", new UserController().getUsers);
routes.post("/users", new UserController().create);
routes.post("/auth", new AuthController().authenticate);

export default routes;
