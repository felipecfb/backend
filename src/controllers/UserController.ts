import { Request, Response } from "express";
import dotenv from "dotenv";

import { userRepository } from "../repositories/userRepository";

dotenv.config({ path: "./.env.local" });

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    switch (req.body) {
      case !email:
        return res.status(400).json({ message: "O email é obrigatório" });
      case !password:
        return res.status(400).json({ message: "A senha é obrigatória" });
      case !name:
        return res.status(400).json({ message: "O nome é obrigatório" });
    }

    const emailExists = await userRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    try {
      const newUser = userRepository.create({
        name,
        email,
        password,
      });

      await userRepository.save(newUser);

      const userInfo = {
        name,
        email,
        role,
      };

      return res.status(201).json(userInfo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
