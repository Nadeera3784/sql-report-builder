module.exports = (sequelize, DataTypes) => {
    const user_tokens = sequelize.define('user_tokens', {
      id: {
        allowNull: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: DataTypes.STRING,
      token : DataTypes.STRING,
      otp : DataTypes.INTEGER,
      created_at : DataTypes.DATE
    }, {
      timestamps: false,
      tableName: 'user_tokens',
    });
  
    user_tokens.associate = function(models) {
  
    };
  
    return user_tokens;
  };
  