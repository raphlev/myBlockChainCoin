// Create a blockchain and secure it with a Proof Of work Algorithm and make a simple currency: enable multiple transaction on Block, and add rewards for miners. Crypto-currency requires new coins. Miner reward introduce new coins in the system

const SHA256 = require("crypto-js/sha256");

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

// Here a Block is a Transaction with 2 addresses and an amount
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0; // Not part of the transaction - incremented value for Proof Of Work
    }

    // calculated hash should start with 0 (length = difficulty) characters to add more 'difficulty' : this is caled Proof Of work - Required powered computer in real life. Hash value will be looped until value matches proof of work difficulty rule
    // calculated hash won't change if Block attribute value don't change - we cannot change any of the attribute value of the Block transaction. We need to add a dummy attribute that is incremented each time we calculate a new hash: nonce value is incremented

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}

// Blockchain should contains an array of pending transactions because miners will generate a new Block every 10 minutes (for bitcoin)

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse("2017-01-01"), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
               
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        // Reinitialize PendingTransactions array - adding the reward after for next transactions Block mining... The liner will not be rewarded within current block mining
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];

    
    }

    // new Transaction are added in pending transactions array
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

console.log('\n New Blockchain...');
let raphlevCoin = new Blockchain();
console.log(JSON.stringify(raphlevCoin, null, 4));
raphlevCoin.createTransaction(new Transaction('address1', 'address2', 100));
console.log('\n Create first transaction address1 to address2');
console.log(JSON.stringify(raphlevCoin, null, 4));
raphlevCoin.createTransaction(new Transaction('address2', 'address1', 50));
console.log('\n Create Second transaction address2 to address1');
console.log(JSON.stringify(raphlevCoin, null, 4));
console.log('\n Starting the miner...');
raphlevCoin.minePendingTransactions('raphaels-address');
console.log(JSON.stringify(raphlevCoin, null, 4));
console.log('\nBalance of raphael is', raphlevCoin.getBalanceOfAddress('raphaels-address'));

console.log('\n Starting the miner again...');
raphlevCoin.minePendingTransactions('raphaels-address');
console.log(JSON.stringify(raphlevCoin, null, 4));
console.log('\nBalance of raphael is', raphlevCoin.getBalanceOfAddress('raphaels-address'));
