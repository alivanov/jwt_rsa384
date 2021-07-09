const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToPrivKey = path.join(__dirname, './id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

const pathToPubKey = path.join(__dirname, './id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": Math.round(Date.now() / 1000)
};

const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: '1h',
    algorithm: 'RS384',
});

console.log(signedToken)

console.log('//==============================================')

const verified = jsonwebtoken.verify(signedToken, PUB_KEY, { ignoreExpiration: false });

console.log(verified)

console.log('//==============================================')

const decoded = jsonwebtoken.decode(signedToken, { complete: true });

console.log(decoded)