// packages
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cloudinary from 'cloudinary';
import bodyParser from 'body-parser';

// modules
import { connectDB } from './config/connectDB.js';
import { env } from './constants.js';
import authRoutes from './routes/auth.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

// variables
const app = express();
const port = env.PORT;

// middlewares
config();
app.use(cookieParser());
cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_secret: env.CLOUDINARY_API_SECRET,
  api_key: env.CLOUDINARY_API_KEY,
});

app.use(
  cors({
    origin: [env.CLIENT_URI],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
  }),
);

app.use((_, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': env.CLIENT_URI,
  });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/gallery/', galleryRoutes);
app.use('/api/v1/dashboard/', dashboardRoutes);

// test route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Hello backend' });
});

// listening to the port
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`App started listening at ${port}`));
  } catch (error) {
    console.log('The error is', error);
  }
};

start();
