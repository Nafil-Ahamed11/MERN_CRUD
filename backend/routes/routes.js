import express from "express";
import { adminLogin, createEmployee, getEmployee, Delete, edit, updateUser,search,fetchAdmin } from "../controller/AdminController.js";
const router = express.Router();
import uploadMiddleware from "../middlewares/multerMiddleware.js";

router.get('/', (req, res) => {
    console.log("entered inside of route");
    res.send("Hello, World!"); 
});

router.post('/admin-login', adminLogin);
router.post('/create',  uploadMiddleware.single('img'), createEmployee);
router.post('/delete/:userId', Delete);
router.post('/edit/:userId', edit);
router.post('/update/:userId',  uploadMiddleware.single('img'), updateUser);
router.get('/get', getEmployee);
router.get('/get-search',search);
router.get('/fetch-admin',fetchAdmin);

export default router;
