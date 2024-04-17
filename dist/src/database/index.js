"use strict";
// src/database/index.ts
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
exports.updateTablelandRecord = exports.updateClaimRecord = exports.hasaddressClaimed = exports.getRequests = exports.storeRequest = exports.checkAddressInTableland = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
function checkAddressInTableland(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.tableland.com/v1/your-table-id/${address}`, {
                headers: {
                    'Authorization': 'Bearer YOUR_TABLELAND_API_KEY'
                }
            });
            return response.data.claimed;
        }
        catch (error) {
            console.error('Error checking address in Tableland:', error);
            return false;
        }
    });
}
exports.checkAddressInTableland = checkAddressInTableland;
function storeRequest(userId, requestDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`https://api.tableland.com/v1/databases/${config_1.tablelandConfig.databaseId}/documents`, {
            userId,
            requestDetails,
        }, {
            headers: {
                'Authorization': `Bearer ${config_1.tablelandConfig.apiKey}`,
            },
        });
        return response.data;
    });
}
exports.storeRequest = storeRequest;
function getRequests(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.tableland.com/v1/databases/${config_1.tablelandConfig.databaseId}/documents?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${config_1.tablelandConfig.apiKey}`,
            },
        });
        return response.data;
    });
}
exports.getRequests = getRequests;
function hasaddressClaimed(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.tableland.com/v1/databases/${config_1.tablelandConfig.databaseId}/documents?userId=${userId}`, {
            headers: {
                'Authorization': `Bearer ${config_1.tablelandConfig.apiKey}`,
            },
        });
        const claims = response.data;
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        for (const claim of claims) {
            const claimDate = new Date(claim.claimDate);
            if (claimDate > twentyFourHoursAgo) {
                return true;
            }
        }
        return false;
    });
}
exports.hasaddressClaimed = hasaddressClaimed;
function updateClaimRecord(userId, claimDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`https://api.tableland.com/v1/databases/${config_1.tablelandConfig.databaseId}/documents`, {
            userId,
            claimDetails,
            claimDate: new Date().toISOString(),
        }, {
            headers: {
                'Authorization': `Bearer ${config_1.tablelandConfig.apiKey}`,
            },
        });
        return response.data;
    });
}
exports.updateClaimRecord = updateClaimRecord;
function updateTablelandRecord(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.post('https://api.tableland.com/v1/your-table-id', {
                address: address,
                claimed: true
            }, {
                headers: {
                    'Authorization': 'Bearer YOUR_TABLELAND_API_KEY'
                }
            });
            console.log('Address updated in Tableland:', address);
        }
        catch (error) {
            console.error('Error updating Tableland record:', error);
        }
    });
}
exports.updateTablelandRecord = updateTablelandRecord;
