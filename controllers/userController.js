const User = require('../models/User');

const userController = {
    // Gathers all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
            // Sends an error if there is one
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Collects only a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('userName');
    
                // Sends an error if there is one
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
    
            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
    // Creates a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
            // Sends an error if there is one
        }   catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;