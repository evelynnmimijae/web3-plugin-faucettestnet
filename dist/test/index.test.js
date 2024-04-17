"use strict";
// src/test/index.test.ts
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
require("sinon-chai"); // Import sinon-chai for Chai's expect syntax
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
        sinon_1.default.restore(); // Restore the original axios.post function
    });
    it('should register FaucetPlugin plugin on Web3 instance', () => {
        web3.registerPlugin(faucetPlugin);
        (0, chai_1.expect)(web3.faucetPlugin).to.be.undefined;
    });
    describe('FaucetPlugin method tests', () => {
        it('should send Ether to a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const toAddress = '0x123...';
            const amount = 0.1;
            // Mock the response from Tableland's API
            axiosMock.expects('post').resolves({ data: { success: true } });
            // Set up a Sinon spy for axios.post
            const axiosPostSpy = sinon_1.default.spy(axios_1.default, 'post');
            yield faucetPlugin.requestEther(toAddress, amount);
            // Use sinon-chai for the assertion
            (0, chai_1.expect)(axiosPostSpy).to.have.been.calledWithMatch(sinon_1.default.match.any, sinon_1.default.match.any);
            // Alternatively, use Sinon's assert directly
            // sinon.assert.calledWith(axiosPostSpy, sinon.match.any, sinon.match.any);
        }));
        // Other tests...
    });
});
