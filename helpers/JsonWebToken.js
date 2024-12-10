import { sign } from "jsonwebtoken";

function createJWT(data, secretKey) {
  return sign(data, secretKey, {
    expiresIn: 24 * 60 * 60,
  });
}

export { createJWT };
