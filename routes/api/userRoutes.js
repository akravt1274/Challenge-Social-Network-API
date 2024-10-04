const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

// /api/users
router
  .route('/')
  .get(getUsers)
  .post(addUser);

// /api/users/:userid
router
  .route('/:userid')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userid/friends/:friendid
router
  .route('/:userid/friends/:friendid')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
