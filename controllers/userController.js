const { User, Thought } = require("../models");

const controllers = {
  getUsers(req, res) {
    User.find()
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((userInfo) => res.json(userInfo))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
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
};

module.exports = controllers;
