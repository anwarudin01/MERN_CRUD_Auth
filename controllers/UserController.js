import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const signup = async (req, res) => {
  try {
    // Get email, password & gender from body
    const { email, password, gender } = req.body;

    // Hash password
    const hasedPassword = bcrypt.hashSync(password, 8);

    // Create user
    await User.create({ email, password: hasedPassword, gender });

    // Respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const login = async (req, res) => {
  // Get email, password from body
  const { email, password } = req.body;

  // Find the user with requested email
  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  // Compare sent in password with found user password hash
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return res.sendStatus(401);

  // create a jwt token
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const token = jwt.sign({ sub: user._id, exp }, 'notUseDotEnv');

  // Set the cookie
  //   res.cookie('Authorization', token, {
  //     expires: new Date(exp),
  //     httpOnly: true,
  //     sameSite: 'lax',
  //     secure: false,
  //   });

  // send it
  res.json({ token });
};
export const logout = (req, res) => {};

export const checkAuth = (req, res) => {
  res.sendStatus(200);
};
