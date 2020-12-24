import dotenv from 'dotenv';
import express from 'express';
import { auth } from 'express-openid-connect';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import getConnection from './config/db.js';
import categoryRoute from './routes/categoryRoute.js';
import orderRoute from './routes/orderRoute.js';
import productRoute from './routes/productRoute.js';
import uploadRoute from './routes/uploadRoute.js';
import userRoute from './routes/userRoute.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

getConnection();

// load app middleware
const app = express();

// log only 4xx and 5xx responses to console
app.use(
 morgan('dev', {
  skip: function (req, res) {
   return res.statusCode < 400;
  },
 })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(
 auth({
  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  secret: process.env.SECRET,
 })
);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, '../client/build'))); // location of static files.
 app.get(
  '*',
  (req, res) =>
   res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html')) // location of index.html
 );
} else {
 app.get('/', (req, res) => {
  res.send('Data is Loading....');
 });
}

const PORT = process.env.PORT || 5000;
// establish http server connection
app.listen(PORT, () => {
 console.log(`Server started on port ${PORT}`);
});
