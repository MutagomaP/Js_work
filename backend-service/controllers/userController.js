const User = require("./../models/userModel")

function home(req, res){
    res.send("<h1>Home Route of CRUD Application</h1>");
}

async function createUser(req,res){
    try {
        const {name, email} = req.body;

        // Check if Name or/and Email are empty
        if(!(name && email)){
            throw new Error("Name or/and Email are empty!")
        }

        // Check if User already exists
        const uniqueUserOrNot = await User.findOne({email});
        if(uniqueUserOrNot){
            throw new Error("User with same email already exists!")
        }

        // Create and Save User in database
        const newUser = new User({name,email});
        await newUser.save();
        res.status(201).json({
            success:true,
            message:"User Created Successfully.",
            newUser,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send(`Error Occurred!\n${error}`)
    }
}

async function getUsers(req,res){
    try {    
        const allUsers = await User.find();
        let responseMsg = "User list exists.";
        if(!allUsers.length){
            responseMsg = "User list is empty!";
        }
        res.status(200).json({
            success:true,
            message:responseMsg,
            allUsers,
        })
    } catch (error) {
        console.log(error);
        res.status(403).json({
            success:false,
            message:error.message,
        })
    }
}

async function editUser(req,res){
    try {
        const {name, email} = req.body;
        if(!(name || email)){
            throw new Error(`Nothing to update! Because both name & email are either empty or were not sent properly!`)
        }
        const currentUser = await User.findByIdAndUpdate(req.params.id, 
            req.body); // or // {name, email});
        if(!currentUser)
            throw new Error(`No user exists with given id=${req.params.id}!`);
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json({
            success:true,
            message:"User data has been updated successfully.",
            updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message: error.message,
        })
    }
    
}

async function deleteUser(req,res){
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser)
            throw new Error(`No user exists with given id=${req.params.id}!`);
        res.status(200).json({
            success:true,
            message:"User data has been deleted successfully.",
            deletedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message: error.message,
        })
    }
}
module.exports = {home, createUser, getUsers, editUser, deleteUser};