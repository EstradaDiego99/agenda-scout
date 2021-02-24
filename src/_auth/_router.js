const router = require("express").Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.route("/").post(async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(410).json({ msg: "Token no existente" });
  try {
    const jwtVerification = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ jwtVerification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
