const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('a5c247b6881a7e842215d7b8332e5c0c6e4268de6c0abffcef41f94d4d4b8ea4'); // private key generated with keygenerator.js

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');
console.log('myWalletAddress is equal to Pubilc key : ', myWalletAddress); // the public key can be calculated because ec object contains the private key

// Create new instance of Blockchain class
const raphlevCoin = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
raphlevCoin.addTransaction(tx1);

// Mine block
raphlevCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
raphlevCoin.addTransaction(tx2);

// Mine block
raphlevCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of raphlev is ${raphlevCoin.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// raphlevCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', raphlevCoin.isChainValid() ? 'Yes' : 'No');
