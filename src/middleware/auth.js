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
    // The header format is "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user payload from the token to the request object
    req.user = decoded.user;
    next(); // Move on to the next function in the chain
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

export default auth;