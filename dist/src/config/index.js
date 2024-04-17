"use strict";
// src/config/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.faucetRules = exports.tablelandConfig = exports.ethereumConfig = void 0;
// import dotenv from 'dotenv';
// dotenv.config();
exports.ethereumConfig = {
    network: 'https://eth-sepolia.public.blastapi.io', // Example network
    privateKey: process.env.PRIVATE_KEY,
    gasPrice: 20, // Example gas price
    gasLimit: 21000, // Example gas limit
    defaultEtherAmount: 0.1,
};
exports.tablelandConfig = {
    apiKey: process.env.API_KEY,
    databaseId: process.env.DATABASE_ID,
};
exports.faucetRules = {
    ethDistributionAmount: 0.1, // Amount of Ether distributed per request
    eligibilityCriteria: {
        // Define criteria for eligibility
        minBalance: 0.01, // Example: Minimum balance required
        maxRequestsPerDay: 3, // Example: Maximum number of requests per day
    },
};
