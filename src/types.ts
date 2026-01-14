export interface P2PConfig {
    /**
     * API Key
     */
    apiKey?: string;
    /**
     * API Secret
     */
    apiSecret?: string;
    /**
     * Whether to use Testnet (default: false)
     */
    testnet?: boolean;
    /**
     * Custom domain (default: bybit)
     */
    domain?: string;
    /**
     * Custom TLD (default: com)
     */
    tld?: string;
    /**
     * Receive window in ms (default: 5000)
     */
    recvWindow?: number;
    /**
     * Use RSA authentication (default: false)
     */
    rsa?: boolean;
    /**
     * Disable SSL verification (default: false) - Not recommended
     */
    disableSslChecks?: boolean;
    /**
     * Logging level (not fully implemented in this node version, serves as placeholder)
     */
    loggingLevel?: any;
}

export interface P2PResponse<T = any> {
    retCode?: number;
    ret_code?: number;
    retMsg?: string;
    ret_msg?: string;
    result: T;
    retExtInfo?: any;
    ext_code?: string;
    ext_info?: any;
    time?: number;
    time_now?: string;
}

// Method Parameter Interfaces

export interface GetAdsListParams {
    itemId?: string;
    status?: string | number; // 1 - Sold out, 2 - Available
    side?: string | number; // 0 - Buy, 1 - Sell
    tokenId?: string;
    page?: number;
    size?: number;
    currencyId?: string;
    [key: string]: any;
}

export interface UpdateAdParams {
    id: string; // Advertisement ID
    priceType?: number; // 0 - fixed, 1 - floating
    premium?: number | string;
    price?: number | string;
    minAmount?: number | string;
    maxAmount?: number | string;
    remark?: string;
    tradingPreferenceSet?: TradingPreferenceSet;
    paymentIds?: string[];
    actionType?: 'MODIFY' | 'ACTIVE';
    quantity?: string;
    paymentPeriod?: string | number;
    [key: string]: any;
}

export interface TradingPreferenceSet {
    hasUnPostAd?: number;
    isKyc?: number;
    isEmail?: number;
    isMobile?: number;
    hasRegisterTime?: number;
    registerTimeThreshold?: number;
    orderFinishNumberDay30?: number;
    completeRateDay30?: string;
    nationalLimit?: string;
    hasOrderFinishNumberDay30?: number;
    hasCompleteRateDay30?: number;
    hasNationalLimit?: number;
    [key: string]: any;
}

export interface PostNewAdParams {
    tokenId: string;
    currencyId: string;
    side: string | number; // 0 - Buy, 1 - Sell
    priceType: number;
    premium?: number | string;
    price?: number | string;
    minAmount?: number | string;
    maxAmount?: number | string;
    remark?: string;
    tradingPreferenceSet?: TradingPreferenceSet;
    paymentIds?: string[];
    quantity?: string;
    paymentPeriod?: string | number;
    itemType?: 'ORIGIN' | 'BULK';
    [key: string]: any;
}

export interface GetOrdersParams {
    status?: string;
    beginTime?: string | number;
    endTime?: string | number;
    tokenId?: string;
    side?: number[];
    page?: number;
    size?: number;
    [key: string]: any;
}

export interface UploadChatFileParams {
    upload_file: string | Buffer; // Path string or Buffer
    filename?: string;
    [key: string]: any;
}

// ... Add more generalized interfaces as needed or use `any` for less common methods
// to keep the initial conversion manageable but extensible.
