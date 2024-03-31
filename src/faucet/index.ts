// src/faucet/index.ts

import { checkAddressInTableland, updateTablelandRecord } from '../database';
import { sendEther } from '../ethereum';

export async function requestEther(address: string, amount: number): Promise<void> {
 const hasClaimed = await checkAddressInTableland(address);

 if (hasClaimed) {
    console.log('Address has already claimed Ether.');
    return;
 }

 await sendEther(address, amount);
 await updateTablelandRecord(address);
 console.log('Ether sent and Tableland record updated.');
}
