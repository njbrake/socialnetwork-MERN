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

// @route   POST request to api/posts/like/:id
// @desc    like post
// @access  Private

router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res
							.status(400)
							.json({ alreadyliked: "user already liked this post" });
					}
					//Add user id to the likes array
					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ postnotfound: "No post found" }));
		});
	}
);

// @route   POST request to api/posts/unlike/:id
// @desc    unlike post
// @access  Private

router.post(
	"/unlike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length === 0
					) {
						return res
							.status(400)
							.json({ notliked: "You have not yet liked this post" });
					}
					//remove user id to the likes array
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					//Splice out of array
					post.likes.splice(removeIndex, 1);

					//save
					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({ postnotfound: "No post found" }));
		});
	}
);

// @route   POST request to api/posts/comment/:id
// @desc    add a comment to a post
// @access  Private

router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		//Check Validation
		if (!isValid) {
			// If errors send 400
			return res.status(400).json(errors);
		}
		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				//Add to comments array
				post.comments.unshift(newComment);
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: "no post found" }));
	}
);

// @route   Delete request to api/posts/comment/:id/:comment_id
// @desc    remove comment from post
// @access  Private

router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		//Check Validation
		if (!isValid) {
			// If errors send 400
			return res.status(400).json(errors);
		}
		Post.findById(req.params.id)
			.then(post => {
				//Check to see if comment exists
				if (
					post.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(400)
						.json({ commentnotexist: "comment does not exist" });
				}
				//get remove indexOf
				const removeIndex = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);

				//splice comment out of array
				post.comments.splice(removeIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err => res.status(404).json({ postnotfound: "no post found" }));
	}
);
module.exports = router;
