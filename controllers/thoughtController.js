const { User, Thought, Reaction } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .select('-__v')
                .populate('reactions');
            res.status(200).json(thoughts);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async addThought(req, res) {
        try {
            const { userid } = req.body;
            const thought = await Thought.create(req.body);  
            const user = await User.findByIdAndUpdate(
                { _id: userid }, 
                { $push: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getSingleThought(req, res) {
        try {
            const { thoughtid } = req.params;
            const thought = await Thought.findById({ _id: thoughtid })
                .select('-__v')
                .populate('reactions');;
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateThought(req, res) {
        try {
            const { thoughtid } = req.params;
            const thought = await Thought.findByIdAndUpdate(
                { _id: thoughtid }, 
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json({ message: "Thought updated successfully!" })
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async deleteThought(req, res) {
        try {
            const { thoughtid } = req.params;
            const thought = await Thought.findByIdAndDelete({ _id: thoughtid });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json({ message: "Thought deleted successfully!" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async addReaction(req, res) {
        try {
            const { thoughtid } = req.params;            
            const thought = await Thought.findByIdAndUpdate(
                { _id: thoughtid }, 
                { $push: { reactions: req.body } },                
                { runValidators: true, new: true })
                .populate({path: 'reactions', select: '-__v'})
                .select('-__v');            
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async deleteReaction(req, res) {
        try {
            const { thoughtid, reactionid } = req.params;  
            const thought = await Thought.findByIdAndUpdate(
                { _id: thoughtid },
                { $pull: { reactions: { reactionId: reactionid } }},
                { new: true }
            );
                         
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.status(200).json({ message: "Reaction deleted successfully!" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
}