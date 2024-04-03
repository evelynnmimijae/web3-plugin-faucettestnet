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
exports.callContractMethod = void 0;
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
