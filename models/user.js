'use strict';
const { Model, UUID, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Service,{foreignKey:'userId',onDelete:'CASCADE'});
      User.hasMany(models.Booking,{foreignKey:'userId', as:'userBookings',onDelete:'CASCADE'});
      User.hasMany(models.Booking,{foreignKey:'providerId', as:'providersBookings',onDelete:'CASCADE'})
        }
  }
  User.init({
    id:{
      type:UUID,
      defaultValue:UUIDV4,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
    allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
  },
    role:{
     type: DataTypes.STRING,
      defaultValue:"user",
      validate:{
        isIn:[['user','provider','admin']]
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};