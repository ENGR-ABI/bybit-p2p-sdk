export interface P2PMethodDef {
    url: string;
    method: 'GET' | 'POST' | 'FILE';
    requiredParams: string[];
}

export const P2PMethods: Record<string, P2PMethodDef> = {
    GET_CURRENT_BALANCE: { url: "/v5/asset/transfer/query-account-coins-balance", method: "GET", requiredParams: ["accountType"] },
    GET_ACCOUNT_INFORMATION: { url: "/v5/p2p/user/personal/info", method: "POST", requiredParams: [] },
    GET_ADS_LIST: { url: "/v5/p2p/item/personal/list", method: "POST", requiredParams: [] },
    GET_AD_DETAILS: { url: "/v5/p2p/item/info", method: "POST", requiredParams: ["itemId"] },
    UPDATE_AD: {
        url: "/v5/p2p/item/update", method: "POST", requiredParams: [
            "id", "priceType", "premium", "price", "minAmount", "maxAmount", "remark",
            "tradingPreferenceSet", "paymentIds", "actionType", "quantity", "paymentPeriod"
        ]
    },
    REMOVE_AD: { url: "/v5/p2p/item/cancel", method: "POST", requiredParams: ["itemId"] },
    GET_ORDERS: { url: "/v5/p2p/order/simplifyList", method: "POST", requiredParams: ["page", "size"] },
    GET_PENDING_ORDERS: { url: "/v5/p2p/order/pending/simplifyList", method: "POST", requiredParams: ["page", "size"] },
    GET_COUNTERPARTY_INFO: { url: "/v5/p2p/user/order/personal/info", method: "POST", requiredParams: ["originalUid", "orderId"] },
    GET_ORDER_DETAILS: { url: "/v5/p2p/order/info", method: "POST", requiredParams: ["orderId"] },
    RELEASE_ASSETS: { url: "/v5/p2p/order/finish", method: "POST", requiredParams: ["orderId"] },
    MARK_AS_PAID: { url: "/v5/p2p/order/pay", method: "POST", requiredParams: ["orderId", "paymentType", "paymentId"] },
    GET_CHAT_MESSAGES: { url: "/v5/p2p/order/message/listpage", method: "POST", requiredParams: ["orderId", "size"] },
    UPLOAD_CHAT_FILE: { url: "/v5/p2p/oss/upload_file", method: "FILE", requiredParams: ["upload_file"] },
    SEND_CHAT_MESSAGE: { url: "/v5/p2p/order/message/send", method: "POST", requiredParams: ["message", "contentType", "orderId"] },
    POST_NEW_AD: {
        url: "/v5/p2p/item/create", method: "POST", requiredParams: [
            "tokenId", "currencyId", "side", "priceType", "premium", "price", "minAmount",
            "maxAmount", "remark", "tradingPreferenceSet", "paymentIds", "quantity",
            "paymentPeriod", "itemType"
        ]
    },
    GET_ONLINE_ADS: { url: "/v5/p2p/item/online", method: "POST", requiredParams: ["tokenId", "currencyId", "side"] },
    GET_USER_PAYMENT_TYPES: { url: "/v5/p2p/user/payment/list", method: "POST", requiredParams: [] }
};
