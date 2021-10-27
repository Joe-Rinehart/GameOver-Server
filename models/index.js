const User = require("./user");
const Game = require("./game")
const Review = require("./review")
// create individual files for your models and import them here

// Setup Associations
User.hasMany(Game);
User.hasMany(Review)
Game.belongsTo(User)
Review.belongsTo(User)


module.exports = {
  User,
  Game,
  Review
};
