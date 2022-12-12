import React, { Component } from "react";
import "./App.css";
import PNDC_ERC721 from "./artifacts/contracts/PNDC_ERC721.sol/PNDC_ERC721.json";
import Web3 from "web3";
import { Biconomy } from "@biconomy/mexa";

//goerli
const addresspndc = "0xdbD68078158114b1ac9305D51B87bb710638E3F5";
const abi = PNDC_ERC721.abi;
const biconomyapi = "rDi1RZmMi.abe91c76-7ad8-42c6-a83e-631455553809";

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        await this.loadBiconomy();
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
        const web3 = window.web3;
        const account = await window.ethereum.selectedAddress;
        this.setState({ account });

        const contractPNDC = new web3.eth.Contract(abi, addresspndc);

        this.setState({ contractPNDC });
    }

    async loadBiconomy() {
        const biconomy = new Biconomy(window.ethereum, {
            apiKey: biconomyapi,
            debug: true,
            contractAddresses: [addresspndc], // list of contract address you want to enable gasless on
        });

        const abiPNDC = PNDC_ERC721.abi;

        const web3 = new Web3(biconomy.provider);
        const biconomyPNDC = new web3.eth.Contract(
            abiPNDC,
            addresspndc
        );

        this.setState({ biconomyPNDC });
        await biconomy.init();
    }

    constructor(props) {
        super(props);
        this.state = {
            contractPNDC: null,
            biconomyPNDC: null,
            account: null,
            address: null,
            id: null,
            appId: null,
            name: null,
            age: null,
            condition: null,
            remarks: null,
            time: null,
            total: null,
            patientId: null,
            owner: null,
        };
    }

    captureId = async (event) => {
        event.preventDefault();

        console.log("capturing Id");
        const id = event.target.value;
        this.setState({ id });

        const account = await window.ethereum.selectedAddress;
        this.setState({ account });
    };

    onLazyMint = async (event) => {
        event.preventDefault();

        const account = await window.ethereum.selectedAddress;
        this.setState({ account });

        const royalties = [[account, 1000]];
        await this.state.biconomyPNDC.methods.safeMintLazy(account, "xyz", royalties).send({ from: account }).then((r) => {
            console.log("result", r)
        })
    };

    onOwnerCall = async (event) => {
        event.preventDefault();

        const account = await window.ethereum.selectedAddress;
        this.setState({ account });

        const id = this.state.id;

        await this.state.contractPNDC.methods
            .ownerOf(id)
            .call({ from: account })
            .then((owner) => {
                console.log(owner);
                this.setState({ owner });
            });
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <h1>Hospital Appointments</h1>
                    <br></br>
                </nav>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main" className="col-lg-12 d-flex text-center">
                            <div className="content mr-auto ml-auto">
                                <div>
                                    <p>Owner : {this.state.owner}</p>
                                </div>
                                <br></br>
                                <h4>Mint</h4>
                                <form onSubmit={this.onLazyMint}>
                                    <input type="submit" />
                                </form>
                                <br></br>
                                <h4>Check Owner</h4>
                                <br></br>
                                <form onSubmit={this.onOwnerCall}>
                                    <input placeholder="Id" onChange={this.captureId} />
                                    <br></br>
                                    <input type="submit" />
                                </form>
                                <br></br>
                                <h4>Check Task status</h4>
                                <br></br>
                                <br></br>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;