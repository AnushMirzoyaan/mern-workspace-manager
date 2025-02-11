import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
  console.log("Middleware is running...");

  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Log the token to check if it's a string (not a Promise)
  console.log("Token received:", token);

  if (!token) {
    console.log("No token found, access denied!");
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    // Ensure the token is properly formatted before trying to verify it
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    console.log("Decoded token:", decoded); // Log the decoded token info
    req.user = decoded; // Add the decoded token (e.g., user info) to the request object
    next(); // Continue with the next middleware or route handler
  } catch (err) {
    console.log("Token verification failed:", err);
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
