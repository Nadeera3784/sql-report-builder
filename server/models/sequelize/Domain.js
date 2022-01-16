module.exports = (sequelize, DataTypes) => {
    const domain = sequelize.define('domains', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      domain: DataTypes.STRING,
      org_id : DataTypes.INTEGER
    }, {
      timestamps: false,
      tableName: 'domains',
    });
  
    domain.associate = function(models) {
  
    };
  
    return domain;
  };
  