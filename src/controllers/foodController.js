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

// all food list 
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({success: true, data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false, message: "Error! Can't get food list."})
  }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`src/uploads/${food.image}`, () => { })
    
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true, message: "Food removed successfully!"})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error to remove food"})
  }
}

export {addFood, listFood, removeFood}