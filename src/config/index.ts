import dotenv from 'dotenv';
dotenv.config();

export const ethereumConfig = {
  network: process.env.ETH_NETWORK || 'https://eth-sepolia.public.blastapi.io', // Example network
  privateKey: process.env.PRIVATE_KEY,
  gasPrice: parseInt(process.env.GAS_PRICE || '20'), // Example gas price
  gasLimit: parseInt(process.env.GAS_LIMIT || '21000'), // Example gas limit
  defaultEtherAmount: parseFloat(process.env.DEFAULT_ETHER_AMOUNT || '0.1'),
};

export const tablelandConfig = {
  apiKey: process.env.API_KEY,
  databaseId: process.env.DATABASE_ID,
  tableId: process.env.TABLE_ID,
};

export const faucetRules = {
  ethDistributionAmount: parseFloat(process.env.ETH_DISTRIBUTION_AMOUNT || '0.1'), // Amount of Ether distributed per request
  eligibilityCriteria: {
    // Define criteria for eligibility
    minBalance: parseFloat(process.env.MIN_BALANCE || '0.01'), // Example: Minimum balance required
    maxRequestsPerDay: parseInt(process.env.MAX_REQUESTS_PER_DAY || '3'), // Example: Maximum number of requests per day
  },
};
