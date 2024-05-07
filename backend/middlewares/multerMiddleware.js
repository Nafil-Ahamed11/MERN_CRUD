import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./public/images");
    },

    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadMiddleware = multer({ storage, fileFilter });

export default uploadMiddleware; 
