import express from "express";
import {adminLogin, createEmployee, getEmployee} from "../controller/userController.js"
const router = express.Router();
import multer from "multer"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/assets/img'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });

  const upload= multer({storage:storage})


router.get('/', (req, res) => {
    console.log("enterd inside of route")
    res.send("Hello, World!"); 
});

router.post('/admin-login',adminLogin)
router.post('/create', upload.single('imgage'), createEmployee);

router.get('/get',getEmployee);

export default router;
