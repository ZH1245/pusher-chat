const UserModel = require("../models/User.model");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserController = {
  createUser: async (req, res) => {
    try {
      const { password, fname, lname, email } = req.body;
      var salt = await bcrypt.genSalt(Number(process.env.SALT));
      var hashed = await bcrypt.hash(data.password, salt);
      let user = await new UserModel({
        lname,
        email,
        fname,
        password: hashed,
      });
      await user.save();
      res.json("User Created");
    } catch (e) {
      res.status(400).json(e);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { password, email } = req.body;
      let user = await UserModel.findOne({ email: email });
      if (!user) {
        res.status(404).json("NOT FOUND");
      }
      const token = await jsonwebtoken.sign(user, "pusher");
      res.json(token);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};
