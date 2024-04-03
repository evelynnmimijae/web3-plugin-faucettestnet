"use strict";
// src/faucet/index.ts
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
exports.requestEther = void 0;
const database_1 = require("../database");
const ethereum_1 = require("../ethereum");
function requestEther(address, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simple validation
        if (!address || !amount || amount <= 0) {
            console.error('Invalid request: address or amount is missing or invalid.');
            return;
        }
        const hasClaimed = yield (0, database_1.checkAddressInTableland)(address);
        if (hasClaimed) {
            console.log('Address has already claimed Ether.');
            return;
        }
        yield (0, ethereum_1.sendEther)(address, amount);
        yield (0, database_1.updateTablelandRecord)(address);
        console.log('Ether sent and Tableland record updated.');
    });
}
exports.requestEther = requestEther;
