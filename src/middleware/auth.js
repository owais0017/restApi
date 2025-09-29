import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth = (req, res, next) => {
  // Get token from the 'Authorization' header
  const authHeader = req.header('Authorization');

  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

export default auth;