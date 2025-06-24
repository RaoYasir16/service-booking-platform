'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsTo(models.User,{foreignKey:'userId',onDelete:'CASCADE'});
      Service.hasMany(models.Booking,{foreignKey:'serviceId',onDelete:'CASCADE'})
    }
  }
  Service.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    title:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{ 
      type:DataTypes.TEXT,
      allowNull:false
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{ 
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    userId:{ 
      type:DataTypes.UUID,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};