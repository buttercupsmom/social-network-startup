// const res = require("express/lib/response");
const { Thought, User } = require("../models");
// const reactionSchema = require("../models/Reaction");

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
  // get a thought by id
  getOneThoughts(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((newThought) =>
        !newThought
          ? res.status(404).json({ message: "No thought with this id." })
          : res.json(newThought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID." })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: "Thought deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a reaction stored in a single thoughts reactions array field
  createReaction(req, res) {
    console.log("You added a reaction");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.params.reactionId } },
      { new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No reaction found with that ID!" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  // get reaction by id
  getReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
      .select("-__v")
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "no reaction with that id" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = controllers;
