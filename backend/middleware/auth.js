import jwt from "jsonwebtoken";

export async function AuthMiddleware(req, res, next) {
  //   console.log(token);
  try {
    const token = req.headers.authorization?.split(" ")[1];
    //  console.log(token);
    if (!token) {
      res.status(402).json({ message: "Login Please" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) throw err;
      // console.log(result);
      req.user = result;
    });
    next();
    //  console.log(user);
    // res.status(200).json({message:"token recived SuccessFully"})
  } catch (error) {
    console.log(error);
  }
}
