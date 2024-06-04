
const crypto = require('crypto');

const cryptoSkywalker = {
    encrypt: (text, key) => {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    },
    decrypt: (encryptedText, key) => {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedTextBuffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    },
    hashPassword: (password) => {
        return crypto.createHash('sha256').update(password).digest('hex');
    },
    generateRandomValue: () => {
        return crypto.randomBytes(32).toString('hex');
    }
};

// Example usage
const secretMessage = 'Hello, this is a secret message!';
const secretKey = 'mySecretKey';

const encryptedMessage = cryptoSkywalker.encrypt(secretMessage, secretKey);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = cryptoSkywalker.decrypt(encryptedMessage, secretKey);
console.log('Decrypted Message:', decryptedMessage);

const hashedPassword = cryptoSkywalker.hashPassword('mySuperSecretPassword');
console.log('Hashed Password:', hashedPassword);

const randomValue = cryptoSkywalker.generateRandomValue();
console.log('Secure Random Value:', randomValue);
