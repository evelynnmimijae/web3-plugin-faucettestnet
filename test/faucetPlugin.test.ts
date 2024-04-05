import { expect } from 'chai';
import sinon from 'sinon';
import { Web3 } from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin';
import axios from 'axios';

// Extend the Web3 type to include the faucetPlugin property
declare module 'web3' {
 interface Web3 {
    faucetPlugin: FaucetPlugin;
 }
}

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
 });

 it('should register FaucetPlugin plugin on Web3 instance', () => {
    web3.registerPlugin(faucetPlugin);
    expect(web3.faucetPlugin).to.be.defined;
 });

 it('should send Ether to a user', async () => {
    const toAddress = '0x123...';
    const amount = 0.1;

    // Mock the response from Tableland's API
    axiosMock.expects('post').resolves({ data: { success: true } });

    await faucetPlugin.requestEther(toAddress, amount);

    expect(axios.post).to.have.been.calledWith(sinon.match.any, sinon.match.any);
 });

 it('should handle errors when sending a transaction', async () => {
    const toAddress = '0x123...';
    const amount = 0.1;

    axiosMock.expects('post').rejects(new Error('Network error'));

    await expect(faucetPlugin.requestEther(toAddress, amount)).to.be.rejectedWith('Network error');
 });

 it('should validate request details', async () => {
    const toAddress = '0x123...';
    const amount = -0.1;

    await expect(faucetPlugin.requestEther(toAddress, amount)).to.be.rejectedWith('Invalid amount');
 });

 // Add more tests as needed to cover different scenarios and edge cases
});
