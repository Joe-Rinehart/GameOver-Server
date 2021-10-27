const { DataTypes } = require("sequelize")
const db = require("../db")

const Game = db.define("game", {
    game: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Game