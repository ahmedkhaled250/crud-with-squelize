import { Op } from "sequelize";
import { productModel } from "../../../connictionDB/model/product.js";
import { userModel } from "../../../connictionDB/model/user.js";

export const allProducts = async (req, res) => {
  try {
    const product = await productModel.findAll({
      include: [
        {
          model: userModel,
          attributes: ["firstName", "lastName", "email", "age", "phone"],
        },
      ],
      attributes: [
        "id",
        "title",
        "price",
        "description",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json({ message: "Success", product });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOne({
      include: [
        {
          model: userModel,
          attributes: ["firstName", "lastName", "email", "age", "phone"],
        },
      ],
      attributes: [
        "id",
        "title",
        "price",
        "description",
        "createdAt",
        "updatedAt",
      ],
      where: { id },
    });
    if (product) {
      res.json({ message: "Success", product });
    } else {
      res.json({ message: "In-valid product" });
    }
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
// - Get products with price less than 3000
export const productLessThan3000 = async (req,res)=>{
  try {
    const {price}=req.query;
    const product = await productModel.findAll({
      include: [
        {
          model: userModel,
          attributes: ["firstName", "lastName", "email", "age", "phone"],
        },
      ],
      attributes: [
        "id",
        "title",
        "price",
        "description",
        "createdAt",
        "updatedAt",
      ],
      where : {price:{[Op.lt]: price}}
    })
    if(product){
      res.json({message:"Success",product})
    }else{
      console.log(product);
      res.json({message:"In-valid product",product})
    }
  } catch (error) {
    res.json({message:"Catch error",error})
  }
}
// - Get product with price in range 1000-2000
export const productInRange1000_2000 = async (req,res)=>{
  try {
    const {price1,price2}=req.query;
    const product = await productModel.findAll({
      include: [
        {
          model: userModel,
          attributes: ["firstName", "lastName", "email", "age", "phone"],
        },
      ],
      attributes: [
        "id",
        "title",
        "price",
        "description",
        "createdAt",
        "updatedAt",
      ],
      where : {[Op.and]:[{price:{[Op.gt]: price1}},
    {price:{[Op.lt]:price2}}]}
    })
    if(product){
      res.json({message:"Success",product})
    }else{
      console.log(product);
      res.json({message:"In-valid product",product})
    }
  } catch (error) {
    res.json({message:"Catch error",error})
  }
}
// - Get all products which their title contain a substring like ( pho) 
export const searshTitle = async (req,res)=>{
  try {
    const {title}=req.query;
    const product = await productModel.findAll({
      include: [
        {
          model: userModel,
          attributes: ["firstName", "lastName", "email", "age", "phone"],
        },
      ],
      attributes: [
        "id",
        "title",
        "price",
        "description",
        "createdAt",
        "updatedAt",
      ],
      where : {title:{[Op.like]:`%${title}%`}}
    })
    if(product){
      res.json({message:"Success",product})
    }else{
      console.log(product);
      res.json({message:"In-valid product",product})
    }
  } catch (error) {
    res.json({message:"Catch error",error})
  }
}
export const addProduct = async (req, res) => {
  try {
    const { title, desc, price, userID } = req.body;
    const product = await productModel.create({
      title,
      description: desc,
      price,
      UserId: userID,
    });
    res.json({ message: "Success", product });
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.update(req.body, {
      where: { id },
    });
    if (product) {
      res.json({ message: "Success", product });
    } else {
      res.json({ message: "In-valid product" });
    }
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.destroy({
      where: { id },
    });
    if (product) {
      res.json({ message: "Success", product });
    } else {
      res.json({ message: "In-valid product" });
    }
  } catch (error) {
    res.json({ message: "Catch error", error });
  }
};