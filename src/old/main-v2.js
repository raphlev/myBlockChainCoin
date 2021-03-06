// Create a blockchain and secure it with a Proof Of work Algorithm

const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0; // Not part of the transaction - incremented value for Proof Of Work
    }

    // calculated hash should start with 0 (length = difficulty) characters to add more 'difficulty' : this is caled Proof Of work - Required powered computer in real life. Hash value will be looped until value matches proof of work difficulty rule
    // calculated hash won't change if Block attribute value don't change - we cannot change any of the attribute value of the Block transaction. We need to add a dummy attribute that is incremented each time we calculate a new hash: nonce value is incremented

    calculateHash() {
         return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

let raphlevCoin = new Blockchain();
console.log('Mining block 1...');
raphlevCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));

console.log('Mining block 2...');
raphlevCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));