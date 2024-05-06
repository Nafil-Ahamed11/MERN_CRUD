import express from "express";
import { adminLogin, createEmployee, getEmployee, Delete, edit, updateUser, adminLogout } from "../controller/userController.js";
const router = express.Router();
import uploadMiddleware from "../middlewares/multerMiddleware.js";
import { isAdminLoggedIn } from "../middlewares/authAdmin.js";

router.get('/', (req, res) => {
    console.log("entered inside of route");
    res.send("Hello, World!"); 
});

router.post('/admin-login', adminLogin);
router.post('/create', isAdminLoggedIn, uploadMiddleware.single('img'), createEmployee);
router.post('/delete/:userId', Delete);
router.post('/edit/:userId', isAdminLoggedIn, edit);
router.post('/update/:userId', isAdminLoggedIn, uploadMiddleware.single('img'), updateUser);
router.get('/admin-logout', isAdminLoggedIn, adminLogout);
router.get('/get', getEmployee);

export default router;
