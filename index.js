// Set dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import ProductRoute from './routes/ProductRoute.js';
import UserRoute from './routes/UserRoute.js';
import requireAuth from './middleware/requireAuth.js';

const app = express();

// Connect to mongodb database
mongoose.connect('mongodb://anwarudin:closeup123@localhost:27017/mern_crud_auth?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

// Configure express app
app.use(cors());
app.use(express.json());
// app.use(cookieParser);
app.use(ProductRoute);
app.use(UserRoute);

// Run the server
app.listen(5000, () => console.log('Server up and running...'));
