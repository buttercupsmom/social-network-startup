const router = require("express").Router();
const {
  getThoughts,
  getOneThoughts,
  createThought,
} = require("../../controllers/thoughtController.js");

// api/thought
// get and post
router.route("/").get(getThoughts).post(createThought);

// api/thoughts/:thoughtId
// post, put, and delete
router.route("thought/:thoughtId").get(getOneThoughts).post(createThought);

// /api/thoughts/:thoughtId/reactions
// post and delete reactions
// router.route("/:thoughtId/reactions").post(addReactions);

module.exports = router;
