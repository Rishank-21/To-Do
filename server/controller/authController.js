import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

const formatUser = (user) => ({
    _id: user._id,
    name: user.fullName,
    fullName: user.fullName,
    email: user.email
});

export const register = async (req , res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const userAlreadyExists = await User.findOne({email: email});
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName: name,
            email: email,
            password: hashPassword
        });
        const token  = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ message: "User created successfully", user: formatUser(newUser), token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req , res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token  = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "User logged in successfully", user: formatUser(user), token: token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getUser = async (req , res) => {
    try{
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        res.status(200).json({ message: "User fetched successfully", user: formatUser(user) });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
