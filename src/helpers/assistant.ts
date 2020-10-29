import jwt from "jsonwebtoken";

export const createToken = (userId:string) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.TOKENJWT!,
    { expiresIn: 60 * 60 * 24 * 30 }
  );

  return token
};
