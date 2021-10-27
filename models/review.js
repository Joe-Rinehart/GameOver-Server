const { DataTypes } = require("sequelize")
const db = require("../db")

const Review = db.define("review", {
    game: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER
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

module.exports = Review