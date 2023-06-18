const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

const avatarDir = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email)
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

  res.status(201).json({
    password: newUser.password,
    email: newUser.email,
    avatar: newUser.avatar
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401);
  }
  const {_id: id} = user;
  const payload = {
    id
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, {token});
  res.json({
    token,
  });
};

const getCurrent = async(req, res)=> {
  const {email, password} = req.user;

  res.json({
    email,
    password
      
  })
}

const logout = async(req, res)=> {
  const {_id} = req.user;
  
  await User.findByIdAndUpdate(_id, {token: ""});

  res.json({
      message: "Logout success"
  })
}

const avatar = async (req, res) => {
  const { _id } = req.user;
  
  const { path: oldPath, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(oldPath, resultUpload);

  const avatarURL = path.join("avatars", filename);

  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250).writeAsync(resultUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
}


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout:ctrlWrapper(logout),
  avatar:ctrlWrapper(avatar)
};
