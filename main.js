// importing biconomy sdk


const abiPNDC = PNDC_ERC721.abi;

const web3 = new Web3(biconomy.provider);
const biconomyPNDC = new web3.eth.Contract(
    abiPNDC,
    addresspndc
);

this.setState({ biconomyPNDC });
await biconomy.init();

captureId = async (event) => {
    event.preventDefault();

    console.log("capturing Id");
    const id = event.target.value;
    this.setState({ id });

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });
};

onLazyMint = async (event) => {

    const biconomy = new Biconomy(window.ethereum, {
        apiKey: biconomyapi,
        debug: true,
        contractAddresses: [addresspndc], // list of contract address you want to enable gasless on
    });

    event.preventDefault();

    const account = await window.ethereum.selectedAddress;
    this.setState({ account });

    const royalties = [[account, 1000]];
    await this.state.biconomyPNDC.methods.safeMintLazy(account, "xyz", royalties).send({ from: account }).then((r) => {
        console.log("result", r)
    })
};

//////////////////////////////////////


//Import createPandoraExpressSDK from SDK
const { createPandoraExpressSDK } = require("pandora-express");
const pandoraSDK = createPandoraExpressSDK();

//Connecting with Metamask wallet.
const init = async () => {
    //check if metamask is present
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected");
    } else {
        alert("Metamask not found");
    }
};

const mintNft = async () => {
    //get current account address
    const accounts = await web3.eth.getAccounts();
    //Get ChainID of current account
    const chainId = await web3.eth.net.getId();
    //Mint NFT using SDK erc721 nft mint
    await pandoraSDK.erc721.nft.mint(web3, chainId, accounts[0], itemURI.value, [
        [accounts[0], 100],
    ]);
};

const sellNft = async () => {
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.net.getId();
    console.log(chainId);
    await pandoraSDK.erc721.order.sellNFT(
        web3,
        chainId,
        sellItemTokenId.value,
        sellItemPrice.value,
        accounts[0]
    );
};

const buyNft = async () => {
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.net.getId();
    console.log(chainId);
    await pandoraSDK.erc721.order.buyNFT(
        web3,
        chainId,
        buyItemSaleId.value,
        accounts[0],
        buyItemAmmount.value
    );
};

const itemURI = document.getElementById("txtCreateItemURI");

const createItemButton = document.getElementById("btnCreateItem");
createItemButton.onclick = mintNft;

const sellItemTokenId = document.getElementById("numSellItemTokenId");
const sellItemPrice = document.getElementById("numSellItemPrice");

const sellItemButton = document.getElementById("btnSellItem");
sellItemButton.onclick = sellNft;

const buyItemSaleId = document.getElementById("numBuyItem");
const buyItemAmmount = document.getElementById("numBuyItemAmmount");
numBuyItemAmmount;

const buyItemButton = document.getElementById("btnBuyItem");
buyItemButton.onclick = buyNft;

init();
