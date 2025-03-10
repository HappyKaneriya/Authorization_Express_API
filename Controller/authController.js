const bcrypt = require('bcryptjs');
const authentication = require('../models/userLoginSchema');

// Signup logic
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password.' });
        }
        const existingEmail = await authentication.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }
        const existingUsername = await authentication.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'User name is already in use.' });
        }

        const newUser = new authentication(req.body);
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password.' });
        }
        const existingUser = await authentication.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Email is not in use.' });
        }
        const userexist = await bcrypt.compare(password, existingUser.password);
        if (!userexist) {
            return res.status(400).json({ message: 'Email and Password does not match' });
        }
        return res.status(201).json({ message: 'Login Successfully' });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await authentication.find(); // find() will retrieve all users

        // If no users are found
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Return the users
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = { signup, signIn, getAllUsers };