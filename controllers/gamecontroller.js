let express = require('express');
let router = express.Router();
const { Game } = require("../models")
let validateSession = require("../middleware/validate-session");

// Game is basically the title. Just not changing the name. Joe, remember this.

router.post("/create", validateSession, (req, res) => {
    const gameEntry = {
        game: req.body.game.game,
        post: req.body.game.post,
        image: req.body.game.image,
        userId: req.user.id
    }
    Game.create(gameEntry)
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, (req, res) => {
    Game.findAll()
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/get/:id", validateSession, (req, res) => {
    Game.findAll({
        where: { id: req.params.id, userId: req.user.id }
    })
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json({ error: err }))
    });

router.put("/update/:id", validateSession, function (req, res) {
    const updateGameEntry = {
        game: req.body.game.game,
        post: req.body.game.post,
        image: req.body.game.image
    };

    const query = { where: { id: req.params.id, userId: req.user.id }};

    Game.update(updateGameEntry, query)
        .then((games) => res.status(200).json(games))
        .catch((err) => res.status(500).json({ error: err }));
    });

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, userId: req.user.id }};

    Game.destroy(query)
        .then(() =>res.status(200).json({ message: "Game entry destroyed ):" }))
        .catch((err) => res.status(500).json({ error: err }));
    });

module.exports = router;