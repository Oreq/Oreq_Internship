const jwt = require('jsonwebtoken');
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const verifyAccessToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // ดึง token จาก header
  
  if (!token) {
    return res.status(401).send({ message: "Access token is required" });
  }

  jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid or expired token", error: err });
    }

    // หาก token ถูกต้อง ให้เก็บข้อมูลที่ decoded ลงใน req.user
    req.user = decoded; 
    next(); // เรียก next() เพื่อไปยัง handler ถัดไป
  });
};

module.exports = {verifyAccessToken};
