const { Transaction, Block, Blockchain } = require('../src/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const signingKey = ec.keyFromPrivate('a5c247b6881a7e842215d7b8332e5c0c6e4268de6c0abffcef41f94d4d4b8ea4'); // private key generated with keygenerator.js

function createSignedTx(){
	const txObject = new Transaction(signingKey.getPublic('hex'), 'wallet2', 10);
    txObject.timestamp = 1;
    txObject.signTransaction(signingKey);

    return txObject;
}

function createBlockchainWithTx(){
	const blockchain = new Blockchain();
	const walletAddr = signingKey.getPublic('hex');
	const validTx = new Transaction(walletAddr, 'b2', 10);
	validTx.signTransaction(signingKey);

	blockchain.addTransaction(validTx);
	blockchain.addTransaction(validTx);
	blockchain.minePendingTransactions(1);

	return blockchain;
}

module.exports.signingKey = signingKey;
module.exports.createSignedTx = createSignedTx;
module.exports.createBlockchainWithTx = createBlockchainWithTx;
