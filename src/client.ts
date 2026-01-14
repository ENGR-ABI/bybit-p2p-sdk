import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import * as crypto from 'crypto';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import { P2PConfig, P2PResponse } from './types';
import { P2PMethodDef } from './constants';

const SUBDOMAIN_TESTNET = "api-testnet";
const SUBDOMAIN_MAINNET = "api";
const DOMAIN_MAIN = "bybit";
const TLD_MAIN = "com";

export class P2PClient {
    private testnet: boolean;
    private apiKey: string;
    private apiSecret: string;
    private domain: string;
    private tld: string;
    private recvWindow: number;
    private rsa: boolean;
    private disableSslChecks: boolean;
    private client: AxiosInstance;
    private url: string;

    constructor(config: P2PConfig) {
        this.testnet = config.testnet || false;
        this.apiKey = config.apiKey || "";
        this.apiSecret = config.apiSecret || "";
        this.domain = config.domain || DOMAIN_MAIN;
        this.tld = config.tld || TLD_MAIN;
        this.recvWindow = config.recvWindow || 20000;
        this.rsa = config.rsa || false;
        this.disableSslChecks = config.disableSslChecks || false;

        const subdomain = this.testnet ? SUBDOMAIN_TESTNET : SUBDOMAIN_MAINNET;
        this.url = `https://${subdomain}.${this.domain}.${this.tld}`;

        this.client = axios.create({
            validateStatus: () => true, // Handle all statuses manually
            httpsAgent: this.disableSslChecks ? new (require('https').Agent)({ rejectUnauthorized: false }) : undefined
        });
    }

    private sign(payload: string | Buffer, timestamp: number): string {
        const signString = typeof payload === 'string'
            ? `${timestamp}${this.apiKey}${this.recvWindow}${payload}`
            : Buffer.concat([Buffer.from(`${timestamp}${this.apiKey}${this.recvWindow}`), payload]);

        if (this.rsa) {
            const signer = crypto.createSign('SHA256');
            signer.update(signString);
            return signer.sign(this.apiSecret, 'base64');
        } else {
            return crypto.createHmac('sha256', this.apiSecret).update(signString).digest('hex');
        }
    }

    private sortParams(params: any): string {
        const keys = Object.keys(params).sort();
        return keys.map(key => `${key}=${params[key]}`).join('&');
    }

    // Helper to cast values to strings/ints recursively primarily for POST JSON
    // Mirroring Python's _cast_values logic effectively happens by JSON.stringify
    // But Python explicitly converts some to strings.
    // In JS, JSON.stringify handles types well, but if the API expects strings for numbers, we might need to be careful.
    // For now, we rely on the user passing correct types or simple JSON serialization.

    async request<T = any>(methodDef: P2PMethodDef, params: any = {}): Promise<T> {
        // Validate required params
        for (const req of methodDef.requiredParams) {
            if (!(req in params)) {
                throw new Error(`Missing required parameter: ${req}`);
            }
        }

        const timestamp = Date.now();
        let payload = "";
        let signature = "";
        let contentType = "application/json";
        let headers: any = {};
        let requestUrl = this.url + methodDef.url;
        let axiosConfig: AxiosRequestConfig = {
            method: methodDef.method === 'FILE' ? 'POST' : methodDef.method as Method,
            url: requestUrl,
            headers: {}
        };

        if (methodDef.method === 'FILE') {
            return this.handleFileUpload(methodDef, params, timestamp);
        } else if (methodDef.method === 'GET') {
            const cleanParams = Object.entries(params)
                .filter(([_, v]) => v != null)
                .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
            payload = this.sortParams(cleanParams);
            signature = this.sign(payload, timestamp);
            if (payload) {
                axiosConfig.url += `?${payload}`;
            }
        } else {
            // POST
            payload = JSON.stringify(params);
            signature = this.sign(payload, timestamp);
            axiosConfig.data = payload;
        }

        headers = {
            'X-BAPI-API-KEY': this.apiKey,
            'X-BAPI-SIGN': signature,
            'X-BAPI-SIGN-TYPE': '2',
            'X-BAPI-TIMESTAMP': timestamp.toString(),
            'X-BAPI-RECV-WINDOW': this.recvWindow.toString(),
            'Content-Type': contentType
        };

        axiosConfig.headers = { ...axiosConfig.headers, ...headers };

        const response = await this.client.request(axiosConfig);

        // Process response
        if (response.status !== 200) {
            // Basic error handling
            throw new Error(`Request failed with status ${response.status}: ${JSON.stringify(response.data)}`);
        }

        const result = response.data;

        const retCode = result.retCode !== undefined ? result.retCode : result.ret_code;
        const retMsg = result.retMsg || result.ret_msg;

        if (retCode !== 0) {
            throw new Error(`${retMsg} (ErrCode: ${retCode})`);
        }

        return result;
    }

    private async handleFileUpload<T>(methodDef: P2PMethodDef, params: any, timestamp: number): Promise<T> {
        const uploadFile = params.upload_file;
        let filename = params.filename;
        let fileData: Buffer;

        if (Buffer.isBuffer(uploadFile)) {
            if (!filename) throw new Error("filename is required when passing raw buffer");
            fileData = uploadFile;
        } else if (typeof uploadFile === 'string') {
            if (!fs.existsSync(uploadFile)) throw new Error(`File not found: ${uploadFile}`);
            fileData = fs.readFileSync(uploadFile);
            if (!filename) filename = path.basename(uploadFile);
        } else {
            throw new Error("Invalid upload_file type. Must be string path or Buffer.");
        }

        const boundary = "boundary-for-file";
        const mimeType = "image/png"; // Python SDK hardcodes this

        // Manual payload construction to match signature
        // Python: f"--{boundary}\r\nContent-Disposition: form-data; name=\"upload_file\"; filename=\"{filename}\"\r\nContent-Type: {mime_type}\r\n\r\n".encode() + data + f"\r\n--{boundary}--\r\n".encode()

        const part1 = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="upload_file"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`);
        const part2 = fileData;
        const part3 = Buffer.from(`\r\n--${boundary}--\r\n`);

        const payloadBuffer = Buffer.concat([part1, part2, part3]);

        const signature = this.sign(payloadBuffer, timestamp);

        const headers = {
            'X-BAPI-API-KEY': this.apiKey,
            'X-BAPI-SIGN': signature,
            'X-BAPI-SIGN-TYPE': '2',
            'X-BAPI-TIMESTAMP': timestamp.toString(),
            'X-BAPI-RECV-WINDOW': this.recvWindow.toString(),
            'Content-Type': `multipart/form-data; boundary=${boundary}`
        };

        const response = await this.client.post(this.url + methodDef.url, payloadBuffer, { headers });

        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}: ${JSON.stringify(response.data)}`);
        }

        const result = response.data;
        if (result.retCode !== 0) {
            throw new Error(`${result.retMsg} (ErrCode: ${result.retCode})`);
        }
        return result;
    }
}
