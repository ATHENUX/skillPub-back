import multer from "multer";
import path, { join } from "path";

const TEMP_UPLOAD_FOLDER = join(__dirname, "../public/images/upload/temp");

//Set storage engine

export const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_FOLDER,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
