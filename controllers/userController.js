const { User, Thought, Reaction } = require('../models');

module.exports = {  
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    
    async getSingleUser(req, res) {
        try {
            const { userid } = req.params;
            const user = await User.findById({ _id: userid })
                .select('-__v')
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateUser(req, res) {
        try {
            const { userid } = req.params;
            const user = await User.findByIdAndUpdate(
                { _id: userid }, 
                { $set: req.body },
                { runValidators: true, new: true })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: "User updated successfully!" })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { userid } = req.params;
            const user = await User.findByIdAndDelete({ _id: userid });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await Thought.deleteMany({ username: user.username } );
            await User.updateMany({ friends: userid } , 
                { $pull: { friends: userid } }, );
            
            res.status(200).json({ message: "User deleted successfully!" })
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async addFriend(req, res) {
        try {
            const { userid, friendid } = req.params;
            const user = await User.findByIdAndUpdate(
                { _id: userid }, 
                { $push: { friends: friendid } },
                { runValidators: true, new: true }
            );
            console.log('user',user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Friend added successfully', user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deleteFriend(req, res) {
        try {
            const { userid, friendid } = req.params;
            console.log(userid, friendid)
            const user = await User.findByIdAndUpdate(
                { _id: userid }, 
                { $pull: { friends: friendid } },
                { new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Friend deleted successfully', user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

}