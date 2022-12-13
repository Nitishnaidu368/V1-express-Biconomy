import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import { Biconomy } from "@biconomy/mexa";
import PNDCGasless from "./artifacts/contracts/PNDCGasless.sol/PNDCGasless.json";

const addressPDNCGasless = "0xC892072095650afaF3C71F761F0DF6410C02315a";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    // const web3 = window.web3;
    const account = await window.ethereum.selectedAddress;
    this.setState({ account });
    const biconomy = new Biconomy(window.ethereum, {
      apiKey: "daRTTcGGc.f38fae3d-1c08-40d1-9d06-d9ef8d2bc132",
      debug: true,
      contractAddresses: [addressPDNCGasless],
    });
    const web3 = new Web3(biconomy.provider);

    const contractPNDCGasless = new web3.eth.Contract(
      PNDCGasless.abi,
      addressPDNCGasless
    );
    this.setState({ contractPNDCGasless });
    await biconomy.init();
    biconomy.on("txHashGenerated", (data) => {
      console.log(data);
    });

    biconomy.on("txMined", (data) => {
      console.log(data);
    });

    biconomy.on("onError", (data) => {
      console.log(data);
    });

    biconomy.on("txHashChanged", (data) => {
      console.log(data);
    });
  }

  // async loadWeb3() {
  //   if (!window.ethereum) {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  //   const biconomy = new Biconomy(window.ethereum, {
  //     apiKey: "daRTTcGGc.f38fae3d-1c08-40d1-9d06-d9ef8d2bc132",
  //     debug: true,
  //   });

  //   window.web3 = new Web3(biconomy);

  //   biconomy
  //     .onEvent(biconomy.READY, async () => {
  //       // Initialize your dapp here like getting user accounts etc

  //       await window.ethereum.enable();

  //       const contractPNDCGasless = new web3.eth.Contract(PNDCGasless.abi, addressPDNCGasless);
  //       this.setState({contractPNDCGasless });
  //     })
  //     .onEvent(biconomy.ERROR, (error, message) => {
  //       // Handle error while initializing mexa
  //       console.log(error);
  //     });
  // }

  constructor(props) {
    super(props);
    this.state = {
      account: null,
      address: null,
      uri: null,
      royalty: [[]],
      contractPNDCGasless: null,
    };
  }

  captureAddress = async (event) => {
    event.preventDefault();

    const address = event.target.value;
    this.setState({ address });

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });
  };

  captureUri = async (event) => {
    event.preventDefault();

    console.log("capturing Uri");
    const uri = event.target.value;
    this.setState({ uri });

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });
  };

  onSafeMint = async (event) => {
    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const royalties = [[account, 1000]];
    const uri = this.state.uri;
    const address = this.state.address;

    console.log(account);

    this.state.contractPNDCGasless.methods
      .gaslessmint(address, uri, royalties)
      .send("eth_sendTransaction", {
        from: account,
        signatureType: "EIP712_SIGN",
      })
      .then((r) => {
        console.log("mint result:", r);
      });
  };

  render() {
    return (
      <div>
        <nav>
          <h1>Express-Biconomy Gasless Minting</h1>
        </nav>
        <div className="container">
          <div className="row">
            <div>
              <p>Account : {this.state.account}</p>
            </div>
            <h4>Safe Mint (Everyone)</h4>
            <br />
            <form onSubmit={this.onSafeMint}>
              <input placeholder="Address to" onChange={this.captureAddress} />
              <input placeholder="Uri" onChange={this.captureUri} />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
