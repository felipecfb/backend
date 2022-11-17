import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { comparePassword } from "../crypt";
import { userRepository } from "../repositories/userRepository";

dotenv.config({ path: "./.env.local" });

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuário não encontrado/cadastrado" });
    }

    try {
      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      return res.json({
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
