// src/test/index.test.ts

import { Web3 } from 'web3';
import { FaucetPlugin } from '../src/FaucetPlugin';
import mockAxios from 'jest-mock-axios';

// Define mock variables with the 'mock' prefix to avoid hoisting issues
const mockPost = jest.fn();

// Use the mock variables in the jest.mock() call
jest.mock('axios', () => ({
 post: mockPost,
}));

describe('FaucetPlugin Tests', () => {
 let web3: Web3;
 let faucetPlugin: FaucetPlugin;

 beforeAll(() => {
    web3 = new Web3('http://127.0.0.1:8545');
    faucetPlugin = new FaucetPlugin();
 });

 it('should register FaucetPlugin plugin on Web3 instance', () => {
    web3.registerPlugin(faucetPlugin);
    expect((web3 as any).faucetPlugin).toBeDefined();
 });

 describe('FaucetPlugin method tests', () => {
    it('should send Ether to a user', async () => {
      const toAddress = '0x123...';
      const amount = 0.1;

      // Use the mock variable directly in your test
      mockPost.mockResolvedValue({ data: { success: true } });

      await faucetPlugin.requestEther(toAddress, amount);

      expect(mockPost).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    });

    it('should handle errors when sending a transaction', async () => {
      const toAddress = '0x123...';
      const amount = 0.1;

      mockPost.mockRejectedValue(new Error('Network error'));

      await expect(faucetPlugin.requestEther(toAddress, amount)).rejects.toThrow('Network error');
    });

    it('should validate request details', async () => {
      const toAddress = '0x123...';
      const amount = -0.1;

      await expect(faucetPlugin.requestEther(toAddress, amount)).rejects.toThrow('Invalid amount');
    });
 });
});
