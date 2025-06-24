'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User,{foreignKey:"userId", as: "user", onDelete:'CASCADE'});
      Booking.belongsTo(models.User,{foreignKey:"providerId", as:"provider",onDelete:'CASCADE'});
      Booking.belongsTo(models.Service,{foreignKey:"serviceId",onDelete:'CASCADE'})
    }
  }
  Booking.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    providerId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    serviceId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    date:{
      type:DataTypes.DATE,
      allowNull:false
    },
    status:{
      type:DataTypes.STRING,
      defaultValue:"pending",// 'pending' | 'accepted' | 'rejected' | 'completed'
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};