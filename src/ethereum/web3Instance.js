"use strict";
// src/ethereum/web3Instance.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWeb3 = exports.web3 = void 0;
var web3_1 = require("web3");
var config_1 = require("../config");
exports.web3 = new web3_1.default(config_1.ethereumConfig.network);
function initializeWeb3() {
    var web3 = new web3_1.default('https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID');
    return web3;
}
exports.initializeWeb3 = initializeWeb3;
