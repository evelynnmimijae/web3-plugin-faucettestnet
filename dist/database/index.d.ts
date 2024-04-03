export declare function checkAddressInTableland(address: string): Promise<boolean>;
export declare function storeRequest(userId: string, requestDetails: any): Promise<any>;
export declare function getRequests(userId: string): Promise<any>;
export declare function hasaddressClaimed(userId: string): Promise<boolean>;
export declare function updateClaimRecord(userId: string, claimDetails: any): Promise<any>;
export declare function updateTablelandRecord(address: string): Promise<void>;
