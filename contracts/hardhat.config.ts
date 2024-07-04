import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const config = {
  networks: {
    hardhat: {},
    localhost: {
      url: process.env.RPC_URL,
    },
    amoy: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: "auto",
      saveDeployments: true,
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
