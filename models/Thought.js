const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: [true, 'Please add a thought'],
        minLength: 1,
        maxLength: 280,
    },    
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction],
    createdAt: {
      type: Date,
      default: Date.now,      
    },
},
{
    toJSON: {
      virtuals: true
    }  
});

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

thoughtSchema
  .virtual('localCreatedAt')
  .get(function () {
  return this.createdAt.toLocaleString();
});

// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
