'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Deck.belongsTo(models.User, {foreignKey: 'userId'})
      }
    }
  });
  return Deck;
};
