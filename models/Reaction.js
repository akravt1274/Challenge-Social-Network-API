const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: [true, 'Please add a reaction'],
        maxlength: 280,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    toJSON: {
      virtuals: true
    }  
},
{
    _id: false
});

reactionSchema
  .virtual('localCreatedAt')
  .get(function () {
  return this.createdAt.toLocaleString();
  });

module.exports = reactionSchema;
