const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// GET and POST users
router.route("/").get(getUsers).post(createUser);

// GET, PUT, and DELETE users
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// POST and DELETE by userId and friendsId to add or delete to user's friend list
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
