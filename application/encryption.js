const crypto = require("crypto");
const logger = require("./logger")

const algorithm = "aes-256-gcm" // strong modern algorithm
const ivLength = 16; // AES block size

function encrypt(text) {
    const key = process.env.ENCRYPTION_KEY
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    
    encrypted += cipher.final("hex");
    
    const authTag = cipher.getAuthTag().toString("hex");
    
    return iv.toString("hex") + ":" + authTag + ":" + encrypted; // store IV + tag + ciphertext
}

function decrypt(encrypted) {
    const key = process.env.ENCRYPTION_KEY
    const [ivHex, authTagHex, data] = encrypted.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "hex"), iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(data, "hex", "utf8");
    
    decrypted += decipher.final("utf8");
    
    return decrypted;
}

module.exports = { encrypt, decrypt };
