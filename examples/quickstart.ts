import { P2P } from '../src';

// Bybit P2P SDK
// Refer to the documentation for the correct method description and usage: https://bybit-exchange.github.io/docs/p2p/guide

const api = new P2P({
    testnet: false,
    apiKey: "iNJlEU5P7RN8hnskpm",
    apiSecret: "8luZSF3Bn1aBv6VuhIKXbsHbkQrZn9rv95zx",
    // loggingLevel: 'DEBUG' // Not fully implemented in this demo
});

async function main() {
    try {
        // 1. Get current balance
        // const balance = await api.getCurrentBalance({ accountType: "FUND", coin: "USDT" });
        // console.log(JSON.stringify(balance, null, 2));

        // 2. Get account information
        // const accountInfo = await api.getAccountInformation();
        // console.log(JSON.stringify(accountInfo, null, 2));

        // 3. Get ads list
        // const adsList = await api.getAdsList();
        // console.log(JSON.stringify(adsList, null, 2));

        // 4. Get ad detail
        // const adDetail = await api.getAdDetails({ itemId: "1826453481967464448" });
        // console.log(JSON.stringify(adDetail, null, 2));

        // 7. Get Orders
        // const orders = await api.getOrders({ page: 1, size: 10 });
        // console.log(JSON.stringify(orders, null, 2));

        // 8. Get Pending Orders
        const pendingOrders = await api.getPendingOrders({ page: 1, size: 10 });
        console.log("Pending Orders:", JSON.stringify(pendingOrders, null, 2));

        // ... other examples mirroring the Python file ...

    } catch (e: any) {
        console.error("Error:", e);
        if (e.response) {
            console.error("Response data:", e.response.data);
        }
    }
}

main();
