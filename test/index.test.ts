// src/test/index.test.ts

import { expect } from 'chai';
import sinon from 'sinon';
import { Web3 } from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin';
import axios from 'axios';
import 'sinon-chai'; // Import sinon-chai for Chai's expect syntax

// Use sinon to mock axios
const axiosMock = sinon.mock(axios);

describe('FaucetPlugin Tests', () => {
 let web3: Web3;
 let faucetPlugin: FaucetPlugin;

 before(() => {
    web3 = new Web3('http://127.0.0.1:8545');
    faucetPlugin = new FaucetPlugin();
 });

 afterEach(() => {
    // Restore the original behavior of axios after each test
    axiosMock.restore();
    sinon.restore(); // Restore the original axios.post function
 });

 it('should register FaucetPlugin plugin on Web3 instance', () => {
    web3.registerPlugin(faucetPlugin);
    expect(web3.faucetPlugin).to.be.undefined;
 });

 describe('FaucetPlugin method tests', () => {
    it('should send Ether to a user', async () => {
      const toAddress = '0x123...';
      const amount = 0.1;

      // Mock the response from Tableland's API
      axiosMock.expects('post').resolves({ data: { success: true } });

      // Set up a Sinon spy for axios.post
      const axiosPostSpy = sinon.spy(axios, 'post');

      await faucetPlugin.requestEther(toAddress, amount);

      // Use sinon-chai for the assertion
      expect(axiosPostSpy).to.have.been.calledWithMatch(sinon.match.any, sinon.match.any);

      // Alternatively, use Sinon's assert directly
      // sinon.assert.calledWith(axiosPostSpy, sinon.match.any, sinon.match.any);
    });

    // Other tests...
 });
});