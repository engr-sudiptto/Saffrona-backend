import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB  from './src/config/db.js';
import foodRouter from './src/routes/foodRoute.js';
import userRouter from './src/routes/userRoute.js';
import cartRouter from './src/routes/cartRoute.js';




// app config
const app = express()
const port = 4000



// middleware
app.use(express.json())
app.use(cors())

// DB connection 
connectDB();


// api endPoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('src/uploads'))
app.use("/api/user", userRouter)
app.use('/api/cart', cartRouter)


app.get('/', (req, res) => {
  res.send('API Working')
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})