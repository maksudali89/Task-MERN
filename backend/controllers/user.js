import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export async function HandlerForUserSignUp(req, res) {
  try {
    const { userName, email, phone, password } = req.body;
    const exitingUser = await User.findOne({ email });

    if (exitingUser) {
      return res
        .status(404)
        .json({ message: "User  Already Exits ! " });
    }
    const hashedPas = await bcryptjs.hash(password, 10);
    const user = await User.create({
      username: userName,
      email,
      phone,
      password: hashedPas,
    });

    res
      .status(200)
      .json({ message: "User Account Created Successfully", data: user });
  } catch (error) {
    console.log(error);
  }
}

export async function HandlerForUserLogin(req, res) {
  const { email, password } = await req.body;
  const exitsUser = await User.findOne({ email });
  if (!exitsUser) {
    return res
      .status(400)
      .json({ message: "Please Create  Account Than Login" });
  }

  bcryptjs.compare(password, exitsUser.password, (err, result) => {
    if (err) {
      res.status(400).json({ message: "Invalid PassWord" });
    }
    const token = jwt.sign(
      {
        email: exitsUser.email,
        id: exitsUser._id,
        username: exitsUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    res.status(200).json({
      message: "User Login SuccessFully",
      token: token,
      id: exitsUser._id,
    });
  });
}
