import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/db.js';
import foodRouter from './src/routes/foodRoute.js';
import userRouter from './src/routes/userRoute.js';
import cartRouter from './src/routes/cartRoute.js';
import orderRoute from './src/routes/orderRoute.js';

// ----------- app config -------------
const app = express();
const port = process.env.PORT || 4000;

// ----------- middleware -------------
app.use(express.json());

// ------------- CORS Configuration ---------
app.use(
  cors({
    origin: [
      'https://saffrona.netlify.app',
      'https://saffrona-admin.netlify.app',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  }),
);

// ------- DB connection ----------
connectDB();

// -------- api endPoints ----------
app.use('/api/food', foodRouter);
app.use('/images', express.static('src/uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRoute);

// ------- root api -----------
app.get('/', (req, res) => {
  res.send('API Working');
});

// ------ starting server ---------
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
