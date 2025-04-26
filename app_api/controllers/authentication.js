const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required." });
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    try {
        await user.save();
        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    try {
        console.log("🔐 Login route hit");

        if (!req.body.email || !req.body.password) {
            return res
                .status(400)
                .json({ "message": "All fields required." });
        }

        passport.authenticate('local', async (err, user, info) => {
            if (err) {
                console.log('❌ Error during authentication:', err);
                return res
                    .status(404)
                    .json(err);
            }
            if (user) {
                const token = user.generateJwt();
                console.log('✅ Token generated:', token);
                return res.status(200).json({ token });
            } else {
                console.log('❌ User not found, info:', info);
                return res.status(401).json(info);
            }
        })(req, res);
    } catch (error) {
        console.log('❌ Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login
};