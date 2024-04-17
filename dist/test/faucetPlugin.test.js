"use strict";
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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const web3_1 = require("web3");
const FaucetPlugin_1 = require("../src/FaucetPlugin");
const axios_1 = __importDefault(require("axios"));
// Use sinon to mock axios
const axiosMock = sinon_1.default.mock(axios_1.default);
describe('FaucetPlugin Tests', () => {
    let web3;
    let faucetPlugin;
    before(() => {
        web3 = new web3_1.Web3('http://127.0.0.1:8545');
        faucetPlugin = new FaucetPlugin_1.FaucetPlugin();
    });
    afterEach(() => {
        // Restore the original behavior of axios after each test
        axiosMock.restore();
    });
    it('should register FaucetPlugin plugin on Web3 instance', () => {
        web3.registerPlugin(faucetPlugin);
        (0, chai_1.expect)(web3.faucetPlugin).to.be.defined;
    });
    it('should send Ether to a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const toAddress = '0x123...';
        const amount = 0.1;
        // Mock the response from Tableland's API
        axiosMock.expects('post').resolves({ data: { success: true } });
        yield faucetPlugin.requestEther(toAddress, amount);
        (0, chai_1.expect)(axios_1.default.post).to.have.been.calledWith(sinon_1.default.match.any, sinon_1.default.match.any);
    }));
    it('should handle errors when sending a transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const toAddress = '0x123...';
        const amount = 0.1;
        axiosMock.expects('post').rejects(new Error('Network error'));
        yield (0, chai_1.expect)(faucetPlugin.requestEther(toAddress, amount)).to.be.rejectedWith('Network error');
    }));
    it('should validate request details', () => __awaiter(void 0, void 0, void 0, function* () {
        const toAddress = '0x123...';
        const amount = -0.1;
        yield (0, chai_1.expect)(faucetPlugin.requestEther(toAddress, amount)).to.be.rejectedWith('Invalid amount');
    }));
    // Add more tests as needed to cover different scenarios and edge cases
});
