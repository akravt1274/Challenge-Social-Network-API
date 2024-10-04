const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
{
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,  // to define a unique index on this property
        trim: true, // to always call .trim() on the value
    },
    email: {
        type: String,
        required: [true, 'User email address is required'],
        lowercase: true,
        unique: true,  // to define a unique index on this property
        validate: {
            validator: (email) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Invalid email address format, try again.',
        },
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
    ],
},
{  
    toJSON: {
        virtuals: true,
    },
    id: false
});

// Create a virtual property `friendsCount` that retrieves the length of the friends array field on query.
userSchema
    .virtual('friendsCount')
    .get(function () {
        return this.friends.length;
  });

// Initialize User model
const User = model('User', userSchema);

module.exports = User;
