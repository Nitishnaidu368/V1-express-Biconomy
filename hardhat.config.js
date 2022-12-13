require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
const polygon = process.env.POLYGON_SCAN;
module.exports = {
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: polygon,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.2",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  paths : {
    artifacts: './frontend/src/artifacts'
  }
};
