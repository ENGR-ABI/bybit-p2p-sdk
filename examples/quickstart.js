const { P2P } = require('../dist'); // Assuming built to dist

// To run this:
// 1. npm run build
// 2. node examples/quickstart.js

const api = new P2P({
    testnet: false,
    apiKey: "YOUR_API_KEY",
    apiSecret: "YOUR_API_SECRET"
});

async function main() {
    try {
        console.log("Fetching pending orders...");
        // 8. Get Pending Orders
        const pendingOrders = await api.getPendingOrders({
            page: 1,
            size: 10
        });
        console.log(JSON.stringify(pendingOrders, null, 2));
    } catch (e) {
        console.error("Error:", e.message);
    }
}

main();
