module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'events',
  });

  events.associate = function(models) {

  };

  return events;
};
