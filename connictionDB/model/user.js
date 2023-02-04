import { DataTypes } from "sequelize";
import { sequelize } from "../conniction.js";  
export const userModel = sequelize.define('User',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
    },
    phone:{
        type:DataTypes.STRING,
    }
})