let express = require('express');
let router = express.Router();
const { Review } = require("../models")
let validateSession = require("../middleware/validate-session");

// Game is basically the title. Just not changing the name. Joe, remember this.

router.post("/create", validateSession, (req, res) => {
    const reviewEntry = {
        game: req.body.review.game,
        rating: req.body.review.rating,
        post: req.body.review.post,
        image: req.body.review.image,
        userId: req.user.id
    }
    Review.create(reviewEntry)
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, (req, res) => {
    Review.findAll()
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/get/:id", validateSession, (req, res) => {
    Review.findAll({
        where: { id: req.params.id, userId: req.user.id }
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err }))
    });

router.put("/update/:id", validateSession, function (req, res) {
    const updateReviewEntry = {
        game: req.body.review.game,
        rating: req.body.review.rating, 
        post: req.body.review.post,
        image: req.body.review.image
    };

    const query = { where: { id: req.params.id, userId: req.user.id }};

    Review.update(updateReviewEntry, query)
        .then((reviews) => res.status(200).json(reviews))
        .catch((err) => res.status(500).json({ error: err }));
    });

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, userId: req.user.id }};

    Review.destroy(query)
        .then(() =>res.status(200).json({ message: "Review entry destroyed ):" }))
        .catch((err) => res.status(500).json({ error: err }));
    });

module.exports = router; 