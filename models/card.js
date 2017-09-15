'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    success: DataTypes.BOOLEAN,
    deckId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.Deck)
      }
    }
  });
  return Card;
};
