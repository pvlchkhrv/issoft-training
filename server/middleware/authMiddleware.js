import jwt from 'jsonwebtoken';
import secret from '../config.js';

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return res.status(403).json({message: 'Authorization failed!'});
    }
    const decoded = jwt.verify(token, secret.key);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({message: 'Authorization failed!'});
  }
}
