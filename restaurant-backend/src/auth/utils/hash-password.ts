import * as bcrypt from 'bcrypt';

export async function hashPassword(raw: string): Promise<string> {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.PASSWORD_SALT_ROUNDS, 10),
  );
  return bcrypt.hash(raw, salt);
}