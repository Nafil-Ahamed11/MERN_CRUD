import { Console } from "console";
import UserModels from "../models/User.js";
import path from "path"



const adminLogin = (req, res) => {
  console.log("entering admin logi n ")
  const { username, password } = req.body;
  console.log("username",username);
  console.log("password",password);
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      
    req.session.isAdminLoggedIn = true;

      res.status(200).json({ success: true, message: 'Login successful' });
  } else {
      res.status(401).json({ success: false, message: 'Invalid login details' });
  }
};

const adminLogout = async (req, res) => {
  try {
    console.log("enterd admin Logout")
    req.session.destroy((err) => {
      if (err) {
          console.log(err);
          res.status(500).json({ success: false, message: 'Logout failed' });
      } else {
          res.clearCookie('sid'); // Clear the session cookie
          res.status(200).json({ success: true, message: 'Logout successful' });
      }
  });
  
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createEmployee = async (req, res) => { 
  try {
    console.log("Entered the createEmployee");
    const { name, email, mobileNo, designation, gender, course } = req.body;

    const img = req.file.filename;
    console.log("name", name);
    console.log("email", email);
    console.log("mobileNo", mobileNo);
    console.log("img",img);

    
    // Validation: Check if all fields are provided
    if (!name || !email || !mobileNo || !designation || !gender || !course || !img) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validation: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Validation: Check if mobileNo contains only numeric characters
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(mobileNo)) {
      return res.status(400).json({ success: false, message: 'Mobile number should contain only numeric characters' });
    }

    // Validation: Check if file type is jpg or png
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

    // Save the user to the database
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
        if(!employee){
            return res.status(404).json({message:false, message: 'user not found'})
        }

        res.status(200).json({success:true , employee})
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

      // Assuming you have a UserModel imported
      const userId = req.params.userId; // Assuming you have userId available in the route params
      const img = req.file.path.replace('public', '');

      // Update the user details in the database
      const updatedUser = await UserModels.findByIdAndUpdate(userId, {
          name,
          email,
          mobileNo,
          designation,
          gender,
          course,
          img
      }, { new: true }); // Set { new: true } to return the updated document
          console.log("updated user",updatedUser)
      if (updatedUser) {
          res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
      } else {
          res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating the user' });
  }
};




export {
createEmployee,
getEmployee,
adminLogin,
Delete,
edit,
updateUser,
adminLogout
}



