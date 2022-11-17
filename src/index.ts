import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";
import { AppDataSource } from "./database/data-source";

dotenv.config({ path: "./.env.local" });

const PORT = process.env.PORT;

const HOSTNAME = process.env.HOSTNAME || "http://localhost";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );

  app.use(routes);

  app.use((req, res) => {
    res.status(404);
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`);
  });
})

