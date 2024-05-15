import { hasAddressClaimed, updateClaimRecord } from '../database';
import { requestEther } from '../faucet'; // Assuming this is where your requestEther function is located
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

// Encryption key from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_encryption_key';

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
}

export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function handleUserRequest(userId: string, requestDetails: any) {
  try {
    // Check if the address has already claimed within the last 24 hours
    const hasClaimed = await hasAddressClaimed(userId);
    if (hasClaimed) {
      // Provide feedback that the address has already claimed
      provideFeedback(userId, 'You have already claimed Ether within the last 24 hours.');
      return;
    }

    // Assuming requestDetails contains the amount of Ether to send
    const amount = requestDetails.amount;

    // Send Ether to the address
    await requestEther(userId, amount);

    // Update the claim record in the database
    await updateClaimRecord(userId, { amount, claimed: true });

    // Provide feedback that the claim was successful
    provideFeedback(userId, 'Your claim was successful.');
  } catch (error) {
    // Handle any errors that occur during the process
    handleError(error as Error);
  }
}

export function provideFeedback(userId: string, message: string) {
  // Implement logic to provide feedback to the user
  // This could involve sending a message to the user's email, displaying a notification, etc.
  console.log(`Feedback for ${userId}: ${message}`);
}

export function handleError(error: Error) {
  // Implement error handling logic
  // This could involve logging the error, sending an error report, etc.
  console.error(`Error handling user request: ${error.message}`);
}