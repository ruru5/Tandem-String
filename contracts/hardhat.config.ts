import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const config = {
  networks: {
    hardhat: {},
    localhost: {
      url: process.env.RPC_URL,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/NtV1JdeaT3QnO-jYDSDsJIH4PXWnPB6t",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 3500000000,
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
