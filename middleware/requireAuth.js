import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  console.log('In middleware');
  next();
};

export default requireAuth;
