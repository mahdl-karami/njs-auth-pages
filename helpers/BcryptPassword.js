import { compare, hash } from "bcryptjs";

async function HashPassword(password) {
  return await hash(password, 10);
}
async function verifyPassword(inputPassword, hashedPassword) {
  return await compare(inputPassword.toString(), hashedPassword);
}
export { HashPassword, verifyPassword };
