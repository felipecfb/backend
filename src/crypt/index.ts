import bcrypt from "bcrypt";

export function hashPassword(password: string | undefined) {
  const hash = bcrypt.hashSync(password!, 10);

  return hash;
}

export async function comparePassword(
  password: string | undefined,
  hash: string | undefined
) {
  const result = await bcrypt.compare(password!, hash!);

  return result;
}
