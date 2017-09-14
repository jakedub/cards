'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Card",
      "cardId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
return queryInterface.removeColumn("Card", "cardId");
  }
};
