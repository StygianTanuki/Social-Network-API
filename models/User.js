const { Schema, model } = require('mongoose');
const Thought = require('./Thought');
const Friend = require('./User');

// Schema for User
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Creates a friend counter
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
});

// Initializes the User model
const User = model('User', userSchema);

module.exports = User;