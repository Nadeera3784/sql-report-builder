module.exports = (sequelize, DataTypes) => {
    const organizations = sequelize.define('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
    }, {
      timestamps: false,
      tableName: 'organizations',
    });
  
    organizations.associate = function(models) {
  
    };
  
    return organizations;
  };