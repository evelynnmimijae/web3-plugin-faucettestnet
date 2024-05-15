import axios from 'axios';
import { tablelandConfig } from '../config';

export async function checkAddressInTableland(address: string): Promise<boolean> {
  try {
    const response = await axios.get(`https://api.tableland.com/v1/your-table-id/${address}`, {
      headers: {
        'Authorization': `Bearer ${tablelandConfig.apiKey}`
      }
    });
    return response.data.claimed;
  } catch (error) {
    console.error('Error checking address in Tableland:', error);
    return false;
  }
}

export async function storeRequest(userId: string, requestDetails: any) {
  try {
    const response = await axios.post(`https://api.tableland.com/v1/databases/${tablelandConfig.databaseId}/documents`, {
      userId,
      requestDetails,
    }, {
      headers: {
        'Authorization': `Bearer ${tablelandConfig.apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error storing request in Tableland:', error);
    throw error;
  }
}

export async function getRequests(userId: string) {
  try {
    const response = await axios.get(`https://api.tableland.com/v1/databases/${tablelandConfig.databaseId}/documents?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${tablelandConfig.apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting requests from Tableland:', error);
    throw error;
  }
}

export async function hasAddressClaimed(userId: string): Promise<boolean> {
  try {
    const response = await axios.get(`https://api.tableland.com/v1/databases/${tablelandConfig.databaseId}/documents?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${tablelandConfig.apiKey}`,
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
  } catch (error) {
    console.error('Error checking if address has claimed in Tableland:', error);
    throw error;
  }
}

export async function updateClaimRecord(userId: string, claimDetails: any) {
  try {
    const response = await axios.post(`https://api.tableland.com/v1/databases/${tablelandConfig.databaseId}/documents`, {
      userId,
      claimDetails,
      claimDate: new Date().toISOString(),
    }, {
      headers: {
        'Authorization': `Bearer ${tablelandConfig.apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating claim record in Tableland:', error);
    throw error;
  }
}

export async function updateTablelandRecord(address: string): Promise<void> {
  try {
    await axios.post('https://api.tableland.com/v1/your-table-id', {
      address: address,
      claimed: true
    }, {
      headers: {
        'Authorization': `Bearer ${tablelandConfig.apiKey}`
      }
    });
    console.log('Address updated in Tableland:', address);
  } catch (error) {
    console.error('Error updating Tableland record:', error);
    throw error;
  }
}