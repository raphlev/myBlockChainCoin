/**
 * By executing this class you get public & private keys. puiblic key can be calculated from private key
 * 
 * Your public key (also your wallet address, freely shareable)
 0403a82bacce63845b59051102db86d3b0fb3958ecb175bead6d41900b3afc91469807c5426e5255a4278da61c47898e2910db752925eb5c34cdca5859824ddc4f
 *
 * Your private key (keep this secret! To sign transactions)
 a5c247b6881a7e842215d7b8332e5c0c6e4268de6c0abffcef41f94d4d4b8ea4
 * 
 * 
 */
const EC = require('elliptic').ec;

// You can use any elliptic curve you want
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
console.log();
console.log('Your public key (also your wallet address, freely shareable)\n', publicKey);

console.log();
console.log('Your private key (keep this secret! To sign transactions)\n', privateKey);
