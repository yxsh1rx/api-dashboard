const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1h'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d'
    });
    return { accessToken, refreshToken };
  }

  async save(userId, refreshToken) {
    try {
      const token = await Token.findOne({ user: userId });
      if (token) {
        token.refreshToken = refreshToken;
        return token.save();
      }
      const newToken = await Token.create({ user: userId, refreshToken });
      return newToken;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(refreshToken) {
    const deletedToken = await Token.deleteOne({ refreshToken });
    return deletedToken;
  }

  validateAccess(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  validateRefresh(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }

  async find(refreshToken) {
    try {
      const token = await Token.findOne({ refreshToken });
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TokenService();
