const router = require("express").Router();
const {
  getThoughts,
  getOneThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  getReaction,
} = require("../../controllers/thoughtController.js");

// api/thought
// get and post
router.route("/").get(getThoughts).post(createThought);

// api/thought/:thoughtId
// post, put, and delete
router
  .route("/:thoughtId")
  .get(getOneThoughts)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thought/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/reactionId").get(getReaction);
// post and delete reactions

module.exports = router;
