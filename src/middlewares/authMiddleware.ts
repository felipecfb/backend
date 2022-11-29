import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);

    res.send(data);
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
