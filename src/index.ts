import { P2PClient } from './client';
import { P2PMethods } from './constants';
import * as types from './types';

export * from './types';
export * from './client';
export * from './constants';

export class P2P extends P2PClient {
    /**
     * Obtain wallet balance, query asset information of each currency.
     * By default, currency information with assets or liabilities of 0 is not returned.
     */
    async getCurrentBalance(params: { accountType: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_CURRENT_BALANCE, params);
    }

    /**
     * Get Account Information
     */
    async getAccountInformation(): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_ACCOUNT_INFORMATION, {});
    }

    /**
     * Get Ads List
     */
    async getAdsList(params: types.GetAdsListParams = {}): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_ADS_LIST, params);
    }

    /**
     * Get Ad Details
     */
    async getAdDetails(params: { itemId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_AD_DETAILS, params);
    }

    /**
     * Update or activate ads
     */
    async updateAd(params: types.UpdateAdParams): Promise<types.P2PResponse> {
        return this.request(P2PMethods.UPDATE_AD, params);
    }

    /**
     * Remove ad
     */
    async removeAd(params: { itemId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.REMOVE_AD, params);
    }

    /**
     * Get orders
     */
    async getOrders(params: types.GetOrdersParams = {}): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_ORDERS, params);
    }

    /**
     * Get pending orders
     */
    async getPendingOrders(params: types.GetOrdersParams = {}): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_PENDING_ORDERS, params);
    }

    /**
     * Get counterparty info
     */
    async getCounterpartyInfo(params: { originalUid: string; orderId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_COUNTERPARTY_INFO, params);
    }

    /**
     * Get order details
     */
    async getOrderDetails(params: { orderId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_ORDER_DETAILS, params);
    }

    /**
     * Release digital asset
     */
    async releaseAssets(params: { orderId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.RELEASE_ASSETS, params);
    }

    /**
     * Mark order as paid
     */
    async markAsPaid(params: { orderId: string; paymentType: string; paymentId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.MARK_AS_PAID, params);
    }

    /**
     * Get chat messages
     */
    async getChatMessages(params: { orderId: string; size?: number; startMessageId?: number;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_CHAT_MESSAGES, params);
    }

    /**
     * Upload file for chats
     */
    async uploadChatFile(params: types.UploadChatFileParams): Promise<types.P2PResponse> {
        return this.request(P2PMethods.UPLOAD_CHAT_FILE, params);
    }

    /**
     * Send chat message
     */
    async sendChatMessage(params: { message: string; contentType: string; orderId: string;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.SEND_CHAT_MESSAGE, params);
    }

    /**
     * Post new advertisement
     */
    async postNewAd(params: types.PostNewAdParams): Promise<types.P2PResponse> {
        return this.request(P2PMethods.POST_NEW_AD, params);
    }

    /**
     * Get online advertisements list
     */
    async getOnlineAds(params: { tokenId: string; currencyId: string; side: string | number;[key: string]: any }): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_ONLINE_ADS, params);
    }

    /**
     * Get user payment types
     */
    async getUserPaymentTypes(): Promise<types.P2PResponse> {
        return this.request(P2PMethods.GET_USER_PAYMENT_TYPES, {});
    }
}
