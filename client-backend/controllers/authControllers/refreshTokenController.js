const jwt = require("jsonwebtoken");
const User = require("../../models/User");
// const redisClient = require("../../config/redisClient");

const handleRefreshToken = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.clientCookie) return res.sendStatus(401);

    const refreshToken = cookie.clientCookie;
    const user = await User.findOne({ refreshToken }).lean().exec();
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || user.personalInfo.email !== decoded.userInfo.email) {
          return res.sendStatus(403);
        }

        // Check session ID in Redis
        const sessionIdInRedis = await redisClient.get(`session:${user._id}`);
        if (
          !sessionIdInRedis ||
          sessionIdInRedis !== decoded.userInfo.sessionId
        ) {
          return res
            .status(403)
            .json({ message: "Session expired. Please log in again." });
        }

        const accessToken = jwt.sign(
          {
            userInfo: {
              email: decoded.userInfo.email,
              role: user.role,
              sessionId: decoded.userInfo.sessionId,
              userId: user._id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        delete user.refreshToken;
        delete user.credentials.password;
        delete user.updatedAt;

        res.json({
          accessToken,
          user,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = handleRefreshToken;
