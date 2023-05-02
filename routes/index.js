const express = require("express");
const { ensureAuth, ensureGuest } = require("../middlewares/authMW");
const router = express.Router();

const {Story,storySchema} = require("../models/Story");

//@desc     Login/Landing Page
//@route    GET     /
router.get("/", ensureGuest, (req, res) => {
  res.render("home");
});

//@desc     Dashboard
//@route    GET     /dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
  Story.find({ user: req.user.id }).then((foundStories) => {
    // console.log(foundStories);
    res.render("dashboard", { user: req.user, stories: foundStories });
  });
});


module.exports = router;
