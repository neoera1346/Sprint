'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // await queryInterface.createTable('url', {
    //   userId: {
    //     allowNull: false,
    //     type: Sequelize.INTEGER
    //   },
    // })

    await queryInterface.addColumn(
      // field 추가
      'urls', // name of Source model
      'userId', // name of the key we're adding 
      Sequelize.INTEGER
    )

      // foreign key 연결
      await queryInterface.addConstraint('urls', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'FK_any_name_you_want',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      });

      // {
      //   type: Sequelize.UUID,
      //   references: {
      //     model: 'Customers', // name of Target model
      //     key: 'id', // key in Target model that we're referencing
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // }
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('urls', 'FK_any_name_you_want');
    await queryInterface.removeColumn('urls', 'userId');
  }
};
