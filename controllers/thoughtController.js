// const res = require("express/lib/response");
const { Thought, User } = require("../models");

const controllers = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // get a thought
  getOneThoughts(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughtOne) =>
        !Thought
          ? res.status(404).json({ message: "No thought with that id." })
          : res.json(thoughtOne)
      )
      .catch((err) => res.status(500).json(err));
  },
  // post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
};

module.exports = controllers;
