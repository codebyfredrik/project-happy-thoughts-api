import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import compression from 'compression';
import logger from 'morgan';
import { errors } from 'celebrate';
import Routes from './routes/index';
import Thought from './models/thought';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/happyThoughts';

try {
  mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (error) {
  console.log(error);
}

mongoose.Promise = Promise;

if (process.env.RESET_DB === 'true') {
  const resetDatabase = async () => {
    await Thought.deleteMany();
  };
  resetDatabase();
  console.log('Database cleared!');
}

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
