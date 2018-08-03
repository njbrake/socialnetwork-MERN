const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post validation
const validatePostInput = require("../../validation/post");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
// @route   get request to api/posts/test
// @desc    tests post route
// @access  Public

router.get("/test", (req, res) =>
	res.json({
		msg: "posts works"
	})
);

// @route   POST request to api/posts
// @desc    create post
// @access  Private

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		//Check Validation
		if (!isValid) {
			// If errors send 400
			return res.status(400).json(errors);
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});

		newPost.save().then(post => res.json(post));
	}
);

// @route   GET request to api/posts
// @desc    get posts
// @access  Public

router.get("/", (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err =>
			res.status(404).json({ nopostsfound: "No posts found with that id" })
		);
});

// @route   GET request to api/posts/:id
// @desc    get post by id
// @access  Public

router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err =>
			res.status(404).json({ nopostfound: "No post found with that id" })
		);
});

// @route   DELETE request to api/posts/:id
// @desc    delete post
// @access  Private

router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					//Check for post owner
					if (post.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notauthorized: "user not authorized" });
					}

					//DELETE
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err => res.status(404).json({ postnotfound: "No post found" }));
		});
	}
);
module.exports = router;
