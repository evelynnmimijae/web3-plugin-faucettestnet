"use strict";
// src/smartContracts/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContractTransaction = exports.callContractMethod = void 0;
const web3_1 = __importDefault(require("web3"));
const config_1 = require("../config");
const web3 = new web3_1.default(config_1.ethereumConfig.network);
function callContractMethod(contractAddress, abi, methodName, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new web3.eth.Contract(abi, contractAddress);
        const result = yield contract.methods[methodName](...args).call();
        return result;
    });
}
exports.callContractMethod = callContractMethod;
function sendContractTransaction(contractAddress, abi, methodName, args, fromAddress, privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new web3.eth.Contract(abi, contractAddress);
        // Create a transaction object
        const transaction = contract.methods[methodName](...args);
        // Estimate gas required for the transaction
        const gas = yield transaction.estimateGas({ from: fromAddress });
        // Get the current transaction count for the provided address (nonce)
        const nonce = yield web3.eth.getTransactionCount(fromAddress, 'latest');
        // Sign the transaction with the private key
        const signedTx = yield web3.eth.accounts.signTransaction({
            to: contractAddress,
            data: transaction.encodeABI(),
            gas,
            nonce,
        }, privateKey);
        // Send the signed transaction
        const receipt = yield web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    });
}
exports.sendContractTransaction = sendContractTransaction;
