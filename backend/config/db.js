import mongoose from 'mongoose';

const getConnection = async () => {
 try {
  await mongoose.connect(process.env.MONGODB_URL, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
  });
  console.log('Connection to DB Successful');
 } catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1); //passing 1 - will exit the proccess with error
 }
};

export default getConnection;
