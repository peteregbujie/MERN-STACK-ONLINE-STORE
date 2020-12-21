import jwt from 'jsonwebtoken';

const getToken = (user) => {
 return jwt.sign(
  {
   id: user._id,
   name: user.name,
   email: user.email,
   isAdmin: user.isAdmin,
  },
  process.env.JWT_SECRET,
  {
   expiresIn: 86400, // expires in 24 hours
  }
 );
};

const AuthenticateUser = async (req, res, next) => {
 try {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); //

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = decodedToken;
  req.user = user;
  next();
 } catch (error) {
  return res.status(500).json({ msg: error.message });
 }
};

const isAdmin = (req, res, next) => {
 if (req.user.isAdmin) {
  next();
 } else {
  res.status(403).send({ message: 'Not an Admin' });
 }
};

export { getToken, AuthenticateUser, isAdmin };
