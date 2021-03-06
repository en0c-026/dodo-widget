interface InfraConfigurations {
    element?: Element;
}

export interface AppConfigurations {
    debug: boolean;
    dodoBaseUrl: string;
    cGeckoBaseUrl: string;
    targetId: string;
}

export type Configurations = InfraConfigurations & AppConfigurations;

export interface INetwork {
    id: number;
    chainId: string;
    nameNet: string;
    name: string;
    rpc: string;
    symbol: string;
    explorer: string;
}

export interface DodoResponse {
    status: number;
    data: {
        resAmount: string;
        resPricePerToToken: string;
        resPricePerFromToken: string;
        priceImpact: string;
        targetApproveAddr: string;
        to: string;
        data: string;
    }
}
export interface DodoRequest {
    fromTokenAddress: string;
    fromTokenDecimals: number;
    toTokenAddress: string;
    toTokenDecimals: number;
    fromAmount: string;
    slippage: number;
    userAddr: string;
    chainId: number;
    rpc: string;
    deadLine?: number;
    source?: string;
}
export interface DodoApi {
    getDodoRoute: (params: DodoRequest) => Promise<DodoResponse>;
}

export interface INetworkWallet {
    chainId: string;
    blockExplorerUrls?: string[];
    chainName?: string;
    iconUrls?: string[];
    nativeCurrency?: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls?: string[];
}
export type IRequestParams = Array<INetworkWallet>

interface IToken {
    name: string,
    symbol: string,
    address: string,
    decimals: number
}
interface RParams {
    targetApprove: string;
    proxyAddress: string;
    requestData: string;
}
export interface TradeState {
    tokenFrom: IToken,
    tokenTo: IToken,
    amountFrom: string;
    amountTo: string;
    dodoRequest: DodoRequest;
    tradeRequest: RParams;
}
