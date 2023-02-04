import { userModel } from "../../../connictionDB/model/user.js";
import { Op } from "sequelize";
import { productModel } from "../../../connictionDB/model/product.js";
// - Get all users with their products 
export const allUser = async (req, res, next) => {
  const allUser = await userModel.findAll({
    include : [
      {
        model:productModel,
        attributes : ['id','title','price','description']
      }
    ]
  });
  res.json({ message: "User Page", allUser });
};
export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, phone } = req.body;
    const user = await userModel.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      age,
    });
    res.json({ message: "Done", user });
  } catch (err) {
    if (err?.original?.errno == 1062) {
      res.json({ message: "Email exist" });
    } else {
      res.json({ message: "Catch error", err });
    }
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      attributes: ["id", "firstName", "lastName"],
      where: {
        email,
        password,
      },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "in-valid email or password", user });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({
      attributes:['firstName','lastName','email','age','phone'],
      where: { id },
    });
    if (user) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "in-valid account" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, age, phone } = req.body;
    const user = await userModel.update(
      { firstName, lastName, email, password, age, phone },
      { where: { id } }
    );
    if (user[0]) {
      res.json({ message: "Done", user });
    } else {
      res.json({ message: "in-valid account" });
    }
  } catch (err) {
    res.json({ message: "catch error", err });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.destroy({
      where : {id}
    });
    if(user){
      res.json({message:"Done",user})
    }else{
      res.json({message:"in-valid account"})
    }
  } catch (error) {
    res.json({message:"catch error",error})
  }
};
// - Get users which thier firstname starts with(a)
export const searshStF = async (req, res, next) => {
  try{
  const {firstname}=req.query
  const allUser = await userModel.findAll({
    attributes:['firstName','lastName','email','age','phone'],
    where:{firstName:{[Op.like]:`${firstname}%`}}
  });
  if (user) {
    res.json({ message: "success", user })
  }else{
    res.json({ message: "in-valid account"})
  }}
 catch (error) {
  res.json({ message: "catch error",error})
}};
// - Get users which thier firstname or last starts with(a)
export const searshStFOrL = async (req, res, next) => {
  try{
  const {startfristorlastname}=req.query
  const user = await userModel.findAll({
    attributes:['firstName','lastName','email','age','phone'],
    where:{[Op.or]:[
      {firstName:{[Op.like]:`${startfristorlastname}%`}},
      {lastName:{[Op.like]:`${startfristorlastname}%`}}
    ]}
  });
  if (user) {
    res.json({ message: "success", user })
  }else{
    res.json({ message: "in-valid account"})
  }}
 catch (error) {
  res.json({ message: "catch error",error})
}};
// - Get users which thier firstname or lastname contain(a)
export const searshFrOrLa = async(req,res)=>{
  try{
  const {fristorlastname}=req.query
  const user = await userModel.findAll({
    attributes:['firstName','lastName','email','age','phone'],
    where:{[Op.or]:[
      {firstName:{[Op.like]:`%${fristorlastname}%`}},
      {lastName:{[Op.like]:`%${fristorlastname}%`}}
    ]}
  });
  if (user) {
    res.json({ message: "success", user })
  }else{
    res.json({ message: "in-valid account"})
  }}
 catch (error) {
  res.json({ message: "catch error",error})
}}
// - Get users which their age greater than 20
export const searshAge = async (req,res)=>{
  try {
    
    const {age}=req.query
    const user = await userModel.findAll({
      attributes:['firstName','lastName','email','age','phone'],
      where:{age:{[Op.gt]:age}}
    });
    if (user) {
      res.json({ message: "success", user })
    }else{
      res.json({ message: "in-valid account"})
    }}
   catch (error) {
    res.json({ message: "catch error",error})
  }}
// - Get users which thier firstname starts with(a) and their age greater than or equal 20
export const searshFrAndAge = async (req,res)=>{
  try {
    
    const {age,firstname}=req.query
    const user = await userModel.findAll({
    attributes:['firstName','lastName','email','age','phone'],
    where:{[Op.and]:[
      {firstName:{[Op.like]:`${firstname}%`}},
      {age:{[Op.gte]:age}}
    ]}
  });
  if (user) {
    res.json({ message: "success", user })
  }else{
    res.json({ message: "in-valid account"})
  }
} catch (error) {
  res.json({ message: "catch error",error})
}
}