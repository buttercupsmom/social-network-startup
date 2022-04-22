const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  // createCourse,
  // updateCourse,
  // deleteCourse,
} = require("../../controllers/userController");

//get all users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

// router
//   .route("/:courseId")
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

module.exports = router;
