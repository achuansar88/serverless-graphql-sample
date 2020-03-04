const Sequelize = require("sequelize");
export default class User extends Sequelize.Model {

  static init(sequelize, DataTypes) {
    const User = super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        phone: DataTypes.STRING,
        email: DataTypes.STRING,       
        user_name: DataTypes.STRING,       
        signup_status: {type: DataTypes.BOOLEAN,defaultValue:false}       
       
      },
      {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: "user",
        sequelize
      }
    );
    return User
  }
}

