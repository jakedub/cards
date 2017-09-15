'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Deck.belongsTo(models.User);
        Deck.hasMany(models.Card);
      }
    }
  });
  return Deck;
};
