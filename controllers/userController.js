const { User, Thought } = require("../models");

const controllers = {
  // get all users
  getUsers(req, res) {
    User.find()
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // create user
  createUser(req, res) {
    User.create(req.body)
      .then((userInfo) => res.json(userInfo))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((userFound) => {
        !userFound
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json({
              userFound,
            });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No user found with this id!",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(
        (user) => !user,
        res.status(404).json({ message: "No user found with that id." })
      )
      .then(() => res.json({ message: "User removed." }))
      .catch((err) => res.status(500).json(err));
  },
  // BONUS: add friend
  addFriend(req, res) {
    console.log("You are adding an friend");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // BONUS: DELETE friend
};

module.exports = controllers;
