import { sequelize } from "../conniction.js";
import { DataTypes } from "sequelize";
export const productModel = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
