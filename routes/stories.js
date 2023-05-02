const express = require("express");
const { ensureAuth, ensureGuest } = require("../middlewares/authMW");
const router = express.Router();

const { Story, storySchema } = require("../models/Story");

//@desc     Get all stories
//@route    GET     /
router.get("/", ensureAuth, (req, res) => {
  Story.find({
    status: "public",
  })
    .populate("user")
    .then((foundStories) => {
      res.render("stories", { stories: foundStories });
    });
});

//@desc     Compose new Story
//@route    GET     /compose
router.get("/compose", ensureAuth, (req, res) => {
  res.render("story/compose");
});

//@desc     Add new Story to db
//@route    POST     /add
router.post("/add", ensureAuth, (req, res) => {
  try {
    req.body.user = req.user.id;
    Story.create(req.body)
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => {
        res.render("error/500", { err: err });
      });
  } catch (e) {
    res.render("error/500", { err: e });
  }
});

router.get("/:storyId", ensureAuth, (req, res) => {
  const storyId = req.params.storyId;
  Story.findById(storyId)
    .then((foundStory) => {
      res.render("story/story", { story: foundStory, user: req.user });
    })
    .catch((e) => {
      res.render("error/404",{err:e});
    });
});

module.exports = router;
