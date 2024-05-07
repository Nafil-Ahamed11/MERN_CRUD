import { Console } from "console";
import UserModels from "../models/User.js";
import path from "path"

const adminLogin = (req, res) => {
  try {
  console.log("entering admin logi n ")
  const { username, password } = req.body;
  console.log("username",username);
  console.log("password",password);
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      
      res.status(200).json({ success: true, message: 'Login successful' });
  } else {
      res.status(401).json({ success: false, message: 'Invalid login details' });
  }
  } catch (error) {
    console.log(error)
  }
};


const createEmployee = async (req, res) => { 
  try {
    console.log("Entered the createEmployee");
    const { name, email, mobileNo, designation, gender, course } = req.body;


    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }
    const img = req.file.filename;
    console.log("name", name);
    console.log("email", email);
    console.log("mobileNo", mobileNo);
    console.log("img",img);


    if (!name || !email || !mobileNo || !designation || !gender || !course || !img) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }


    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(mobileNo)) {
      return res.status(400).json({ success: false, message: 'Mobile number should contain only numeric characters' });
    }

    if (!img.match(/\.(jpg|jpeg|png)$/)) {
      return res.status(400).json({ success: false, message: 'Only JPG or PNG files are allowed' });
    }

     const existingUserEmail = await UserModels.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const existingUserMobile = await UserModels.findOne({ mobileNo });
    if (existingUserMobile) {
      return res.status(400).json({ success: false, message: 'Mobile number already registered' });
    }


    const newUser = new UserModels({
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        img
    });

    console.log("newUser", newUser);

    const savedUser = await newUser.save();
    res.status(200).json({ success: true, message: 'User Created successfully', savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};

const getEmployee = async (req,res) =>{
    try {
        const employee = await UserModels.find()
        const count = employee.length;
        if(!employee){
            return res.status(404).json({message:false, message: 'user not found'})
        }

        res.status(200).json({success:true ,count,employee})
    } catch (error) {
        console.log(error.message);
    }
}

const Delete = async (req, res) => {
  console.log("enterd delete function ")
  try {
    const userId = req.params.userId;
    console.log("userId",userId);
    console.log("Entered delete functionality");

    const deletedUser = await UserModels.findByIdAndDelete(userId);
        
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


const edit = async (req,res) =>{
  try {
    console.log("enterd edit page.....")
    const userId = req.params.userId;
    console.log("userId",userId);
    const user  = await UserModels.findById(userId);
    console.log("user",user);

    if(!user){
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
  }
}


const updateUser = async (req, res) => {
  try {
      const { name, email, mobileNo, designation, gender, course } = req.body;

      const userId = req.params.userId; 

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(mobileNo)) {
      return res.status(400).json({ success: false, message: 'Mobile number should contain only numeric characters' });
    }
      if(req.file){
        const img = req.file.filename;
        const updatedUser = await UserModels.findByIdAndUpdate(userId, {
          name,
          email,
          mobileNo,
          designation,
          gender,
          course,
          img
      }, { new: true }); 

      if (updatedUser) {
          res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
      } else {
          res.status(404).json({ success: false, message: 'User not found' });
      }
      } else {
        const updatedUser = await UserModels.findByIdAndUpdate(userId, {
          name,
          email,
          mobileNo,
          designation,
          gender,
          course,
      }, { new: true }); 

      if (updatedUser) {
          res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
      } else {
          res.status(404).json({ success: false, message: 'User not found' });
      }
      }

  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating the user' });
  }
};



const search = async (req, res) => {
  try {
    console.log("entering in side of the search functioanlity")
    const { key, limit } = req.query;
    const regex = new RegExp(key, 'i'); 


    const users = await UserModels.find({
      $or: [{ name: regex }, { email: regex }]
    }).limit(parseInt(limit) || 10); 

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const fetchAdmin = async (req, res) => {
  try {
      const userName = await process.env.ADMIN_USERNAME;
      if (!userName) {
          return res.status(404).json({ success: false, message: 'Admin not found' });
      }
      console.log("username" ,userName);
      res.status(200).json({ success: true, userName });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: 'An error occurred while fetching admin data' });
  }
};

export {
createEmployee,
getEmployee,
adminLogin,
Delete,
edit,
updateUser,
search,
fetchAdmin
}



