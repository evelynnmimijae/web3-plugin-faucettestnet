"use strict";
// src/ethereum/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = exports.sendEther = void 0;
const config_1 = require("../config");
const web3Instance_1 = require("./web3Instance");
// Use the Web3 instance initialized in web3Instance.ts
const web3 = (0, web3Instance_1.initializeWeb3)();
function sendEther(toAddress_1) {
    return __awaiter(this, arguments, void 0, function* (toAddress, amount = config_1.ethereumConfig.defaultEtherAmount) {
        const accounts = yield web3.eth.getAccounts();
        const faucetAddress = accounts[0];
        // Automatically set the gas price
        const gasPrice = yield web3.eth.getGasPrice();
        // Estimate the gas limit for the transaction
        const gasLimit = yield web3.eth.estimateGas({
            from: faucetAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
        });
        const transaction = {
            from: faucetAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: gasLimit,
            gasPrice: gasPrice,
        };
        try {
            const receipt = yield web3.eth.sendTransaction(transaction);
            console.log('Transaction receipt:', receipt);
        }
        catch (error) {
            console.error('Error sending Ether:', error);
        }
    });
}
exports.sendEther = sendEther;
function sendTransaction(to_1) {
    return __awaiter(this, arguments, void 0, function* (to, amount = config_1.ethereumConfig.defaultEtherAmount) {
        const { privateKey } = config_1.ethereumConfig;
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        // Automatically set the gas price
        const gasPrice = yield web3.eth.getGasPrice();
        // Estimate the gas limit for the transaction
        const gasLimit = yield web3.eth.estimateGas({
            from: account.address,
            to,
            value: web3.utils.toWei(amount.toString(), 'ether'),
        });
        const tx = {
            from: account.address,
            to,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: gasLimit,
            gasPrice: gasPrice,
        };
        const signedTx = yield web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = yield web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    });
}
exports.sendTransaction = sendTransaction;
