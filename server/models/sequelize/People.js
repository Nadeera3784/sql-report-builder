module.exports = (sequelize, DataTypes) => {
    const people = sequelize.define('people', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: DataTypes.STRING,
      company_id : DataTypes.INTEGER
    }, {
      timestamps: false,
      tableName: 'people',
    });
  
    people.associate = function(models) {
  
    };
  
    return people;
  };
  