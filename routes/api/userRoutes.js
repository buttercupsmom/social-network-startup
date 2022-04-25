const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
} = require("../../controllers/userController");

//get all users
// get and post
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
// get, put, and delete
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// bonus /api/users/:userId/friends/:friendId
// post to add a new user's friend list
// delete to remove a friend from users friend list
router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
