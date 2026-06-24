import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripr = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for saffrona frontend
const placeOrder = async (req, res) => {

  const forntendUrl = "http://localhost:5173"
  
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address:req.body.address
    })
    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })
    
    const lineItems = req.body.items.map((item) => ({
      priceData: {
        currency: "usd",
          productData: {
          name:item.name
        },
        unitAmount: item.price,
      },
      quantity:item.quantity
    }))

    lineItems.push({
      priceData: {
        currency: "usd",
        productData: {
          name:"Delivery Charges"
        },
        unitAmount:2
      },
      quantity:1
    })

    const session = await stripr.checkout.sessions.create({
      lineItems: lineItems,
      mode: "payment",
      successUrl:`${forntendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancelUrl:`${forntendUrl}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({success:true, sessionUrl: session.url})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
  }
}


export {placeOrder}