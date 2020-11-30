import jwt from "jsonwebtoken";
import fse from "fs-extra";

export const createToken = (userId: string) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.TOKENJWT!,
    { expiresIn: 60 * 60 * 24 * 30 }
  );

  return token;
};

export const removeFiles = (imagePaths: Array<any>) => {
  for (const filePath of imagePaths) {
    fse.remove(filePath, (err: any) => {
      if (err) {
        return console.log(err);
      }
      console.log(`${filePath} has been removed succesfully`);
    });
  }
};
