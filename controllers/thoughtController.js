const { Thought, User } = require('../models');

const thoughtController = {
    // Gathers all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Collects only a single thought
    async getSingleThought(req, res) {
        try { 
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
        
            res.json(thought);
            } catch (err) {
            res.status(500).json(err);
            }
    },
    // Creates a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id}},
                { new: true}
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but no user found with that ID',
                });
            }

            res.json('Thought Successfully Posted!');
        }   catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    // Updates a thought that was already established
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        }   catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    // Deletes a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this ID' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Thought created but no user with this ID' });
            }
        
                res.json({ message: 'Thought successfully deleted!' });
            }   catch (err) {
                res.status(500).json(err);
            }
    },
    // Adds a reaction to a thought
    async addThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }
    
                res.json(thought);
            }       catch (err) {
                res.status(500).json(err);
            }
    },
    // Deletes a reaction from a thought
    async deleteThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }
    
                res.json(thought);
            }     catch (err) {
                res.status(500).json(err);
            }
    },
};

module.exports = thoughtController;