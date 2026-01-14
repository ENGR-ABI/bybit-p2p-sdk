# bybit-p2p-sdk

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## Bybit P2P API SDK for Node.js (TypeScript)

`bybit-p2p-sdk` is the unofficial Node.js SDK for Bybit's P2P API, enabling seamless integration of your software solutions with Bybit's [P2P trading platform](https://www.bybit.com/en/promo/global/p2p-introduce).

- **Full Type Support**: Written in TypeScript with complete definitions.
- **Easy Authentication**: Handles HMAC signature generation automatically.
- **Actively Maintained**: Supports latest V5 P2P endpoints.

## Features

This SDK implements all key methods available for the P2P API:

- Create, edit, delete, activate advertisements
- Get pending orders, mark orders as paid, release assets
- Get, send text messages, and upload files to chat
- Get all public advertisements
- And more!

## Installation

```bash
npm install bybit-p2p-sdk
```

## Usage

### TypeScript

```typescript
import { P2P } from 'bybit-p2p-sdk';

const client = new P2P({
    testnet: false, // Set to true for testnet
    apiKey: "YOUR_API_KEY",
    apiSecret: "YOUR_API_SECRET"
});

// 1. Get current balance
const balance = await client.getCurrentBalance({ accountType: "FUND", coin: "USDT" });
console.log(balance);

// 2. Get pending orders
const orders = await client.getPendingOrders({ page: 1, size: 10 });
console.log(orders);
```

### Configuration
The `P2P` constructor accepts the following config:

- `testnet`: `boolean` (default: false)
- `apiKey`: `string`
- `apiSecret`: `string`
- `recvWindow`: `number` (default: 20000) - Time window for request validity

## Documentation

This library provides a direct wrapper around Bybit's P2P REST API.
Official Documentation: [P2P API Guide](https://bybit-exchange.github.io/docs/p2p/guide)

### API Method Mapping

Here is how the SDK methods map to the API endpoints:

#### Advertisements
| SDK Method | API Endpoint | Description |
| --- | --- | --- |
| `getOnlineAds()` | [/v5/p2p/item/online](https://bybit-exchange.github.io/docs/p2p/ad/online-ad-list) | Get public online ads |
| `postNewAd()` | [/v5/p2p/item/create](https://bybit-exchange.github.io/docs/p2p/ad/post-new-ad) | Post a new ad |
| `removeAd()` | [/v5/p2p/item/cancel](https://bybit-exchange.github.io/docs/p2p/ad/remove-ad) | Cancel an ad |
| `updateAd()` | [/v5/p2p/item/update](https://bybit-exchange.github.io/docs/p2p/ad/update-list-ad) | Update or relist an ad |
| `getAdsList()` | [/v5/p2p/item/personal/list](https://bybit-exchange.github.io/docs/p2p/ad/ad-list) | Get my ads list |
| `getAdDetails()` | [/v5/p2p/item/info](https://bybit-exchange.github.io/docs/p2p/ad/ad-detail) | Get ad details |

#### Orders
| SDK Method | API Endpoint | Description |
| --- | --- | --- |
| `getOrders()` | [/v5/p2p/order/simplifyList](https://bybit-exchange.github.io/docs/p2p/order/order-list) | Get all orders |
| `getOrderDetails()` | [/v5/p2p/order/info](https://bybit-exchange.github.io/docs/p2p/order/order-detail) | Get order details |
| `getPendingOrders()` | [/v5/p2p/order/pending/simplifyList](https://bybit-exchange.github.io/docs/p2p/order/pending-order) | Get pending orders |
| `markAsPaid()` | [/v5/p2p/order/pay](https://bybit-exchange.github.io/docs/p2p/order/mark-order-as-paid) | Mark order as paid |
| `releaseAssets()` | [/v5/p2p/order/finish](https://bybit-exchange.github.io/docs/p2p/order/release-digital-asset) | Release crypto to buyer |
| `sendChatMessage()` | [/v5/p2p/order/message/send](https://bybit-exchange.github.io/docs/p2p/order/send-chat-msg) | Send a chat message |
| `uploadChatFile()` | [/v5/p2p/oss/upload_file](https://bybit-exchange.github.io/docs/p2p/order/upload-chat-file) | Upload a file to chat |
| `getChatMessages()` | [/v5/p2p/order/message/listpage](https://bybit-exchange.github.io/docs/p2p/order/chat-msg) | Get chat history |

#### User Info
| SDK Method | API Endpoint | Description |
| --- | --- | --- |
| `getAccountInformation()` | [/v5/p2p/user/personal/info](https://bybit-exchange.github.io/docs/p2p/user/acct-info) | Get my account info |
| `getCounterpartyInfo()` | [/v5/p2p/user/order/personal/info](https://bybit-exchange.github.io/docs/p2p/user/counterparty-user-info) | Get counterparty info |
| `getUserPaymentTypes()` | [/v5/p2p/user/payment/list](https://bybit-exchange.github.io/docs/p2p/user/user-payment) | Get my payment methods |

#### Misc
| SDK Method | API Endpoint | Description |
| --- | --- | --- |
| `getCurrentBalance()` | [/v5/asset/transfer/query-account-coins-balance](https://bybit-exchange.github.io/docs/p2p/all-balance) | Get wallet balance |

## Development

Contributions are welcome!

### Build
```bash
npm run build
```

### Run Examples
```bash
npx ts-node examples/quickstart.ts
```

## 🤝 Contributing

Contributions are welcome! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier (configured in project)
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Issues**: [GitHub Issues](https://github.com/ENGR-ABI/bybit-p2p-sdk/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ENGR-ABI/bybit-p2p-sdk/discussions)

## 📞 Support

For questions and support:
- Check the [Documentation](#documentation) section
- Open an [Issue](https://github.com/ENGR-ABI/bybit-p2p-sdk/issues)

---

**Built with ❤️ for traders by [ENGR-ABI](https://github.com/ENGR-ABI)**
