'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    success: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.Deck, {foreignKey: 'deckId'})
      }
    }
  });
  return Card;
};
