import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item
const addFood = async (req, res) => {
  let imageFileName = `${req.file.filename}`;
  
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageFileName
  });

  try {
    await food.save()
    res.json({success:true, message:"Food Added Successfully!"})
  } catch (error) {
    console.log(error)
    req.json({success:false, message:"Error! Can't add food."})
  }

}

export {addFood}