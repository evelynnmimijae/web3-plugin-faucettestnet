"use strict";
// src/utils/index.ts
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
exports.handleError = exports.provideFeedback = exports.handleUserRequest = exports.decryptData = exports.encryptData = void 0;
const database_1 = require("../database");
const faucet_1 = require("../faucet"); // Assuming this is where your requestEther function is located
const crypto_js_1 = __importDefault(require("crypto-js"));
// Encryption key
const ENCRYPTION_KEY = 'YOUR_SECURE_ENCRYPTION_KEY';
function encryptData(data) {
    return crypto_js_1.default.AES.encrypt(data, ENCRYPTION_KEY).toString();
}
exports.encryptData = encryptData;
function decryptData(encryptedData) {
    const bytes = crypto_js_1.default.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
}
exports.decryptData = decryptData;
function handleUserRequest(userId, requestDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the address has already claimed within the last 24 hours
        const hasClaimed = yield (0, database_1.hasaddressClaimed)(userId);
        if (hasClaimed) {
            // Provide feedback that the address has already claimed
            provideFeedback(userId, 'You have already claimed Ether within the last 24 hours.');
            return;
        }
        // Assuming requestDetails contains the amount of Ether to send
        const amount = requestDetails.amount;
        // Send Ether to the address
        try {
            yield (0, faucet_1.requestEther)(userId, amount);
            // Update the claim record in the database
            yield (0, database_1.updateClaimRecord)(userId, { amount, claimed: true });
            // Provide feedback that the claim was successful
            provideFeedback(userId, 'Your claim was successful.');
        }
        catch (error) {
            // Handle any errors that occur during the process
            handleError(error);
        }
    });
}
exports.handleUserRequest = handleUserRequest;
function provideFeedback(userId, message) {
    // Implement logic to provide feedback to the user
    // This could involve sending a message to the user's email, displaying a notification, etc.
    console.log(`Feedback for ${userId}: ${message}`);
}
exports.provideFeedback = provideFeedback;
function handleError(error) {
    // Implement error handling logic
    // This could involve logging the error, sending an error report, etc.
    console.error(`Error handling user request: ${error.message}`);
}
exports.handleError = handleError;
