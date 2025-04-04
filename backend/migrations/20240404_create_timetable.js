module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('timetables', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      course_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      day_of_week: {
        type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add any indexes here
    await queryInterface.addIndex('timetables', ['course_id']);
    await queryInterface.addIndex('timetables', ['day_of_week']);
    await queryInterface.addIndex('timetables', ['room']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('timetables');
  }
}; 