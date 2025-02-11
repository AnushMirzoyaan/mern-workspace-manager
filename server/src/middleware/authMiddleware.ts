import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token received:", token);

  if (!token) {
    console.log("No token found, access denied!");
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed:", err);
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
