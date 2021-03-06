import { h, createContext, ComponentChildren } from 'preact';
import { AppConfigurations, DodoApi } from './models';
import { useReducer, useRef } from 'preact/hooks';
import { dodoApiClient } from './services/dodoApiClient';
import { Web3ReactProvider, UnsupportedChainIdError } from '@web3-react/core'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { Web3Provider } from '@ethersproject/providers'
import tradeReducer, { tradeStore } from './reducers/tradeReducer';


export const ConfigContext = createContext<AppConfigurations>({} as AppConfigurations);
export const ServiceContext = createContext<DodoApi | undefined>(undefined);
export const TradeContext = createContext<any>(undefined);

interface Props {
    children: ComponentChildren;
    config: AppConfigurations;
}

export const getErrorMessage = (error: Error) => {
    if (error instanceof NoEthereumProviderError) {
        return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
    } else if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network."
    } else if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
    ) {
        return 'Please authorize this website to access your Ethereum account.'
    } else {
        console.error(error)
        return 'An unknown error occurred. Check the console for more details.'
    }
}

const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

export const AppContext = ({ children, config }: Props) => {
    const services = useRef(new dodoApiClient({
        baseUrl: config.dodoBaseUrl,
        debug: config.debug
    }));
    return (
        <ConfigContext.Provider value={config}>
            <ServiceContext.Provider value={services.current}>
                <TradeContext.Provider value={useReducer(tradeReducer, tradeStore)}>
                    <Web3ReactProvider getLibrary={getLibrary}>
                        {children}
                    </Web3ReactProvider>
                </TradeContext.Provider>
            </ServiceContext.Provider>
        </ConfigContext.Provider>
    );
};
