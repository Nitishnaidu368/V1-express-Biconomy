const biconomy = new Biconomy(window.ethereum as ExternalProvider, {
    apiKey: config.apiKey.prod, debug: true, contractAddresses: [<contractAddress1>, <contractAddress2>],});

        // The first argument of the Biconomy class is an EIP 1193 type provider that has to be passed. 
        // If there is a type mismatch you'll have to set the type of the provider as 
        // External Provider
        export type ExternalProvider = {
            isMetaMask ?: boolean;
        isStatus?: boolean;
        host?: string;
        path?: string;
        sendAsync?: (request: {method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
            send?: (request: {method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
                request?: (request: {method: string, params?: Array<any> }) => Promise<any>
  }

                    const web3 = new Web3(biconomy.provider);
                    const contractInstance = new web3.eth.Contract(
                    abi,
                    contractAddress
                    );