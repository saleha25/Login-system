const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const secretKey = crypto
  .createHash("sha256")
  .update("mysecretkey")
  .digest();
const iv = Buffer.alloc(16, 0);
const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
module.exports = {
  encrypt,
  decrypt,
};