import UserModels from "../models/User.js";


const adminLogin = (req, res) => {
  console.log("entering admin logi n ")
  const { username, password } = req.body;
  console.log("username",username);
  console.log("password",password);
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      
      // req.session.isAdminLoggedIn = true;
      res.status(200).json({ success: true, message: 'Login successful' });
  } else {
      res.status(401).json({ success: false, message: 'Invalid login details' });
  }
};

const createEmployee = async (req, res) => { 
  try {
    console.log("Entered the createEmployee");
    const { name, email, mobileNo, designation, gender, course, img } = req.body;
    console.log("name", name);
    console.log("email", email);
    console.log("mobileNo", mobileNo);

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



export {
createEmployee,
getEmployee,
adminLogin
}



