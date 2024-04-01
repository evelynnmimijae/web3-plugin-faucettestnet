// src/faucet/index.ts

import { checkAddressInTableland, updateTablelandRecord } from '../database';
import { sendEther } from '../ethereum';

export async function requestEther(address: string, amount: number): Promise<void> {
    // Simple validation
 if (!address || !amount || amount <= 0) {
   console.error('Invalid request: address or amount is missing or invalid.');
   return;
}

 const hasClaimed = await checkAddressInTableland(address);

 if (hasClaimed) {
    console.log('Address has already claimed Ether.');
    return;
 }

 await sendEther(address, amount);
 await updateTablelandRecord(address);
 console.log('Ether sent and Tableland record updated.');
}
